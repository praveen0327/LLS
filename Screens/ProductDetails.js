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
  Dimensions,Modal,ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
const {width: screenWidth} = Dimensions.get('window');
import FooterBanner from '../Components/FooterBanner';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Product from '../Components/Product';
import axios from 'axios';
import Footer from '../Components/Footer';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import {MainContext} from '../App';
const data = [
  {
      "images": "https://codeandcode.xyz/demo/ladies-love-shopping/wp-content/uploads/2022/01/CFNOS2010010_1.jpg"
  }
];
const ProductDetails = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [lineItem,setLineItem] = React.useState()
  const [title,setTitle] = React.useState()
  const [subTitle,setSubTitle] = React.useState()
  const [price,setPrice] = React.useState('')
  const [imgUrl,setImgUrl] = React.useState()
  const [assImg,setAssImg] = React.useState()
  const [assMess,setAssMess] = React.useState()
  const [Message, setMessage] = React.useState(false);
  const [size,setSize] = React.useState([])
  const [values, setValue] = useState(null);
  let ref = useRef();
  const ID = route.params.data
  console.log(ID)
 
  const {Cart} = React.useContext(MainContext);
  React.useEffect(()=>{
    if(size.length > 0){
      setSize([])
      getHomeProductList()
    }else{
      getHomeProductList()
    }
  },[isFocused])

  const getHomeProductList = () =>{
    setLoading(true)
    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wc-api/v3/products/${route.params.data}?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((response) => {
      console.log(response.data)
     
           setLoading(false)
        /*    const imgdata = res.data.images
           setImgUrl(imgdata)
           const prodata = res.data.product[0]
           const pricedata = res.data.price[0]
          setLineItem(prodata.ID)
          
          setSubTitle('High-Heeled Sandals')
          setPrice(pricedata.max_price)
           console.log("res.images",prodata.ID) */
           let res = response.data.product
           //console.log('res.length')
           setImgUrl(res.images)
           setTitle(res.title)
          
           setPrice(res.price)
           let siz = res.attributes[0]
           let subTitle = res.attributes[1]
           
          
           let st = subTitle.options
           setSubTitle(st[0])
           let ss = siz.options
           ss.map((d)=>{
           size.push(
            {
              label: d,
              value: d,
            }
           )
           })
           console.log(res.attributes)

           console.log('High-Heeled Sandals',siz.options)
           
           //setSize(res.attributes.options)
           console.log("res.images",res)
         }).catch((er)=>{
          console.log(er)
        })
  }
  const ids= route.params.data
  console.log(ids)
  const addtoCart = () =>{
   
  setLoading(true)

   var d = 1

var url= `https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart/add-item?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`
var header = { headers: {"Content-Type" : `application/json; charset=utf-8`} }
  const id = ids.toString()
  const sizeValue = values.value
 // console.log('sizeValue',sizeValue)
    axios.post(url, {
    'id': id,
    'quantity': '1',
    'variation' : { 
      'attribute_pa_size': sizeValue
    }
})
.then(function (response) {
    console.log(response)
    let res = response.data

   // console.log(res)
    setAssImg(require('../images/done.png'))
    setAssMess("Added Successfully")
    setMessage(true)
    setLoading(false)
      
    
}).catch(function (error) {
    console.log(error);
    setLoading(false)
   
});

  }



  const getCartCount = (proID,quan) =>{

    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
  
          Cart({count:res.data.item_count})
  
         }).catch((er)=>{
          console.log(er)
        
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
          source={{uri:item.src}}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
    );
  };
  console.log(size)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{flex:0.9}}>
        <View style={{marginVertical: 20}}>
          <View>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                height: screenWidth - 60,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 75,
                    width: 75,
                    zIndex: 99,
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      ref.snapToPrev();
                    }}>
                    <Icon name="angle-left" size={50} color="#000" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 75,
                    zIndex: 99,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      ref.snapToNext();
                    }}>
                    <Icon name="angle-right" size={50} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
            {imgUrl == null?null:
              <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 10}
                itemHeight={screenWidth - 60}
                data={imgUrl}
                onScroll={event => setCurrentProduct(ref.currentIndex)}
                ref={c => {
                  ref = c;
                }}
                renderItem={_renderItem}
              />}
            </View>
          </View>
          <View style={{padding: 10}}>
            <ScrollView horizontal={true}>
              <View style={styles.scrollCategories}>
                {imgUrl == null?null:
                imgUrl.map((item, ind) => (
                  <Image
                    key={ind}
                    source={{uri:item.src}}
                    resizeMode="cover"
                    style={
                      ind === currentProduct
                        ? {
                            borderWidth: 1,
                            borderColor: '#000',
                            width: 70,
                            height: 70,
                            margin: 10,
                          }
                        : {width: 70, height: 70, margin: 10}
                    }
                  />
                ))
                }
                
              </View>
            </ScrollView>
            <View style={{alignSelf: 'center', width: '95%'}}>
              <Text
                style={{
                  color: '#231224',
                  fontFamily: 'FuturaPTThin',
                  fontSize: 22,
                }}>
              {title}
              </Text>
              <Text
                style={{
                  color: '#231224',
                  fontFamily: 'FuturaPTBook',
                  fontSize: 20,
                  paddingVertical: 10,
                }}>
                {subTitle}
              </Text>
              <Text
                style={{
                  color: '#231224',
                  fontFamily: 'FuturaPTMedium',
                  fontSize: 24,
                }}>
                AED {price}
              </Text>
              <View style={{flex: 1, flexDirection: 'row', marginVertical: 20}}>
                <View style={{flex: 0.2, alignSelf: 'center'}}>
                  <Text
                    style={{
                      color: '#231224',
                      fontSize: 18,
                      fontFamily: 'FuturaPTMedium',
                    }}>
                    Size
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    marginHorizontal: 10,
                    padding: 10,
                    borderWidth: 1,borderColor:'#D1B19F'
                  }}>
                 <Dropdown
                  data={size}
                  value="value"
                  labelField="label"
                  valueField="value"
                  maxHeight={155}   
                  onChange={(data) => {setValue(data)}}
                  selectedTextStyle={{color: '#231224'}}
                  style={{
                    ...styles.input,
                    paddingLeft: 15,
                    color: '#231224',
                    flex: 0.4,
                  }}
                />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',justifyContent: 'space-around',
          }}>
          <TouchableOpacity
          onPress={()=>{addtoCart()}}
            style={{
              flex: 0.45,
            }}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="resize"
              source={require('../images/background-menu.png')}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderWidth: 1,
                  fontSize: 14,
                  color: '#fff',
                }}>
                {/* <TouchableOpacity onPress={() => drawer.openDrawer()}> */}
                <Text style={styles.outlined}>ADD TO CART</Text>
                {/* </TouchableOpacity> */}
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 15,
              alignItems: 'center',
              borderWidth: 1,
              flex: 0.45,
              alignSelf: 'center',
              fontSize: 14,
            }}>
            <Text style={{color: '#231224'}}>ADD TO WISHLIST</Text>
          </View>
        </View>
        <View style={{padding: 20, flex: 1}}>
          <Text
            style={{
              color: '#231224',
              fontSize: 22,
              paddingVertical: 10,
              fontFamily: 'FuturaPTMedium',
            }}>
            Details
          </Text>
          <Text
            style={{
              fontFamily: 'FuturaPTBook',
              color: '#231224',
              fontSize: 18,
              lineHeight: 24,
            }}>
            These loose pleated seatpants with voluminous wide legs, high
            waits,elasticated drawstring waistband,logo embellished side panels,
            andkanal stitching give you a laid - back elegance in your look.
            {'\n\n'}
            Fendi offers a sophisticated look and comfortable feel in all months
            with its unique patterns,tailoring,and aesthetic silhouettes.
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 40,
              color: '#231224',
              fontFamily: 'FuturaPTBold',
              fontSize: 22,
            }}>
            YOU MAY ALSO LIKE
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.scrollCategories}>
            <View style={{margin: 15}}>
              <Product />
            </View>
            <View style={{margin: 15}}>
              <Product />
            </View>
            <View style={{margin: 15}}>
              <Product />
            </View>
            <View style={{margin: 15}}>
              <Product />
            </View>
            <View style={{margin: 15}}>
              <Product />
            </View>
          </View>
        </ScrollView>
        <Text>{'\n'}</Text>

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
         <View  style={{
           
            flexDirection: 'row',justifyContent:'space-between',width:'100%',alignItems:'center'
          }}>
         <TouchableOpacity onPress={()=>{
           setMessage(false) 
           getCartCount()
          }} 
          style={{width:'50%',alignItems:'center',justifyContent:'center',padding:10,right:0}}>
               
         <Text style={{color:'#641893',fontSize:22,fontWeight:'400'}}>Close</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{
           setMessage(false) 
          navigation.navigate("Cart")      
          }} 
          style={{width:'50%',alignItems:'center',justifyContent:'center',padding:10,right:0}}>
               
         <Text style={{color:'#641893',fontSize:22,fontWeight:'400'}}>View Cart</Text>
         </TouchableOpacity>
         </View>
  
        </View>
       </View>
      </Modal>
        <FooterBanner />
      </ScrollView>
      <Footer style={{height:0}}  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    height: 400,
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
export default ProductDetails;
