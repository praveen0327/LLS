/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  ImageBackground,
  TouchableOpacity,Modal,ActivityIndicator,FlatList,StatusBar
} from 'react-native';
import Category from '../Components/Category';
import FooterBanner from '../Components/FooterBanner';
import ImageButton from '../Components/ImageButton';
import OutlinedButton from '../Components/OutlinedButton';
import Footer from '../Components/Footer';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import {MainContext} from '../App';
import axios from 'axios';
const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() ==="light";
  const [loading, setLoading] = React.useState(false);

  const [category,setCategory] = React.useState([])
  
  const {Cart} = React.useContext(MainContext);
  const [productListHeader, setProductListHeader] = React.useState('');
  
  const isFocused = useIsFocused();
  React.useEffect(()=>{
    if(category.length > 0){
      setCategory([])
      getHomeProductList()
    }else{
      getHomeProductList()
    }
  // getHomeProductList()
  getCartCount()
  },[isFocused])
  
  const getHomeProductList = () =>{
    setLoading(true)
 /*    axios.get(`https://yourang.io/lls/public/api/auth/home`) */
    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wc-api/v3/products/categories?context=view&context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
      let data = res.data.product_categories
      data.map((res)=>{
        if(res.image != '' && res.parent == '0'){
          console.log("res",res.id)
          category.push(res)
        }
      })
           //setCategory(res.data.product_categories)
           setLoading(false)
           console.log(res.data.product_categories)
         }).catch((er)=>{
          console.log(er)
        })
  }

  const renderdata = (item) =>{
    return(
      <TouchableOpacity
      onPress={()=>{navigation.navigate('ProductList',{data:item.id})}}
      style={{
        flex: 0.45,
        alignItems: 'center',
      }}>
       <View style={{height:230,width:"100%",marginBottom:20}}>
              <Image source={{uri:item.image}} style={{height:200,width:"100%"}}/>
              <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:30,width:"100%",marginBottom:0,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{
                    ...styles.smallTexts,
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  {item.name}
                </Text>
            </ImageBackground>
              </View>
    </TouchableOpacity>
    )
  }


const getCartCount = (proID,quan) =>{

  axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
  .then((res) => {

        Cart({count:res.data.item_count})

       }).catch((er)=>{
        console.log(er)
      
      })
}
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
  animated={true}
  backgroundColor="#231224"
  barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={{flex:0.9}}>
       
          <ImageBackground
            source={require('../images/banner1.jpg')}
            resizeMode="cover"
            style={{height:250,width:'100%',alignItems:'center',justifyContent:'center'}}>
            <Text style={{...styles.bigText, fontSize: 25}}>
              UP TO {'\n'}70% OFF
            </Text>
            <View
              style={{
                padding: 20,
                width: '50%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <ImageButton title="BAGS" />
            </View>
          </ImageBackground>
       
        <View style={styles.smallContainer}>
          <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:100}}>
            <View
              style={{
                flex: 1,
                // alignItems: 'center',

               flexDirection:'row',
               alignContent:'center',
               alignItems:'center',
               justifyContent:'center'
              }}>
              <View
                style={{
                  ...styles.smallTextView,
                  alignItems: 'center',
                  justifyContent:'center',
                  alignContent:'center'
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../images/shop-bag.png')}
                  style={{width: 25, height: 25, marginRight: 0,marginBottom:10}}
                />
                <Text
                  style={{
                    fontSize:12,
                    color:'#FFFFFF',
                    fontFamily: 'FuturaPTLight',
                 
                  }}>
                  SHOP LOCAL CURRENCY
                </Text>
              </View>
              <View
                style={{
                  ...styles.smallTextView,
                  alignItems: 'center',
                  justifyContent:'center',
                  alignContent:'center'
                  
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../images/return.png')}
                  style={{width: 25, height: 25, marginRight: 0,marginBottom:10}}
                />
                <Text
                  style={{
                    fontSize:12,
                    color:'#FFFFFF',
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  RETURN IN 28 DAYS 
                </Text>
              </View>
              <View
                style={{
                  ...styles.smallTextView,
                  alignItems: 'center',
                  justifyContent:'center',
                  alignContent:'center'
               
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../images/package.png')}
                  style={{width: 22, height: 22, marginRight: 0,marginBottom:10}}
                />
                <Text
                  style={{
                    fontSize:12,
                    color:'#FFFFFF',
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  COD AVAILABLE
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Text
            style={{
              ...styles.bigText,
              paddingTop: 20,
              color: '#000000',
            }}>
            SHOP BY CATEGORY
          </Text>


          <View
            style={{
              flex: 1,
              padding: 0,
              marginTop:20
            }}>
           <FlatList
       numColumns={2}
       data={category}
       columnWrapperStyle={styles.row} 
       keyExtractor={item => item.id+Math.random()} 
       renderItem={({ item,index }) => renderdata(item)}
     />         
          </View>
     

        </View>

        <View>
          <View
            style={{
              position: 'absolute',
              height: 400,
              resizeMode: 'cover',
              width: '100%',
            }}>
            <View style={{width: '100%', height: 300}}>
              <ImageBackground
                source={require('../images/banner3.jpg')}
                resizeMode="cover"
                style={{
                  ...styles.image,
                }}
              />
            </View>
          </View>
          <Text
            style={{
              ...styles.bigText,
              paddingTop: 20,
              paddingHorizontal: 10,
              textAlign: 'right',
              fontSize: 24,
              fontFamily: 'FuturaPTBold',
              color: '#000000',
            }}>
            THE EDIT
          </Text>
          <Text
            style={{
              ...styles.smallText,
              fontFamily: 'FuturaPTMedium',
              color: '#000000',
              paddingHorizontal: 10,
              textAlign: 'right',
            }}>
            Get your inspo fix from the new season{'\n'}
            trends you need to know{'\n'}

          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <OutlinedButton title="SHOP NOW" />
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.scrollCategories}>
              
             
              <Category image={require('../images/ban2.jpg')} />
              <Category image={require('../images/ban1.jpg')} />
              <Category image={require('../images/ban2.jpg')} />
              <Category image={require('../images/ban1.jpg')} />
         
            </View>
          </ScrollView>
        </View>
        <View>
          <Text style={{...styles.bigText, color: '#000000'}}>
            WOMEN'S ACCESSORIES {'\n'}& JEWELLERY
          </Text>
          <View>
            <View
              style={{
             
             
                width:'100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems:'center',
                alignContent:'center'
              }}>
              <View
                style={{
                  width:'30%',
                  alignItems: 'center',
                }}>
                <Category image={require('../images/Group7copy3.png')} />
              </View>
              <View
                style={{
                  width:'30%',
                  alignItems: 'center',
                }}>
                <Category image={require('../images/Group7copy4.png')} />
              </View>
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center', paddingBottom: 20}}>
            <ImageButton title="VIEW COLLECTIONS" />
          </View>
          <View>
            <View
              style={{
                position: 'absolute',
                height: 400,
                resizeMode: 'cover',
                width: '100%',
              }}>
              <View style={{width: '100%', height: 400}}>
                <ImageBackground
                  source={require('../images/Rectangle5.png')}
                  resizeMode="cover"
                  style={{
                    ...styles.image,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                justifyContent: 'center',
                margin: 40,
                alignItems: 'center',
                flex: 1,
                padding: 20,
              }}>
              <Image
                source={require('../images/logo1.png')}
                resizeMode="contain"
                style={{width: 50, height: 70}}
              />
              <View>
                <Text
                  style={{
                    ...styles.smallText,
                    fontFamily: 'FuturaPTBook',
                    textAlign: 'center',
                    color: '#000000',
                  }}>
                  IN LOVE WITH OUR
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.bigText,
                    fontSize: 26,
                    fontFamily: 'FuturaPTMedium',
                    color: '#000000',
                  }}>
                  HANDBAGS
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  padding: 20,
                }}>
                <OutlinedButton title="SHOP NOW" />
              </View>
            </View>
            <View style={{height:200,width:"100%",marginBottom:0 ,flexDirection:'row',justifyContent:'space-around',marginBottom:50}}>
              <View style={{height:200,width:"45%",marginBottom:0}}>
              <Image source={require('../images/bag1.jpg')} style={{height:200,width:"100%"}}/>
              <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:30,width:"100%",marginBottom:50,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{
                    ...styles.smallTexts,
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  PEEKABOO
                </Text>
            </ImageBackground>
              </View>
              <View style={{height:200,width:"45%",marginBottom:0}}>
              <Image source={require('../images/bag5.jpg')} style={{height:200,width:"100%"}}/>
              <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:30,width:"100%",marginBottom:50,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{
                    ...styles.smallTexts,
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  XS ANTIGONA
                </Text>
            </ImageBackground>
              </View>

            </View>

            <View style={{height:200,width:"100%",marginBottom:30 ,flexDirection:'row',justifyContent:'space-around'}}>
              <View style={{height:200,width:"45%",marginBottom:0}}>
              <Image source={require('../images/bag4.jpg')} style={{height:200,width:"100%"}}/>
              <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:30,width:"100%",marginBottom:50,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{
                    ...styles.smallTexts,
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  PEEKABOO
                </Text>
            </ImageBackground>
              </View>
              <View style={{height:200,width:"45%",marginBottom:0}}>
              <Image source={require('../images/bag3.jpg')} style={{height:200,width:"100%"}}/>
              <ImageBackground
            source={require('../images/background-menu.png')}
            resizeMode="cover"
            style={{height:30,width:"100%",marginBottom:50,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{
                    ...styles.smallTexts,
                    fontFamily: 'FuturaPTLight',
                    textAlign: 'left',
                  }}>
                  XS ANTIGONA
                </Text>
            </ImageBackground>
              </View>

            </View>
          
          
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
       
        <FooterBanner />
      </ScrollView>
      <Footer style={{height:0}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    height: 400,
  },
  smallContainer: {
    flex: 1,
    height: 100,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  scrollCategories: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  bigText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  smallText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'FuturaPTMedium',
  },
  smallTexts: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'FuturaPTMedium',
  },
  smallTextView: {
    padding: 15,
    textAlign: 'left',
  },
  textContainer: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#231224',
    padding: 20,
    marginHorizontal: 20,
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
  row: {
    flex: 1,
    justifyContent: "space-around"
}
});
export default Home;
