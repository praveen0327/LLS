/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,Modal,ActivityIndicator,FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import {MainContext} from '../App';
const {width: screenWidth} = Dimensions.get('window');
import FooterBanner from '../Components/FooterBanner';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Product from '../Components/Product';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
const data = [
  {
      "images": "https://codeandcode.xyz/demo/ladies-love-shopping/wp-content/uploads/2022/01/CFNOS2010010_1.jpg"
  }
];
const Cart = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [lineItem,setLineItem] = React.useState()
  const [title,setTitle] = React.useState()
  const [product,setProduct] = React.useState()
  const [prodQan,setProdQan] = React.useState([])
  const [subTitle,setSubTitle] = React.useState()
  const [total,setTotal] = React.useState(0)
  const [price,setPrice] = React.useState('')
  const [imgUrl,setImgUrl] = React.useState()
  const [assImg,setAssImg] = React.useState()
  const [assMess,setAssMess] = React.useState()
  const [Count,setCount] = React.useState()
  const [tax,setTax] = React.useState()
  const [Message, setMessage] = React.useState(false);
  const {Cart} = React.useContext(MainContext);
 
 
  let ref = useRef();

  React.useEffect(()=>{
 
  /*   if(product.length === 0){
        getCart()
    } */
   
    getCartList()
  },[isFocused])

/*   var i, sum = 0, nums = ['100','300','400','60','40'];

    for (i = 0; i < prodQan.length; i++) {
        sum += +prodQan[i].total*prodQan[i].quantity;
       
    } */
 

  const getCartList = (proID,quan) =>{
    setLoading(true)
  
  
    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
 console.log('res',res.data)
         setLoading(false)
         setCount(res.data.item_count)
          // setImgUrl(imgdata)
          Cart({count:res.data.item_count})
          setLineItem(res.data.item_count)
          setProduct(res.data.items)
    // console.log(res.data.items)
          setPrice(res.data.totals.subtotal)
          setTotal(res.data.totals.total)
          setTax(res.data.totals.total_tax)
         
         }).catch((er)=>{
          console.log(er)
         setLoading(false)
        })
  }

  const getCart = () =>{
   
  setLoading(true)
  const data ={
    'user_id': "15",
  };
  let options = {
    method: 'POST',
    url: 'https://yourang.io/lls/public/api/auth/viewcart',
    params: data,
    responseEncoding: 'utf-8',
    headers: {
      'Accept': 'application/json',
    }
};

return axios.request(options).then(function (response) {
   // console.log(response)
    let res = response.data
    //console.log('res.length')
   let secProduct = Object.keys(res)
   let Products = res[secProduct[1]] 
   let proDatas = Products[0].product_id
    //console.log(res[secProduct[1]])
    //console.log(Products.length)
    AsyncStorage.setItem('cartBadge',String(Products.length))
    for(let i = 0;i<=Products.length-1;i++){
        //console.log(Products[i].product_id)
        getHomeProductList(Products[i].product_id,Products[i].meta_value.quantity)
        prodQan.push(Products[i].meta_value)
    }
   // getHomeProductList(proDatas)
/*     setAssImg(require('../images/done.png'))
    setAssMess("Added Successfully")
    setMessage(true) */
    //setLoading(false)
      
    
}).catch(function (error) {
    console.log(error);
    setLoading(false)
   
});
  }

  const updaeFieldChanged = (data,index) => {
    console.log('data: ' + data);
    console.log('index: ' + index);
    console.log('property name: '+ data);
/*     let newArr = [...product];
   newArr[index] = data.target.id; 
    console.log(newArr) */
 
  /*   setDatas(newArr);  */
}



const updateFieldChanged = (name, index) => {
  if(name !== ''){
  // objIndex = product.findIndex((obj => obj.id == '163'))

/*   product[index].quantity.value = name
  console.log("After update: ",product[index])
  let set_pro = product[index]
  product.splice(index, 1)
  product.push(set_pro)
  setProduct(product)
  console.log(product) */
  updateQuantity(name, index) 
  }
  };

