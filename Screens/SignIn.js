/* eslint-disable prettier/prettier */
import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {AuthContext} from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageButton from '../Components/ImageButton';
import Footer from '../Components/Footer';
const SignIn = ({navigation}) => {
 
  const {signIn} = React.useContext(AuthContext);
  const [email,setEmail] = useState('test@test.com')
  const [password,setPassword] = useState('test1234')
  const [loading, setLoading] = useState(false);
  const [Fail, onChangeFail] = React.useState('')
  const [vis, setVis] = React.useState(true); 

  const setVisible=()=>{
    if(vis== true){
      setVis(false)
    }else {
      setVis(true)
    }
  }
 /*  useEffect(()=>{
  
    
  },[]) */

  const paramsCheck = () =>{
    if(email != '' && password != ''){
      loginData()
    }else{

    }
  }

  const loginData = () =>{
   

    if(email != '' && password != ''){
      setLoading(!loading)
  const data = {
    'email': email,
    'password': password,
  }
  let options = {
    method: 'POST',
    url: `https://yourang.io/lls/public/api/auth/login`,
    params: data,
    responseEncoding: 'utf-8',
    headers: {
      'Accept': 'application/json',
    }
};

return axios.request(options).then(function (response) {
    console.log(response.data)
    let res = response.data
    let message = response.data.message
    console.log(res)
    if(message == "success"){
     AsyncStorage.setItem('userID',String(res.data.ID))
     setLoading(false)
     onChangeFail("")
     navigation.navigate('Home')
     signIn({username: email, password: password,userID:res.data.ID})
    }else{
      setLoading(false)
      onChangeFail(message)
    }
}).catch(function (error) {
    console.log(error);
    setLoading(false)
    onChangeFail("Invalid username or password!")
});

}else{
  onChangeFail("Enter valid details!")
}


  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
            padding: 10,
          }}>
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{width: '60%', height: 200}}
          />
          <Text style={styles.bigText}>SIGN IN</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              margin: 10,
            }}>
            <Text style={styles.smallText}>Don't have an account? Please</Text>
            <Text
              style={{
                ...styles.smallText,
                fontFamily: 'FuturaPTLight',
                textDecorationLine: 'underline',
                paddingLeft: 5,
              }}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
            </Text>
          </View>
          <Text style={{color:"#FF0000",marginBottom:0,marginVertical: 0,fontSize:16}}>{Fail}</Text>
          <View style={{marginVertical: 10, width: '90%'}}>

            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  fontWeight: '300',
                  paddingBottom: 10,
                }}>
                Email Address<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                   onChangeText={(data)=>setEmail(data)}
                   value={email}
              />
            </View>
            <View
              style={{
                marginVertical: 0,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  fontWeight: '300',
                  paddingBottom: 10,
                }}>
                Password<Text style={{color: 'red'}}>*</Text>
              </Text>
              {/* <TextInput
                style={{...styles.input}}
                onChangeText={(data)=>setPassword(data)}
                value={password}
              /> */}
              <TouchableOpacity style={{ height:50,width:"100%",alignItems:'center',borderRadius:0 ,borderColor:"#000000",color:"#000000" , borderWidth: 1,marginBottom:0,flexDirection:'row',justifyContent:'space-between'  }}>
    <TextInput
      style={{ height:50,width:200 ,left:0,padding:10,fontSize:16 }}
      secureTextEntry={vis}
      onChangeText={text => setPassword(text)}
 
     
      value={password}
    />

    <TouchableOpacity style={{height:50,width:30,alignContent:'center',justifyContent:'center'}} onPress={()=>{setVisible()}}>
    <Image source={require("../images/invisible.png")} style={{height:25,width:25,padding:10,right:10}}  />
    </TouchableOpacity>
</TouchableOpacity>
            </View>
            <View style={{marginVertical: 30}}>
              <ImageButton
                onPress={() => loginData()}
                title="SIGN IN"
              />
            </View>
         
          </View>
          <Text
            style={{
              ...styles.smallText,
              textDecorationLine: 'underline',
              paddingLeft: 5,
            }}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password ?
          </Text>
          <View
            style={{
              marginVertical: 10,
              width: 350,
              marginBottom:0
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'FuturaPTLight',
              }}>
              Sign In to your account dashboard to view your recent orders,
              manage your shipping and billing adddressesand edit your password
              and account details.
            </Text>
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
       
     <Text style={{color:'#641893',fontWeight:'bold'}}>Loading....</Text>
          </View>  
        </View>
      </Modal>

      </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  smallText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  input: {
    borderColor: '#000000',
    color: '#000000',
    borderWidth: 1,
    fontSize:16
    
  },
  textContainer: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#231224',
    padding: 15,
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
export default SignIn;
