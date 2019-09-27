import React,{useState,useEffect} from 'react';
import colors from '../constants/Colors';
import MapWeb from '../components/MapWeb';
import HeaderBar from '../components/HeaderBar';
import {Image,Button, StyleSheet, TouchableOpacity, Text, View, Alert, ActivityIndicator,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimateNumber from 'react-native-countup';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import Flatlist from '../components/FlastlistProject'
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import axios from 'axios';

import url from './url'
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'ảnh thiên nhiên',
    "_24": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=24&d=mm&r=g",
    "_48": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=48&d=mm&r=g",
    "href": "http://asian.dotplays.com/wp-json/wp/v2/users/1",
  },
  {
    title: 'Ảnh gái xinh',
    "_24": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=24&d=mm&r=g",
    "_48": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=48&d=mm&r=g",
    "href": "http://asian.dotplays.com/wp-json/wp/v2/users/1",
  },
  {
    title: 'Ạnh họa mi hót',
    "_24": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=24&d=mm&r=g",
    "_48": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=48&d=mm&r=g",
    "_96": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=96&d=mm&r=g",
  }, {
    title: 'ảnh cu gáy ',
    "_24": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=24&d=mm&r=g",
    "_48": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=48&d=mm&r=g",
    "_96": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=96&d=mm&r=g",
    "href": "http://asian.dotplays.com/wp-json/wp/v2/comments",
  },{
  title: 'Đại bàng ',
  "_24": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=24&d=mm&r=g",
  "_48": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=48&d=mm&r=g",
  "_96": "http://0.gravatar.com/avatar/320614d3587a32a9dd4207c3b03b44f3?s=96&d=mm&r=g",
  "href": "http://asian.dotplays.com/wp-json/wp/v2/comments",
},
  
];
_renderSectionTitle = section => {
  return (
    <View style={styles.content}>
   
    </View>
  );
};

_renderHeader = section => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );
};

_renderContent = section => {
  return (
    <View style={styles.content}>
      <Text>{section._24}</Text>
      <Text>{section._48}</Text>
      <Text>{section._96}</Text>
      <Text>{section.href}</Text>
    </View>
  );
};


export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  const [load,setLoad] = useState(true);
  const [listproject,setListproject]=useState([])
  const [active,setActive]=useState([])

  _updateSections = activeSections => {
setActive(activeSections)
  };
  

async function getProject(){
  let email = await SecureStore.getItemAsync('email');
  let name = await SecureStore.getItemAsync('name');
  
  const result = await axios(

    'http://asian.dotplays.com/wp-json/wp/v2/comments'
  );


}

async function deleteproject(idproject){
 
  const deleteproject = await axios(
    'https://project-tuan.herokuapp.com/project/deleteproject?id='+idproject,
  ).then(()=>{
    getProject()
  })

  const deletework = await axios(
    'https://project-tuan.herokuapp.com/work/deletework?idproject='+idproject,
  );


}

  useEffect(() => {

  getProject().then(()=>{
    setLoad(false)
  })
  },[]);

  setTimeout(()=>{
    setLoad(false)
  },10000)

  
  return (
  
    <ScrollView style={{flex:1,backgroundColor:'#ccc'}}>
       <Accordion
        sections={SECTIONS}
        activeSections={active}
        renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
  
  
    </ScrollView>
  );
}
HomeScreen.navigationOptions = props=>{

  return{
 
  header:(
    <HeaderBar onPress={()=>{props.navigation.openDrawer()
    }} on={()=>{
       props.navigation.navigate('Addproject')
    }}/>
  ),
  
  
}};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#87FA95',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});