const updateQuantity = (name, index) =>{
  let product_id = product[index]
  let prop_id = product_id.item_key
  console.log("After update: ",product_id.item_key)
  setLoading(true)
  const id = prop_id.toString()
  //var url= `https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart/item/${id}?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`

 const quan = name.toString()
    axios.post(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart/item/${id}?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`, {
    
    'quantity': quan,
})
.then(function (response) {
   // console.log(response)
    let res = response.data

   // console.log(res)

    setLoading(false)
    getCartList()
    
}).catch(function (error) {
    console.log('error');
    setLoading(false)
   
});
}
  const modalList=(item,index)=>{

    //console.log("metadata",prodQan)
    //console.log(item)
    var subTotal = item.price*item.quantity

    var data = item.meta.variation

      return(
        <TouchableOpacity onPress={()=>{navigation.navigate('ProductDetails',{data:item.id})}}  style={{width:"100%",alignItems:'center',justifyContent:'center',alignContent:'center',marginTop:10}}>

        <View style={{backgroundColor:'#FFFFFF',borderWidth:0.5,borderColor:"#D1B19F",width:"95%",alignItems:'center',justifyContent:"space-between",alignContent:'center',flexDirection:'row',padding:5}}>
    <View style={{height:140,width:"40%",backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:"center"}}>
    <Image source={{uri:item.featured_image}} style={{height:"99%",width:"99%",borderRadius:2}}/>
    </View>
    <View style={{width:"50%"}}>
    <View style={{width:'100%',marginTop:5,padding:5}}>
          <Text style={{color:"#000",fontWeight:'bold',fontSize:16,marginTop:5}}>{item.title}</Text>
          <Text style={{fontWeight:'200',marginTop:5}}>{item.name}</Text>
          <View style={{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',marginTop:0,alignContent:'center',alignItems:'center'}}>

         
          {/* <Text style={{color:"#000",fontWeight:'500',right:20}}>Qty:{item.quantity.value}</Text> */}
          <View style={{width:"50%"}}><Text style={{color:"#000",fontWeight:'500'}}>Size:{data.Size == null ?'0':data.Size}</Text></View>
          <View style={{width:"50%",height:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}>
            <Text style={{color:"#000",fontWeight:'500'}}>Qty: </Text>
            <TextInput style={{width:"40%",height:'90%',borderWidth:0.3,alignItems:'center'}}
               onChangeText={(data)=>{updateFieldChanged(data,index)}}
               
            >{item.quantity.value}</TextInput>
            </View>
          
          </View>
          <Text style={{color:"#000",fontWeight:'500',marginTop:5,fontSize:18}}>AED {item.price}</Text>
       </View>
{/* 
       <View style={{width:'100%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
          <Text style={{color:"#000",fontWeight:'500'}}>{item.price.slice(0, -2)}</Text>
       </View>
       <View style={{width:'100%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
          <Text style={{color:"#000",fontWeight:'500'}}>{item.quantity}</Text>
       </View>
       <View style={{width:'100%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
          <Text style={{color:"#000",fontWeight:'500'}}>{subTotal}</Text>
       </View> */}
    
    </View>

    <View style={{height:"100%",width:"10%",alignItems:'center',alignContent:'center',justifyContent:'flex-start'}}>
    <TouchableOpacity onPress={()=>{deleteProduct(item)}} style={{marginTop:20,left:0}}>
         <Image source={require('../images/close.png')} style={{height:12,width:12}} />
       </TouchableOpacity>
    </View>

    
       </View>
       </TouchableOpacity>
       
      )
  }

  const deleteProduct = (item) =>{
    setLoading(true)
         axios.delete(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart/item/${item.item_key}?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
         .then((res) => {
          setLoading(false)
         // console.log(res)
          getCartList()
        }).catch((er)=>{
         console.log(er)
        setLoading(false)
       })
  }



  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri:item.images}}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
    );
  };
  return (
    <SafeAreaView
      /* style={{
        backgroundColor: '#ffffff',
      }} */>
      <ScrollView>
        <View style={{marginVertical: 0}}>
        <View style={{width:"100%",marginTop:0,padding:5,marginBottom:0}}>
  
        <ScrollView >
         <View style={{marginBottom:20,width:"100%"}}>
   
          <FlatList      
         data={product}
         keyExtractor={item => item.id+Math.random()} 
         renderItem={({ item,index }) => modalList(item,index)}
         />
         
         <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop:40
          }}>
              <View
            style={{
             
              alignItems: 'center',
              borderWidth: 1,
              flex: 0.65,
              alignSelf: 'center',
              fontSize: 14,
              backgroundColor:'#FFFFFF'
            }}>
            <TextInput style={{ paddingVertical: 5,color: '#231224'}} placeholder={'Coupon Code'}></TextInput>
           
          </View>
          <TouchableOpacity
          onPress={()=>{addtoCart()}}
            style={{
              flex: 0.25,
            }}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="resize"
              source={require('../images/background-menu.png')}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderWidth: 1,
                  fontSize: 14,
                  color: '#fff',
                }}>
                {/* <TouchableOpacity onPress={() => drawer.openDrawer()}> */}
                <Text style={styles.outlined}>Apply Coupon</Text>
                {/* </TouchableOpacity> */}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        
        </View>

        <View style={{width:"100%",marginTop:20,marginBottom:20,marginTop:40,backgroundColor:'#FFFFFF',padding:10}}>
          <View style={{marginBottom:10,marginTop:10}}>
          <Text style={{fontSize:16,color:"#000"}}>Price Details {"("+Count+" items "+")"} </Text>
          </View>
          <View style={{width:"100%",alignItems:'center',justifyContent:'center'}}>
          <View style={{width:"90%",height:0.5,backgroundColor:'#E3E2E3',marginBottom:10}}></View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
             <Text style={{fontSize:18,color:"#000"}}>Subtotal</Text>
             <Text style={{fontSize:18, color:"#660866"}}>AED {price}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
          <Text style={{fontSize:18,color:"#000"}}>Shipping</Text>
          <Text style={{fontSize:18}}>Free Shipping</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
             <Text style={{fontSize:18,color:"#000"}}>Tax</Text>
             <Text style={{fontSize:18}}>AED {tax}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:18,color:"#000"}}>Coupon Discount</Text>
          <Text style={{fontSize:18,color:"#FC5F5C"}}>Apply Coupon</Text>
          </View>
          <View style={{width:"100%",alignItems:'center',justifyContent:'center'}}>
          <View style={{width:"90%",height:0.5,backgroundColor:'#E3E2E3',marginBottom:10,marginTop:10}}></View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:18,color:"#000",fontWeight:'bold'}}>Total:</Text>
          <Text style={{fontSize:18,color:"#000",fontWeight:'bold'}}>AED {total}</Text>
          </View>
        </View>

        <TouchableOpacity
            onPress={()=>{navigation.navigate('Checkout')}}
            style={{
              width:'100%',marginTop:20
            }}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="resize"
              source={require('../images/background-menu.png')}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderWidth: 1,
                  fontSize: 14,
                  color: '#fff',
                }}>
                {/* <TouchableOpacity onPress={() => drawer.openDrawer()}> */}
                <Text style={styles.outlined}>PROCEED TO CHECKOUT</Text>
                {/* </TouchableOpacity> */}
              </View>
            </ImageBackground>
          </TouchableOpacity>
      </View>

    
      </ScrollView>
         </View>

  
        </View>
 

        <Modal
        animationType="fade"
        transparent={true}
        visible={loading}  
      >
           <View style={styles.centeredView}>
          <View style={styles.loads}>
{/*           <Image source={require("../assets/laod.gif")} style={{height:"100%",width:"100%",padding:1,marginBottom:30}}/> */}
        <ActivityIndicator style={{marginBottom:20,marginTop:20}} animating={true} size="large" color="#641893" />
       
     <Text style={{color:'#641893',fontWeight:'bold',fontFamily: 'FuturaPTLight'}}>Loading....</Text>
          </View>  
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={Message}
      /*   onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} */   
       >
         <View style={styles.centeredView}>
         <View style={styles.Msg}>
         <Image source={assImg} style={{height:70,width:70,padding:1,marginBottom:30,marginTop:10}}/>
         <Text style={{color:'#000',fontWeight:'bold',fontSize:14,marginBottom:10,fontFamily: 'FuturaPTMedium'}}>{assMess}</Text>
         <TouchableOpacity onPress={()=>{
       /*    console.log("dcd",lock)
          if(lock == 'yes' || lock == 'no' || lock ==''){
            blockStaff()
          }
          if(sendID == 0){
            setMessageFun()
           } */ 
           setMessage(false) 
        //   navigation.navigate("SignIn")      
          }} 
          style={{width:'100%',alignItems:'flex-end',justifyContent:'space-around',padding:10,right:10}}>
               
         <Text style={{color:'#641893',fontSize:22,fontWeight:'400'}}>Close</Text>
         </TouchableOpacity>
        </View>
       </View>
      </Modal>
        <FooterBanner />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCategories: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  img: {
    width: screenWidth,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    // borderRadius: 8,
  },
  outlined: {
    // margin: 10,
    alignSelf: 'center',
    fontSize: 15,
    color: '#fff',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,    
    
  },
  loads: {
    margin: 0,
    width:'60%',
    height:"20%",
    backgroundColor:'#F5EEF8',
    borderRadius: 10,
    padding: 0,
    /*alignItems: "center",*/
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,padding:0,alignItems:'center',justifyContent:'center'
  },
  Msg: {
    margin: 0,
    width:'80%',
    height:"30%",
    backgroundColor:'#F5EEF8',
    borderRadius: 10,
    padding: 0,
   /*  alignItems: "center", */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,padding:0,alignItems:'center',justifyContent:'center'
  }
});
export default Cart;
