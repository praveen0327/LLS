import 'react-native-reanimated';
import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Image, SecureStore} from 'react-native';
import {createDrawerNavigator, useDrawerStatus} from '@react-navigation/drawer';
import {NavigationContainer,useNavigation,useIsFocused} from '@react-navigation/native';
import ProductDetails from './Screens/ProductDetails';
import Home from './Screens/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import AddAddress from './Screens/AddAddress';
import ProductList from './Screens/ProductList';
import Menu from './Screens/Menu';
import Cart from './Screens/Cart';
import OrderConfirm from './Screens/OrderConfirm';
import Checkout from './Screens/Checkout';
import Order from './Screens/Order';
import Filter from './Screens/Filter';
import OrderDetails from './Screens/OrdersDetails';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from './Screens/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export const AuthContext = React.createContext();
export const MainContext = React.createContext();
import {navigationRef} from './RootNavigation';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
const AuthenticatedRoutes = ({navigation,route}) => {
  const [productListHeader, setProductListHeader] = React.useState('');
  const isFocused = useIsFocused();
  const [badge, setBadge] = React.useState(0);
  const navigat = useNavigation();
  const [navType,setNavType] = React.useState('')
  const [navImg,setNavImg] = React.useState('')

  const [foot,setFoot] = React.useState('')

    React.useEffect(()=>{
      AsyncStorage.getItem('cartBadge').then((res)=>{console.log(res)})
      if(badge == 0){
        setBadge(0)
        getCart()
      }else{
        getCart()
      }
     
    },[isFocused])

    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'Cart':
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



   const mainContext = React.useMemo(
    () => ({
      Cart: async data => {
        console.log("mainContext",data.count)
       setBadge(data.count)
        dispatch({type: 'Cart', isCount: data});
      }
    }),
    [],
  );
  
   
  const getCart = () =>{
 
  axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/cocart/v2/cart?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
  .then((res) => {
   
      let count = res.data
  
      setBadge(count.item_count)
  }).catch(function (error) {
      console.log(error);
    
     
  });
    }

    const nav = () =>{
      navigationRef.navigate('Cart',{data:"data"});
     }
    //let name = route.name
 //   if(name == 'Home'? setNavImg(require('./images/menu.png')) : setNavImg(require('./images/menu.png'))) 

/* 
   AsyncStorage.getItem('cartBadge').then((res)=>{
    console.log('qcartBadge',res)
    setBadge(res)
  
  }).catch((err)=>{
    console.log('err')
   }) */


  return (
    <MainContext.Provider value={mainContext} >
      <Drawer.Navigator
        screenOptions={({navigation, route}) => ({
          
          headerStyle: {
            backgroundColor: '#231224',
            height: 85,
          },
          headerTintColor: '#c39f95',
          
          headerRight: () => {
              let check = route.name
              setFoot(check)
              
            return(
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              { check == 'Home'?<TouchableOpacity
                style={{paddingRight: 10}}
                onPress={() => console.log("Search pressed")}>
                      <Image
                resizeMode="contain"
                style={{width: 27, height: 27, marginLeft: 20}}
                source={require('./images/search.png')}
              />
              </TouchableOpacity>:null}

             {check == 'Cart'?<TouchableOpacity
                style={{paddingRight: 10}}
                onPress={() => console.log("Search pressed")}>
                      <Image
                resizeMode="contain"
                style={{width: 25, height: 25, marginRight: 20}}
                source={require('./images/love.png')}
              />
              </TouchableOpacity>: null}

            {  check == 'OrderConfirm' || check == 'OrderDetails' || check == 'Cart'? null:
              <TouchableOpacity onPress={()=>{nav()}}>
              {badge !== 0? 
              <View>
              <View style={{height:12,width:12,borderRadius:12,backgroundColor:'#D1B19F',justifyContent:'center',alignContent:'center',alignItems:'center',left:18,bottom:0}}>
                 <Text style={{fontSize:8,fontWeight:'800',color:"#FFFFFF"}}>{badge}</Text>
              </View>
              <Image
              resizeMode="contain"
              style={{width: 22, height: 22, marginRight: 20,top:-8}}
              source={require('./images/bag.png')}
              />
              </View>
              : <Image
              resizeMode="contain"
              style={{width: 22, height: 22, marginRight: 20}}
              source={require('./images/bag.png')}
            />}
              
            </TouchableOpacity>}
            </View>
          )},
          
          headerLeft: () => {
           
           let nae = route.name
           if(nae == 'Home'){
            setNavImg(require('./images/menu.png'))
            
          }
            return (
          
              <TouchableOpacity
                style={{paddingRight: 8}}
                onPress={() => navigation.toggleDrawer()}>
                      <Image
                resizeMode="contain"
                style={{width: 25, height: 25, marginLeft: 20}}
                source={navImg}
              />
              </TouchableOpacity>
            );
          }, 
        })}
      
        drawerStyle={{
          backgroundColor: '#231224',
        }}
        drawerContent={props => (
          <Menu setProductListHeader={setProductListHeader} {...props} />
        )}
        initialRouteName="Home" >
          
        <Drawer.Screen
          name="Home"
          options={{headerTitle: props => <Header title="Home" {...props} />,headerTitleAlign: 'center'
          ,}}     
          component={Home}
        />

        <Drawer.Screen
          name="AboutUs"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="About" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
    
          })}
          component={AboutUs}
        />


        <Drawer.Screen
          name="OrderConfirm"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Order Confirm" {...props}/>,
            
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            },
          
    
          })}
          
          component={OrderConfirm}
        />
        <Drawer.Screen
          name="ContactUs"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Contact" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={ContactUs}
        />
         <Drawer.Screen
          name="Cart"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Cart" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={Cart}
        />

        <Drawer.Screen
          name="Filter"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Filter" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={Filter}
        />


        <Drawer.Screen
          name="Order"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Orders" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={Order}
        />

