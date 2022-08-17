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
import {MainContext} from '../App';
const {width: screenWidth} = Dimensions.get('window');
import FooterBanner from '../Components/FooterBanner';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Product from '../Components/Product';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Checkbox from 'react-native-check-box';
import ImageButton from '../Components/ImageButton';
import { useValidation } from 'react-native-form-validator';

const Checkout = ({navigation}) => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [lineItem,setLineItem] = React.useState()
  const [title,setTitle] = React.useState()
  const [product,setProduct] = React.useState([])
  const [prodQan,setProdQan] = React.useState([])
  const [subTitle,setSubTitle] = React.useState()
  const [total,setTotal] = React.useState(0)
  const [price,setPrice] = React.useState('')
  const [imgUrl,setImgUrl] = React.useState()
  const [assImg,setAssImg] = React.useState()
  const [assMess,setAssMess] = React.useState()
  const [Message, setMessage] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone , setPhone] = useState('');
  const [firstname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [remarks,setRemarks] = useState('')
  const [Password, setNewPassword] = useState('');
  const [country,setCountry] = useState('')
  const [city,setCity] = useState('')
  const [address,setAddress] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const {Cart} = React.useContext(MainContext);
  const [Count,setCount] = React.useState()
  const [tax,setTax] = React.useState()
  const [billingDetail,setBillingDetail] = React.useState()
  const [isSelected, setSelection] = useState(false);
  const { validate, isFieldInError, getErrorsInField, getErrorMessages ,isFormValid} =
  useValidation({
    state: { email, Password, firstname,lname,ConfirmPassword,country,city,address,phone},
  });
  const onPressButton =async () => { 

    validate({
     email: { email: true },
     firstname:{required: true},
     lname:{required: true},
     country:{required: true},
     city:{required: true},
     phone:{required: true},
     address:{required: true},
   });

   if(isFormValid() == true){
      console.log('valid data')
      placeOrder()
   }
    
 };
  

 
  let ref = useRef();

  React.useEffect(()=>{
    //getHomeProductList()
/*     if(product.length === 0){
        getCart()
    }
 */
  if(country == ''){
    getCartList()
  }
  
   

  },[])

  var i, sum = 0, nums = ['100','300','400','60','40'];

    for (i = 0; i < prodQan.length; i++) {
        sum += +prodQan[i].total*prodQan[i].quantity;
       
    }
 

  const getHomeProductList = (proID,quan) =>{
   // setLoading(true)
  
  
    axios.get(`https://yourang.io/lls/public/api/auth/product/${proID}`)
    .then((res) => {
      //console.log(res)
         setLoading(false)
           const imgdata = res.data.images
           setImgUrl(imgdata)
           const prodata = res.data.product[0]
           const pricedata = res.data.price[0]
          setLineItem(prodata.ID)
          setTitle(prodata.post_title)
          setSubTitle(prodata.post_name)
          setPrice(pricedata.max_price)

          let data = {         
            'title':prodata.post_title,
            'user_id':prodata.ID,
            'price':pricedata.max_price,
            'quantity':quan
          }
          var totals = total
          var tot = totals+parseInt(pricedata.max_price)
          setTotal(tot*quan + total)
           product.push(data)
          // console.log("res.images",data)
           //console.log("res.tot",tot*quan)
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
        console.log(res.data.items)
          setPrice(res.data.totals.subtotal)
          setTotal(res.data.totals.total)
          setTax(res.data.totals.total_tax)        
          const ress = res.data
          const resData = ress.customer
          //console.log('res.length')
          let secProduct = Object.keys(resData)
          let products = resData[secProduct[0]] 
          // console.log('res',products)
          setBillingDetail(products)
          setFname(products.billing_first_name)  
          setLname(products.billing_last_name)
          setEmail(products.billing_email)
          setCountry(products.billing_country)
          setCity(products.billing_city)
          setAddress(products.billing_address_1)
          setPhone(products.billing_phone)
         }).catch((er)=>{
          console.log(er)
          setLoading(false)
        })
  }



      const placeOrder = () =>{
        const items = product
        const itemValue = []
       
        items.map((data)=>{
            let id = data.id
            const resData = data.quantity.value
            console.log('res.length',data.quantity.value)
                     itemValue.push({
                      "product_id": id,
                      "quantity": resData
                    })
        })
        
        const data = {
          "payment_method": "bacs",
          "payment_method_title": "Direct Bank Transfer",
          "set_paid": true,
          "billing": {
            "first_name": firstname,
            "last_name": lname,
            "address_1": address,
            "address_2": "",
            "city": city,
            "state": city,
            "postcode": billingDetail.billing_postcode,
            "country": country,
            "email": email,
            "phone": phone
          },
          "shipping": {
            "first_name": firstname,
            "last_name": lname,
            "address_1": address,
            "address_2": "",
            "city": city,
            "state": city,
            "postcode": billingDetail.billing_postcode,
            "country": country
          },
          "line_items":itemValue,
          "shipping_lines": [
            {
              "method_id": "flat_rate",
              "method_title": "Flat Rate",
              "total": total
            }
          ]
        };
        setLoading(true)
        const url = `https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/orders?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`
        axios.post(url, data)
      .then(function (response) {
          console.log(response.data)
          let res = response.data
      
         // console.log(res)
          /* setAssImg(require('../images/done.png'))
          setAssMess("Order Successfully Placed")
          setMessage(true)
          setLoading(false) */
          clearCart(res.id)
          
      }).catch(function (error) {
          console.log(error);
          setLoading(false)
         
      });
      }


    const clearCart = (id) =>{
      const url = `https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart/clear?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`
      axios.post(url)
      .then(function (response) {
        console.log("clearCart",response.data)
        const data = response.data
        /* setAssImg(require('../images/done.png'))
        setAssMess("Order Successfully Placed")
        setMessage(true) */
        setLoading(false) 
        console.log("OrderConfirm",id)
        navigation.navigate("OrderConfirm",{data:id})
    }).catch(function (error) {
        console.log(error);
        setLoading(false)
       
    });
    }
    


  return (
    <SafeAreaView
      style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      /*   backgroundColor: '#ffffff' */
      }}>
      <ScrollView>
        <View style={{marginTop:10,width:'100%',alignContent:'center',alignItems:'center'}}>
     
     
          <View style={{width:'95%',alignContent:'center'}}>
          <View style={{marginBottom:20,width:'100%',marginTop:20,backgroundColor:'#FFFFFF'}}>
          <View style={{marginBottom:0,width:'100%',marginTop:20,justifyContent:'center',alignItems:'center',padding:5}}>
          <View style={{marginBottom:10,width:'100%',marginTop:0}}>
          <Text style={{fontSize:18,color:"#000"}}>BILLING DETAILS</Text>
          </View>
          <View  style={{
                  width:"100%",
                }}>
              <View
                style={{
                  width:"100%",
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                

                <TextInput
                  style={{...styles.input,width:"55%"}}
                    onChangeText={(data)=>{setFname(data)}}
                    value={firstname}
                    placeholder={'First Name *'}
                />

                 <TextInput
                  style={{...styles.input,width:"40%"}}
                  onChangeText={(data)=>{setLname(data)}}
                  value={lname}
                    placeholder={'Last Name *'}
                />
              </View>
              {isFieldInError('firstname') && getErrorsInField('firstname').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter First Name</Text>) }
              {isFieldInError('lname') && getErrorsInField('lname').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter Last Name</Text>) }
         
            </View>

            
            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                onChangeText={(data)=>{setEmail(data)}}
                value={email}
                  placeholder={'Email *'}
              />
          {isFieldInError('email') && getErrorsInField('email').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter valid Email</Text>) }
          
            </View>
            </View>
            </View>




            <View style={{marginBottom:20,width:'100%',marginTop:10,backgroundColor:'#FFFFFF'}}>
          <View style={{marginBottom:0,width:'100%',marginTop:20,justifyContent:'center',alignItems:'center',padding:5}}>
          <View style={{marginBottom:10,width:'100%'}}>
          <Text style={{fontSize:18,color:"#000"}}>ADDRESS</Text>
          </View>

            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                  onChangeText={(data)=>{setCountry(data)}}
                  value={country}
                  placeholder={'Country / Region *'}
              />
           
                   {isFieldInError('country') && getErrorsInField('country').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                  onChangeText={(data)=>{setAddress(data)}}
                  value={address}
                  placeholder={'Street address *'}
              />
                  {isFieldInError('address') && getErrorsInField('address').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                  onChangeText={(data)=>{setCity(data)}}
                  value={city}
                  placeholder={'Town / City *'}
              />
                  {isFieldInError('city') && getErrorsInField('city').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                  onChangeText={(data)=>{setConfirmPassword(data)}}
                  value={ConfirmPassword}
                  placeholder={'State / County (optional)'}
              />
                  {isFieldInError('ConfirmPassword') && getErrorsInField('ConfirmPassword').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 5,
                width:"100%"
              }}>
            
              <TextInput
                style={{...styles.input,width:"100%"}}
                  onChangeText={(data)=>{setPhone(data)}}
                  value={phone}
                  placeholder={'Phone *'}
              />
                  {isFieldInError('phone') && getErrorsInField('phone').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 10,
                width: '95%',
              }}>
              <Checkbox
                onClick={() => {setSelection(!isSelected), navigation.navigate('AddAddress')}}
                rightTextStyle={{
                  color: '#231224',
                  fontSize: 18,
                  lineHeight: 22,
                  textAlign: 'left',
                  fontFamily: 'FuturaPTMedium',
                }}
                rightText={
               "Ship to a diffrent address"
                }
                isChecked={isSelected}
              />
            </View>
          
            
          </View>

          </View>
            </View>
     {/*    <View style={{marginBottom:20,marginTop:20}}>
          <Text style={{fontSize:24,color:"#000"}}>YOUR ORDER</Text>
          </View>
         <View style={{width:"100%",height:30,backgroundColor:'#FFF',borderRadius:2,justifyContent:'space-around',alignContent:'center',flexDirection:'row'}}>
        
         <View style={{width:'40%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#000",fontWeight:'bold'}}>Product</Text>
         </View>
         <View style={{width:'15%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#000",fontWeight:'bold'}}>Price</Text>
         </View>
         <View style={{width:'15%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#000",fontWeight:'bold'}}>Quantity</Text>
         </View>
         <View style={{width:'20%',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:"#000",fontWeight:'bold'}}>Subtotal</Text>
         </View>
  
         </View> */}
    
         <View style={{marginBottom:20,width:"95%"}}>
         {/* <FlatList      
         data={product}
         keyExtractor={item => item.ID+Math.random()} 
         renderItem={({ item,index }) => modalList(item)}
         /> */}
     

     <View style={{width:"100%",marginTop:20,marginBottom:20,marginTop:10,backgroundColor:'#FFFFFF',padding:10}}>
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


     {/*    
        <View style={{width:'100%',alignItems:'center',marginTop:20,backgroundColor:'#FFFFFF'}}>
        <View style={{backgroundColor:'#F1F0F1',width:'95%',alignItems:'center',borderRadius:5}}>
            
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginBottom:0,marginTop:20,left:20}}>

            <View style={{height:12,width:12,borderRadius:20,backgroundColor:'#000',marginRight:10}}></View>
                <Text style={{fontSize:20}}>Cash On Delivery</Text>
            </View>
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginBottom:0,marginTop:20,left:20}}>

            <View style={{height:12,width:12,borderRadius:20,marginRight:10,borderWidth:0.3,borderColor:"#000"}}></View>
                <Text style={{fontSize:20}}>Internet Banking</Text>
            </View>
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',marginBottom:20,marginTop:20,left:20}}>

            <View style={{height:12,width:12,borderRadius:20,borderWidth:0.3,borderColor:"#000",marginRight:10}}></View>
                <Text style={{fontSize:20}}>Credit Card</Text>
            </View>

      

        </View>
        </View> */}
   
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
           navigation.navigate("Home")      
          }} 
          style={{width:'100%',alignItems:'flex-end',justifyContent:'space-around',padding:10,right:10}}>
               
         <Text style={{color:'#641893',fontSize:22,fontWeight:'400'}}>Close</Text>
         </TouchableOpacity>
        </View>
       </View>
      </Modal>
      {/*   <FooterBanner /> */}
      </ScrollView>
   
      <TouchableOpacity
        onPress={()=>{onPressButton()}}
        style={{
          width:'100%',height:50,marginTop:0,marginBottom:0,backgroundColor:'#231224'
        }}>
        {/* <ImageBackground
          resizeMode="cover"
          resizeMethod="resize"
          style={{
            width:'100%',height:'100%'
          }}
          source={require('../images/background-menu.png')}> */}
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 0,
              borderWidth: 1,
              fontSize: 14,
              color: '#fff',width:'100%',height:'100%',alignItems:'center',alignContent:'center',justifyContent:'center'
            }}>
   
            <Text style={styles.outlined}>Place Order</Text>

          </View>
        {/* </ImageBackground> */}
      </TouchableOpacity>
    
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
    fontSize: 17,
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
  },
  smallText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  input: {
    borderColor: '#000000',
    color: '#000000',
    borderWidth: 0.5,
    height:40
  }
});
export default Checkout;
