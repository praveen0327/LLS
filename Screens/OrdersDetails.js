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
const OrderDetails = ({navigation,route}) => {
    const isFocused = useIsFocused();
    const [loading , setLoading] = React.useState(false)
    const [total,setTotal] = React.useState(0)
    const [subtotal,setSubTotal] = React.useState(0)
    const [price,setPrice] = React.useState('')
    const [Count,setCount] = React.useState()
    const [tax,setTax] = React.useState()
    const [product,setProduct] = React.useState([])
    const [email, setEmail] = useState('');
    const [billingDetail,setBillingDetail] = React.useState([])
    const [shippingDetail,setShippingDetail] = React.useState([])
    const [lineItem,setLineItem] = React.useState()
    React.useEffect(()=>{
        //getHomeProductList()
    /*     if(product.length === 0){
            getCart()
        }
     */

        getCartList()
      
      
       
    
      },[isFocused])

      const data = route.params.data 
      console.log(data)

    const getCartList = (proID,quan) =>{
        setLoading(true)
      
      
        axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/orders/${data}?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
        .then((res) => {
        console.log('res',res.data)
              setLoading(false)
              setProduct(res.data)
              setBillingDetail(res.data.billing)
              setShippingDetail(res.data.shipping)
              setTotal(res.data.total)
              const data = res.data.billing
              setEmail(data.email)
              const value = res.data.line_items
              setCount(value.length)
              setLineItem(res.data.line_items)
              const sum = value.reduce((accumulator, object) => {
                return accumulator + Number(object.subtotal);
              }, 0);
              setSubTotal(sum)
              console.log("subTotals",sum)
          /*    
              setLineItem(res.data.item_count)
              setProduct(res.data.items)
            console.log(res.data.items)
              setPrice(res.data.totals.subtotal)
           
              setTax(res.data.totals.total_tax)        
              const ress = res.data
              const resData = ress.customer */
              //console.log('res.length')
          /*     let secProduct = Object.keys(resData)
              let products = resData[secProduct[0]]  */
              
    /*           setBillingDetail(products) */
     
             }).catch((er)=>{
              console.log(er)
              setLoading(false)
            })
      }

      var amounts = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
 
      const timedate = String(product.date_created)
      const date = timedate.replace('T', '  ')


    const modalList=(item,index)=>{

             const data = item.image
             const itemQuantity = item.quantity
             const metadata = item.meta_data[0]
          return(
            <View   style={{width:"100%",height:260,alignItems:'center',justifyContent:'center',alignContent:'center',marginTop:10}}>
          <View style={{width:"95%",alignItems:'center',alignContent:'center',padding:5}}>
          <View style={{height:160,width:"50%",backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:"center"}}>
        <Image source={{uri:data.src}} style={{height:"95%",width:"95%",borderRadius:2}}/>
        </View>
          
        <View style={{width:'100%',marginTop:15,padding:5,alignItems:'center',justifyContent:"center"}}>
              <Text style={{color:"#000",fontWeight:'bold',fontSize:16,marginTop:5}}>{item.name}</Text>
              {/* <Text style={{fontWeight:'200',marginTop:5}}>Order Id:{item.id}</Text> */}
              <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'500',marginTop:5}}>Quantity:{itemQuantity == null ?'0':itemQuantity}</Text>
              <Text style={{fontWeight:'500',marginTop:5,left:5}}>Size:{metadata.value}</Text>
              </View>
  
           </View>
    
        
          </View>
           </View>
           
          )
      }

    return(
      <View style={{ flex:1}}>
        <ScrollView>
        <View style={{width:'100%',alignItems:'center',alignContent:'center'}}>
        
        <View style={{width:"95%",marginTop:0,marginBottom:0,marginTop:0,backgroundColor:'#FFFFFF',padding:10}}>
      <View style={{width:'100%',flexDirection:'row',marginTop:0}}>
            <View style={{height:40,width:40,backgroundColor:'#D1B19F',alignItems:'center',justifyContent:'center',borderRadius:30}}>
              <Image source={require('../images/box.png')} style={{height:24,width:24}}/>
            </View>
            <View style={{left:5}}>
                <Text style={{fontWeight:'bold',fontFamily: 'FuturaPTMedium',color:'#A0292E'}}>In Processing</Text>
                <Text style={{fontFamily: 'FuturaPTMedium',color:'#000'}}>Placed on {date}</Text>
            </View>
            </View>
            </View>
         <View style={{marginBottom:0,width:"100%"}}>
   
          <FlatList      
         data={lineItem}
         keyExtractor={item => item.id+Math.random()} 
         renderItem={({ item,index }) => modalList(item,index)}
         />

      </View>

        <View style={{width:"95%",marginTop:20,marginBottom:20,marginTop:20,backgroundColor:'#FFFFFF',padding:10}}>
        <View style={{marginBottom:10,marginTop:10}}>
          <Text style={{fontSize:16,color:"#000"}}>Billing Address</Text>
          </View>
          <View style={{width:"100%",alignItems:'center',justifyContent:'center'}}>
          <View style={{width:"90%",height:0.5,backgroundColor:'#E3E2E3',marginBottom:10}}></View>
          </View>

          <View style={{left:15}}>
          <Text style={{fontSize:18,color:"#000"}}>
               {billingDetail.first_name} {billingDetail.last_name}
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {billingDetail.address_1} {billingDetail.address_2}
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {billingDetail.city} 
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {billingDetail.email}
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {billingDetail.phone}
            </Text>
          </View>
  
        </View>

        <View style={{width:"95%",marginTop:20,marginBottom:10,marginTop:0,backgroundColor:'#FFFFFF',padding:10}}>
        <View style={{marginBottom:10,marginTop:10}}>
          <Text style={{fontSize:16,color:"#000"}}>Shipping Address</Text>
          </View>
          <View style={{width:"100%",alignItems:'center',justifyContent:'center'}}>
          <View style={{width:"90%",height:0.5,backgroundColor:'#E3E2E3',marginBottom:10}}></View>
          </View>

          <View style={{left:15}}>
          <Text style={{fontSize:18,color:"#000"}}>
               {shippingDetail.first_name} {shippingDetail.last_name}
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {shippingDetail.address_1} {shippingDetail.address_2}
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {shippingDetail.city} 
            </Text>
            <Text style={{fontSize:18,color:"#000"}}>
               {shippingDetail.phone}
            </Text>
          </View>
  
        </View>

        <View style={{width:"95%",marginTop:0,marginBottom:50,marginTop:10,backgroundColor:'#FFFFFF',padding:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:18,color:"#000"}}>Total Item Price</Text>
          <Text style={{fontSize:18,color:"#641893"}}>AED {amounts}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
          <Text style={{fontSize:18,color:"#000"}}>Payment Method</Text>
          <Text style={{fontSize:18}}>{product.payment_method}</Text>
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
      </View>
      </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems:'center',
   
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
  }
});
export default OrderDetails;
