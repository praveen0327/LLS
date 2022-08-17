import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,FlatList,Modal,ActivityIndicator,Image
} from 'react-native';
import React, {useRef} from 'react';
import FooterBanner from '../Components/FooterBanner';
import Product from '../Components/Product';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Filter from './Filter';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import Footer from '../Components/Footer';
export const ProductContext = React.createContext();
const ProductList = ({navigation}) => {
  let drawer = useRef(null);
 // const ID = route.params.data

/* console.log(drawer) */
const [sortValue,setSortValue] = React.useState(null)
  const isFocused = useIsFocused();
  const [lineItem,setLineItem] = React.useState()
  const [loading, setLoading] = React.useState(false);
  const [subTitle,setSubTitle] = React.useState()
  const [sort, setSort] = React.useState([
    {
      label: 'Price - Low to High',
      value: 'Price - Low to High',
    },
    {
      label: 'Price - High to Low',
      value: 'Price - High to Low',
    }
  ])
 

  React.useEffect(()=>{
  
      getProductList(null)
     

  },[isFocused])

  const getProductList = (value) =>{

    setLoading(true)
    /* axios.get(`https://yourang.io/lls/public/api/auth/category/15`) */

   
 /*  const sortvalue = null
    if(value == 0){
      sortValue = `orderby=id&order=asc&`
   }
    if(value == 1){orderby=price&order=asc&
      sortValue = `orderby=id&order=desc&`   
    } */
   const Urls = `https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/products?${value}context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`
   const Url = `https://codeandcode.xyz/demo/ladies-love-shopping/wc-api/v3/products?orderby=price&order=asc&context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc&category=${'15'}`
    
   axios.get(Urls)
    .then((res) => {
        
           setLoading(false)
           const products = res.data
           
    console.log('products')
           setLineItem(products)   
         }).catch((er)=>{
          console.log('er')
          setLoading(false)
        })
  }

  const renderdata = (item) =>{
    let subTitle = item.attributes[1]
           
          
           let st = subTitle.options
           let images = item.images[0]
           
    return(
      <TouchableOpacity
      onPress={()=>{navigation.navigate('ProductDetails',{data:item.id})}}
      style={{
        flex: 0.5,
        alignItems: 'center',marginBottom:10
      }}>
      <TouchableOpacity
      onPress={()=>{console.log('dfs')}} 
        style={{
          position: 'absolute',     
          flexDirection: 'row',
          width: '100%',
          height: 22,
          zIndex: 99,
          padding: 10,
          right:'0%',
          alignItems: 'flex-start',
          justifyContent: 'flex-end'
        }}>
        {/* <Icons onPress={()=>{console.log('dfs')}} name="md-heart-outline" size={25} color="#D1B19F" /> */}
        <Image source={require('../images/like.png')} style={{height:22,width:22}}/>
      </TouchableOpacity>
      <Image style={styles.image} source={{uri:images.src}} />
      <View style={styles.textContainer}>
        <Text style={styles.primary}>{item.name}</Text>
        <Text style={styles.secondary}>{st}</Text>
        <Text style={styles.primary}>AED {item.price}</Text>
      </View>
    </TouchableOpacity>
    )
  }

  const handleDrawerSlide = (data) =>{
    console.log(data)
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'Filter':
          return {
            ...prevState,
            isCount: 0,
          };
      }
    },
    {
      isCount: 0,
    },
  );

  const productContext = React.useMemo(
    () => ({
      Filter: async data => {
        console.log("mainContext",data)
       
        dispatch({type: 'Filter', isCount: data});
      }
    }),
    [],
  );
  return (
    <ProductContext.Provider value={productContext} >
    <DrawerLayout
      ref={refDrawer => {
        drawer = refDrawer;       
      }}
      drawerWidth={300}
      drawerPosition={DrawerLayout.positions.Left}
      drawerType="front"
      renderNavigationView={() => <Filter drawer={drawer} />}
      onDrawerSlide={(data) => {handleDrawerSlide("pree")}}>
     <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:0.9}}>
          <View  style={{
              width:'100%',
              marginTop:20,
              alignItems:'center',
              marginBottom:0
              }}>
                
          <View
              style={{
              width:'90%',
              }}>
              <View style={styles.searchSection}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="#231224"
                  underlineColorAndroid="transparent"
                />
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={20}
                  color="#000"
                />
              </View>
            </View>
          </View>
  
          <View style={{flex: 1, flexDirection: 'row',marginBottom:0,marginTop:5}}>
            <View style={{flex: 0.5,}}>
     
                <View
                  style={{
                    alignItems: 'center',
                    padding: 0
                  }}>
                  <TouchableOpacity onPress={() => drawer.openDrawer()}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon
                        style={{alignSelf: 'center',right:20}}
                        name="plus"
                        size={14}
                       
                      />
                      <Text style={styles.outlined}>Filter</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            
            </View>
            <View style={{flex: 0.5}}>
         
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 5,
                    borderLeftWidth: 2,
                    borderColor: 'white',
                  
                    
                  }}>
            
                 <Dropdown
                  data={sort}
                  value="value"
                  labelField="label"
                  valueField="value"
                  maxHeight={130}  
                   
                  onChange={(data) => {
                    console.log('dataa',data)
                    if(data.value == "Price - Low to High"){
                     getProductList(`orderby=price&order=asc&`)
                      console.log('data',data)
                    }
                    if(data.value == "Price - High to Low"){
                   getProductList(`orderby=price&order=desc&`)
                      console.log('High',data)
                    }
                  }}
                  selectedTextStyle={{color: '#231224'}}
                  style={{
                    ...styles.input,
                    paddingLeft: 15,
                    color: '#231224',
                   width:'80%'
                  }}
                />
         
                </View>
             
            </View>
          </View>
    
          <View
            style={{
              flex: 1,
              padding: 0,
              marginBottom:20
            }}>
           <FlatList
       numColumns={2}
       data={lineItem}
       columnWrapperStyle={styles.row} 
       keyExtractor={item => item.id+Math.random()} 
       renderItem={({ item,index }) => renderdata(item)}
     />         
          </View>
          <FooterBanner />
          <Modal
        animationType="fade"
        transparent={true}
        visible={loading}  
      >
           <View style={styles.centeredView}>
        <View style={styles.loads}>

        <ActivityIndicator style={{marginBottom:20,marginTop:20}} animating={true} size="large" color="#641893" />
       
        <Text style={{color:'#641893',fontWeight:'bold',fontFamily: 'FuturaPTLight'}}>Loading....</Text>
          </View>  
        </View>
      </Modal>
        </ScrollView>
        <Footer style={{height:0}} />
      </SafeAreaView>
    </DrawerLayout>
    </ProductContext.Provider>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    height: 400,
  },
  input: {
    width:'80%',
    fontSize: 18, 
    backgroundColor: '#fff',
    color: '#000',
    padding:10,
    borderRadius:0
  },
  searchSection: {
  
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius:0,
    width:'100%',
    borderColor:'#D1B19F'
  },
  searchIcon: {
    padding: 10,
  },
  outlined: {
    // margin: 10,
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 5,
    fontFamily: 'FuturaPTMedium'
  
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
  image: {
    width: 175,
    height: 200,
    resizeMode: 'stretch',
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  primary: {
    color: 'black',
    fontFamily: 'FuturaPTMedium',
    fontWeight: '600',
    fontSize: 16,
  },
  secondary: {
    color: 'black',
    fontFamily: 'FuturaPTBooked',
    fontSize: 14,
  },
  Bold: {
    color: 'black',
    lineHeight: 34,
    fontFamily: 'FuturaPTMedium',
    fontWeight: 'bold',
    fontSize: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
}
});