<Drawer.Screen
          name="OrderDetails"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="OrderDetails" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.navigate('Order')}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={OrderDetails}
        />

        <Drawer.Screen
          name="Checkout"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="Checkout" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={Checkout}
        />

<Drawer.Screen
          name="AddAddress"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="AddAddress" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.navigate('Checkout')}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={AddAddress}
        />

<Drawer.Screen
          name="SignIn"
          options={{headerShown: false}}
          component={SignIn}
        />

<Drawer.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />

{/* <Drawer.Screen
          name="ProductDetails"
          options={({navigation, route}) => ({
            headerTitle: props => <Header title="ProductDetails" {...props} />,
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })}
          component={Checkout}
        /> */}
        <Drawer.Screen
          name="ProductList"
          options={({navigation, route}) => ({
            headerTitle: props => (
              <Header title=/* {productListHeader} */"Product" {...props} />
            ),
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.goBack()}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })} 
          component={ProductList}
          />

        <Drawer.Screen
          name="ProductDetails"
          options={({navigation, route}) => ({
            headerTitle: props => (
              <Header title=/* {productListHeader} */"ProductDetails" {...props} />
            ),
            headerLeft: () =>{
              return (
           
                <TouchableOpacity
                  style={{paddingRight: 8}}
                  onPress={() => navigation.navigate('ProductList')}>
                        <Image
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginLeft: 20}}
                  source={require('./images/back.png')}
                />
                </TouchableOpacity>
              );
            }
          })} 
          component={ProductDetails}
          />
            
        {/*   {props => (
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name="List"
                component={prps => <ProductList {...prps} />}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="ProductDetails"
                component={prps => <ProductDetails {...prps} />}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen> */}
      </Drawer.Navigator>
  {/*  <Footer setProductListHeader={setProductListHeader} /> */}
    </MainContext.Provider>
  );
};

export default function App({navigation}) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
 ;

//console.log("AuthContext",AuthContext)
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});



      AsyncStorage.getItem('userID').then((res)=>{
        console.log('AppuserID',res)
      
          if(res != null){
            console.log(res)
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
          }else{
            console.log(res)
          }
      
      }).catch((err)=>{
        console.log('err')
       })
    };


    

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log("data",data)
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        {state.isLoading /* || state.userToken == null */ ? (
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : (
              // No token found, user isn't signed in
              <>

               {/* <Stack.Screen
                  name="Home"
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                  component={Home}
                  /> */}
                  
                <Stack.Screen
                  name="SignIn"
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                  component={SignIn}
                />
              <Stack.Screen
                  name="SignUp"
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                  component={SignUp}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                  component={ForgotPassword}
                />
              </>
            )}
          </Stack.Navigator>
         
        ) : (
          <AuthenticatedRoutes />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
