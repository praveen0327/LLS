import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,FlatList
} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {Slider} from '@miblanchard/react-native-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageButton from '../Components/ImageButton';
import axios from 'axios';
import { ProductContext } from './ProductList';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
const Filter = ({drawer}) => {
  
  const [color,setColor] = React.useState([])
  const [size,setSize] = React.useState([])
  const [design,setDesign] = React.useState([])
  const isFocused = useIsFocused();
  const [checked, setChecked] = React.useState('');
  const [checkedSize, setCheckedSize] = React.useState('');
  const [checkedDesign, setCheckedDesign] = React.useState('');
  const [price,setPrice] = React.useState([0.0,10000.0])
  const {Filter} = React.useContext(ProductContext);

  React.useEffect(()=>{
    getColor()
    getSize()
    getDesigner()
  },[isFocused])

  const getColor = (proID,quan) =>{

    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/products/attributes/3/terms?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
  
         console.log('ress',res.data)
         setColor(res.data)

         }).catch((er)=>{
          console.log(er)
        
        })
  }

  const getSize = (proID,quan) =>{

    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/products/attributes/2/terms?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
  
         console.log('ress',res.data)
         setSize(res.data)

         }).catch((er)=>{
          console.log(er)
        
        })
  }

  const getDesigner = (proID,quan) =>{

    axios.get(`https://codeandcode.xyz/demo/ladies-love-shopping/wp-json/wc/v3/products/attributes/1/terms?context=view&consumer_key=ck_972d8a72e4f1a6f98c02c8e9d24fc8d82890aac5&consumer_secret=cs_28e5e51a7fda692dd2e762fe909a23ee1a1a9ddc`)
    .then((res) => {
  
         console.log('ress',res.data)
         setDesign(res.data)

         }).catch((er)=>{
          console.log(er)
        
        })
  }


   const renderColor=(data,index)=>{
    return(
      <View  style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton
      value={data.slug}
      uncheckedColor='#D1B19F'
      color='#D1B19F'
      status={checked === data.slug ? 'checked' : 'unchecked'}
      onPress={() => setChecked(data.slug)}
    />
    <Text style={{fontFamily: 'FuturaPTLight',color:'#000',fontSize:16}}>{data.name}</Text>
    </View>
    )
   }

   const renderSize=(data,index)=>{
    return(
      <View  style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton
      value={data.slug}
     uncheckedColor='#D1B19F'
     color='#D1B19F'
      status={checkedSize === data.slug ? 'checked' : 'unchecked'}
      onPress={() => setCheckedSize(data.slug)}
    />
    <Text style={{ fontFamily: 'FuturaPTLight',color:'#000',fontSize:16}}>{data.name}</Text>
    </View>
    )
   }

   const renderDesigner=(data,index)=>{
  
    return(
      <View  style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton
      value={data.slug}
     uncheckedColor='#D1B19F'
     color='#D1B19F'
      status={checkedDesign === data.slug? 'checked' : 'unchecked'}
      onPress={() => setCheckedDesign(data.slug)}
    />
    <Text style={{ fontFamily: 'FuturaPTLight',color:'#000',fontSize:16}}>{data.name}</Text>
    </View>
    )
   }





  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View>
            <Text
              style={{
                color: '#231224',
                fontFamily: 'FuturaPTBold',
                fontSize: 22,
              }}>
              Filter
            </Text>
          </View>
          <View>
            <Icon
              name="close"
              onPress={() => drawer.closeDrawer()}
              size={20}
              color="#231224"
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,

            padding: 10,
            borderBottomColor: '#c39f95',
          }}>
          <Text style={{color: '#231224', fontSize: 20}}>Price</Text>
          <Slider
            value={price}
            trackStyle={{color: '#c39f95'}}
            thumbTintColor="#c39f95"
            minimumTrackTintColor="#c39f95"
            maximumTrackTintColor="#c39f95"
            minimumValue={0.0}
            maximumValue={10000.0}
            onValueChange={value => setPrice(value)}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width:'100%'
            }}>
            <Text
              style={{
                color: '#231224',
                fontSize: 20,
              }}>
              AED {price[0] !== 0.0?
              String(price[0]).substr(0, String(price[0]).indexOf('.')):0.0}
            </Text>
            <Text
              style={{
                color: '#231224',
                fontSize: 20,
              }}>
              AED {price[1] !== 10000.0?
              String(price[1]).substr(0, String(price[1]).indexOf('.')):10000.0}
            </Text>
          </View>
        
        </View>
        <View
          style={{
            padding: 10,
            borderBottomColor: '#c39f95',
          }}>
          <Text style={{color: '#231224', fontSize: 20}}>Size</Text>
          <View>
          <FlatList   
       data={size}
       keyExtractor={item => item.id+Math.random()} 
       renderItem={({ item,index }) => renderSize(item)}
     /> 
          
          </View>
        
        </View>
        <View
          style={{
            padding: 10,
            borderBottomColor: '#c39f95',
          }}>
          <Text style={{color: '#231224', fontSize: 18}}>Color</Text>
          <View>
          <FlatList   
       data={color}
       keyExtractor={item => item.id+Math.random()} 
       renderItem={({ item,index }) => renderColor(item)}
     /> 
          
          </View>
        </View>

        <View
          style={{
            padding: 10,
            borderBottomColor: '#c39f95',
          }}>
          <Text style={{color: '#231224', fontSize: 18}}>Designers</Text>
          <View>
          <FlatList   
       data={design}
       keyExtractor={item => item.id+Math.random()} 
       renderItem={({ item,index }) => renderDesigner(item)}
     /> 
          
          </View>

       
        </View>

       
      </ScrollView>
      <View>
      <View
            style={{
              marginTop: 10,
              textAlign: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom:10
            }}>
            <View
              style={{
                flex: 0.49,
              }}>
              <ImageButton 
              onPress={()=>{
               setChecked('')
               setCheckedSize('')
               setCheckedDesign('')
               setPrice([0.0,10000.0])
              }}
               title="RESET" />
            </View>
            <View
              style={{
                flex: 0.49,
              }}>
              <ImageButton onPress={()=>{drawer.closeDrawer()
              Filter({count:'res.data.item_count'})
              }} title="APPLY" />
            </View>
          </View>
      </View>

    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',flex:1
  },
});
