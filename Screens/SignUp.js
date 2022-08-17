/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,TouchableOpacity,Modal,ActivityIndicator
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Checkbox from 'react-native-check-box';
import ImageButton from '../Components/ImageButton';
import { useValidation } from 'react-native-form-validator';
import axios from 'axios';
import {AuthContext} from '../App';
const SignUp = ({navigation}) => {
  const {SignUp} = React.useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone , setPhone] = useState('');
  const [firstname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [remarks,setRemarks] = useState('')
  const [Password, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [assImg,setAssImg] = React.useState()
  const [assMess,setAssMess] = React.useState()
  const [Message, setMessage] = React.useState(false);
  const { validate, isFieldInError, getErrorsInField, getErrorMessages ,isFormValid} =
  useValidation({
    state: { email, Password, firstname,lname,ConfirmPassword},
  });
  const onPressButton =async () => { 
    validate({
     
     email: { email: true },
    
     firstname:{required: true},
     Password:{minlength: 8,required: true},
     ConfirmPassword:{equalPassword: Password},
     lname:{required: true},
   });
  // console.log('mj',isFormValid())
   if(isFormValid() == true){
  
       registerData()
     
   }
    
 };

 const registerData = () =>{
   

  
    setLoading(!loading)
const data ={
  'name': name+"."+firstname+" "+lname,
  'email': email,
  'password': Password,
  'date': "2022-05-9 05:50:49",
}
let options = {
  method: 'POST',
  url: `https://yourang.io/lls/public/api/auth/register`,
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
  setLoading(false)
  //navigation.navigate('SignIn')
  
  setAssImg(require('../images/done.png'))
  setAssMess("Registered Successfully")
  setMessage(true)
 /*  if(message == "success"){
    console.log(message)
   setLoading(false)
  

  }else{
    setLoading(false)

  } */
}).catch(function (error) {
  console.log(error);
  setLoading(false)

});




}
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
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
            style={{width: '50%', height: 150}}
          />
          <Text style={styles.bigText}>SIGN UP</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginTop: 10,
              width: '100%',
              alignItems:"center",
              justifyContent:'center'
            }}>
            <Text style={styles.smallText}>
              Already have an account? Please
            </Text>
            <Text
              style={{
                ...styles.smallText,
                fontFamily: 'FuturaPTLight',
                textDecorationLine: 'underline',
                paddingLeft: 5,
              }}
              onPress={() => navigation.navigate('SignIn')}>
              Sign in
            </Text>
          </View>
    <View style={{width: '95%'}}>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  paddingVertical: 5,
                }}>
                First Name<Text style={{color: 'red'}}>*</Text>
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Dropdown
                  data={[
                    {
                      label: 'Mr',
                      value: 'mr',
                    },
                    {
                      label: 'Ms',
                      value: 'ms',
                    },
                  ]}
                  value="mr"
                  labelField="label"
                  valueField="value"
                  maxHeight={125}
                  onChange={(data) => {setName(data)}}
                  selectedTextStyle={{color: '#231224'}}
                  style={{
                    ...styles.input,
                    paddingLeft: 15,
                    color: '#231224',
                    flex: 0.2,
                  }}
                />

                <TextInput
                  style={{...styles.input, flex: 0.75}}
                    onChangeText={(data)=>{setFname(data)}}
                    value={firstname}
                />
              </View>
              {isFieldInError('firstname') && getErrorsInField('firstname').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter First Name</Text>) }
           
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  paddingVertical: 5,
                }}>
                Last Name<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                  onChangeText={(data)=>{setLname(data)}}
                  value={lname}
              />
                   {isFieldInError('lname') && getErrorsInField('lname').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter Last Name</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  paddingVertical: 5,
                }}>
                Email Address<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                  onChangeText={(data)=>{setEmail(data)}}
                  value={email}
              />
                  {isFieldInError('email') && getErrorsInField('email').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>Please enter valid Email</Text>) }
          
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  paddingVertical: 5,
                }}>
                Password<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={{...styles.input}}
                  onChangeText={(data)=>{setNewPassword(data)}}
                  value={Password}
              />
            
                   {isFieldInError('Password') && getErrorsInField('Password').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  paddingVertical: 5,
                }}>
                Confirm Password<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={{...styles.input}}
                  onChangeText={(data)=>{setConfirmPassword(data)}}
                  value={ConfirmPassword}
              />
                  {isFieldInError('ConfirmPassword') && getErrorsInField('ConfirmPassword').map(errorMessage => <Text style={{color:"#FF0000",fontSize:14}}>{errorMessage}</Text>) }
         
            </View>
            <View
              style={{
                marginVertical: 10,
                width: '95%',
              }}>
              <Checkbox
                onClick={() => {}}
                rightTextStyle={{
                  color: '#231224',
                  fontSize: 14,
                  lineHeight: 16,
                  textAlign: 'left',
                  fontFamily: 'FuturaPTMedium',
                }}
                rightText={
                  "Let's get personal! We'll send you only the good stuff,Exclusive early access to Sale, new arrivals and promotions."
                }
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                width: "100%",
              }}>
              <Text
                style={{
                  ...styles.smallText,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'FuturaPTLight',
                }}>
                By registering an account you can view your any recent orders,
                manage your shipping and billing adddressesand edit your
                password and account details.
              </Text>
            </View>
            <View  style={{marginVertical: 30}}>
              <ImageButton onPress={()=>{onPressButton()}} title="SIGN UP" />
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
         <Image source={assImg} style={{height:70,width:70,padding:1,marginBottom:30}}/>
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
           navigation.navigate("SignIn")      
          }} 
          style={{width:'100%',alignItems:'flex-end',justifyContent:'space-around',padding:10,right:10}}>
               
         <Text style={{color:'#641893',fontSize:22,fontWeight:'400'}}>Close</Text>
         </TouchableOpacity>
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
  },
  textContainer: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#231224',
    padding: 10,
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
  } ,
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
export default SignUp;
