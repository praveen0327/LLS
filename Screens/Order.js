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
const Order = ({navigation,route}) => {
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
  
  
    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/orders?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
 console.log('res',res.data)
         setLoading(false)
     
          // setImgUrl(imgdata)

       
          setProduct(res.data)
   
         
         }).catch((er)=>{
          console.log(er)
         setLoading(false)
        })
  }

 





  const modalList=(item,index)=>{

    //console.log("metadata",prodQan)
    //console.log(item)
    const timedate = String(item.date_created)
    const date = timedate.replace('T', '  ')

         const data = item.line_items[0]
         const images = data.image
      
         const lineItems = item.line_items
      
         const itemQuantity = lineItems.reduce((accumulator, object) => {
            return accumulator + Number(object.quantity);
          }, 0);
     
      return(
        <TouchableOpacity    onPress={()=>{navigation.navigate('OrderDetails',{data:item.id})}}   style={{width:"100%",height:220,alignItems:'center',justifyContent:'center',alignContent:'center',marginTop:10}}>
      <View style={{backgroundColor:'#FFFFFF',width:"95%",alignItems:'center',alignContent:'center',padding:5}}>
        <View style={{width:'100%',flexDirection:'row',marginTop:10}}>
        <View style={{height:40,width:40,backgroundColor:'#D1B19F',alignItems:'center',justifyContent:'center',borderRadius:30}}>
          <Image source={require('../images/box.png')} style={{height:24,width:24}}/>
        </View>
        <View style={{left:5}}>
            <Text style={{fontWeight:'bold',fontFamily: 'FuturaPTMedium',color:'#A0292E'}}>In Processing</Text>
            <Text style={{fontFamily: 'FuturaPTMedium',color:'#000'}}>Placed on {date}</Text>
        </View>
        </View>
        <View style={{backgroundColor:'#F3F3F2',width:"100%",marginTop:10,alignItems:'center',justifyContent:"space-between",alignContent:'center',flexDirection:'row',padding:5}}>
    <View style={{height:140,width:"40%",backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:"center"}}>
    <Image source={{uri:images.src}} style={{height:"100%",width:"100%",borderRadius:2}}/>
    </View>
    <View style={{width:"50%"}}>
    <View style={{width:'100%',marginTop:5,padding:5}}>
          <Text style={{color:"#000",fontWeight:'bold',fontSize:16,marginTop:5}}>{data.name}</Text>
          <Text style={{fontWeight:'200',marginTop:5}}>Order Id:{item.id}</Text>
          <Text style={{color:"#000",fontWeight:'500',marginTop:5}}>Quantity:{itemQuantity == null ?'0':itemQuantity}</Text>
          <Text style={{color:"#000",fontWeight:'500',marginTop:5,fontSize:18}}>AED {item.total}</Text>
       </View>

    
    </View>

    <View style={{height:"100%",width:"10%",alignItems:'center',alignContent:'center',justifyContent:'center'}}>
    <TouchableOpacity  style={{marginTop:0,left:0}}>
         <Image source={require('../images/next.png')} style={{height:22,width:22}} />
       </TouchableOpacity>
    </View>

    </View>
    
       </View>
       </TouchableOpacity>
       
      )
  }




 
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
export default Order;
