import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View,Alert, TextInput,SafeAreaView, Platform,Button ,Image,TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import *as firebase from 'firebase'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { initnotify, getToken, notify ,newChannel } from 'expo-push-notification-helper';
import QueryString from 'qs';

export default function Login(props) {
const [username,setUserName]=useState('zzz@gmail.com')
const [password,setPassWord]=useState('ass')
const [load,setLoad] = useState(false);  
// APi firebase
     async function  _save  () {
  
          props.navigation.navigate('Main')
    
       
      };
      async function  getUser() {

                const postData =QueryString.stringify( {                                
                  email:username,
            
                   });      
                   let axiosConfig = {
                    headers: {
                      'Content-Type' : 'application/json; charset=UTF-8',
                      'Accept': 'Token',
                      "Access-Control-Allow-Origin": "*",
                    }
                  };
                  
                  axios({
                        method: 'post',
                        url: 'https://tuan-nodejs.herokuapp.com/users/dangnhap',
                        headers: axiosConfig,
                        data: postData
                    })
                    .then((res) => {
                    //  console.log(res.data)
                     _save()
                    }).catch(err=>{
                      console.log(err)
                    })

      }
   async function login() {
      getUser()   }

    return (
<SafeAreaView style={styles.layout}>

         < KeyboardAvoidingView behavior='padding' style={styles.layout}>
         <Spinner visible={load}
                   color='blue'>                  
                   </Spinner>
            <View style={styles.layout}>
             
              
         
        
      
                  {/*nhap du lieu dang nhap*/}
              <View style={styles.textinput}>
                <TextInput style={styles.text} value={username} onChangeText={(user) => setUserName(user.toLocaleLowerCase())} placeholder='Email'></TextInput>
                <TextInput style={styles.text}  value={password}	secureTextEntry={true} onChangeText={(password) => setPassWord( password )} placeholder='Mật khẩu'></TextInput>
          
              </View>
             
              {/*dang nhap*/}
              <Text style={{ backgroundColor: '#058CDB',color:'#fff', width: 200, height: 40, textAlign: 'center', borderRadius:10, paddingTop: 10,marginTop:30, }}
                onPress={()=>
                  _save()
                }>Đăng nhập</Text>
      
              <View style={styles.chuacotk}>
                <Text style={{color:'#ffff'}}>Chưa có tài khoản ?</Text>
      
                {/*chuyển đăng kí*/}
                <Text style={styles.dk} onPress={() => navigate('Dangki')} >Đăng kí</Text>
              </View>
      
            </View>
           </KeyboardAvoidingView>
      
            </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center'
  
  
    },
    text: {
      marginTop:20,
      paddingLeft: 10,
      borderRadius: 10,
      backgroundColor: '#ffff',
      height: 40,
      margin: 7,
      width: 300,
    },
  
    chuacotk: {
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 5,
    },
    dk: {
      marginLeft: 10,
      color: 'blue'
  
    },
    textinput: {
    marginTop:Platform.OS==='ios'?130:80,
   
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  
  
  });