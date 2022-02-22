import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Alert} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';
import ScreenRewards from './components/screens/ScreenRewards';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Notifications from "expo-notifications";
import {AndroidNotificationPriority} from "expo-notifications";


import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { Image, Button } from 'react-native-elements';

//Used to mute warnings of timers when perfomring Firestore Database Calls
import { LogBox } from 'react-native';
import { getUserServerID, getUserInfoFromServer, askNotificationPermissions, sendLocalNotification, setUpBackgroundLocation, updateUserInfo, registerForPushNotificationsAsync } from './utils/util';
import ScreenSignUp from './components/screens/ScreenSignUp';

LogBox.ignoreLogs([
  'Setting a timer for a long period of time', 
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'Constants.platform.ios.model has been deprecated in favor of expo-device\'s Device.modelName property.'
])

initializeApp({
  apiKey: "AIzaSyDZaIyAQVto1etrtQoTY2WvQ_6f5U6Y8Zs",
  authDomain: "smart-events-app.firebaseapp.com",
  projectId: "smart-events-app",
  storageBucket: "smart-events-app.appspot.com",
  messagingSenderId: "228611096862",
  appId: "1:228611096862:web:fcba76527948813d4b890f",
  measurementId: "G-JFXT7TH4DQ"
});

WebBrowser.maybeCompleteAuthSession();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
    priority: AndroidNotificationPriority.HIGH
  }),
});

export default function App() {

  const Stack = createNativeStackNavigator();

  const [tabIndex, setTabIndex] = useState(0); //Handles which tab the app is currently in
  const [checkLocation, setCheckLocation] = useState(true);
  const [userPhoto, setUserPhoto] = useState<String| null>("");

  const [userIdToken, setUserIdToken] = useState<String | null>("");
  const [userServerID, setUserServerID] = useState<String | null>("");
  const [userInfo, setUserInfo] = useState<Object | null>(null);

  function refreshUserInfo(){
    if(userServerID === null || userIdToken === null){
      return;
    }
    loadUserInfo(userServerID, userIdToken)
  }

  async function loadUserInfo(id : String, authToken : String){
    const serverUserInfo = await getUserInfoFromServer(id, authToken)
    setUserInfo(serverUserInfo);
  }

  return (
    // Creates the correct amount of space to fit the app below iOS camera bumps
    <SafeAreaView style={styles.container}>
      {/* Status Bar Buffer for Android Camera bumps*/}
      <View style={{ height: StatusBar.currentHeight, backgroundColor: 'white' }}>
        <StatusBar
          translucent
          backgroundColor={'white'}
          barStyle='dark-content'
        />
      </View>

      {/* App Content */}
      <NavigationContainer>
        <Stack.Navigator>
          {/* Login Screen with hidden Header */}
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/> 
          {/* Main Screen with hidden Header */}
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/> 
          {/* Rewards Screen with header enabled */}
          <Stack.Screen name="Rewards" component={RewardsScreen} />
          {/* Sign Up Screen with header enabled */}
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerTitle: "Sign Up"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );

  //@ts-ignore
  async function userCreatedNewAccount(navigation, authToken, data){
      let userID = data._id;
      setUserServerID(userID)
      setUserInfo(data);          
      navigation.navigate("Main");
  }

  //@ts-ignore
  function LoginScreen({ navigation }) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
          expoClientId: '228611096862-6oqajueu9sont2pf10ideupsfpi0j9k2.apps.googleusercontent.com',
          androidClientId: '228611096862-mmlctank26g48ao05fbaghmgu8v1cqn7.apps.googleusercontent.com'
      },
    );

    useEffect(() => {
      const auth = getAuth();
      var user = auth.currentUser;
      if (user) {
        //navigation.navigate("Main");
      } else {
        
      }
    }, [])
    
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { id_token, user } = response.params;
        
        setUserIdToken(id_token);
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
        .then(async (res) => {
            let user = res.user;
            if(user !== null){

              let domain = user.email?.split("@")[1];
              if(domain !== "cedarville.edu"){
                Alert.alert("Must sign in with a Cedarville Account");
                auth.signOut();
                return;
              }

              
              let data = user.providerData[0];
              setUserPhoto(data.photoURL);
              let userServerID = await getUserServerID()
              if(userServerID === null){
                
                let userInfo = {email: user.email, name: user.displayName, phoneNumber: user.phoneNumber}
                navigation.navigate("SignUp", {user: userInfo});
              } else {
                
                setUserServerID(userServerID)
                await loadUserInfo(userServerID, id_token)
                navigation.navigate("Main");
              }
            }
        })
      } 
    }, [response]);

    return (
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Image
            source={require('./smart-events-logo.png')}
            resizeMode={'center'}
            containerStyle={{
              aspectRatio: 1,
              width: 300,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '25%'
          }}
          />
          <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
            containerStyle={{
              marginHorizontal: 30
            }}
          />
        </View>
      </View>
    );
  }

  //@ts-ignore
  function MainScreen({ navigation }) {

    //@ts-ignore
    useEffect(async () => {
      //Ask user for notification permissions upon startup of main screen
      registerForPushNotificationsAsync();
      setUpBackgroundLocation();
    }, [])

    return (
      <View style={styles.container}>
        <TabManager currentTab={tabIndex} navigation={navigation} userInfo={userInfo} refreshUserInfo={refreshUserInfo} userPhoto={userPhoto} checkLocation={checkLocation} setCheckLocation={setCheckLocation}/>
        <AppNavigationBar setTab={setTabIndex} currentTab={tabIndex}/>
      </View>
    );
  }

  //@ts-ignore
  function RewardsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <ScreenRewards navigation={navigation} userInfo={userInfo} refreshUserInfo={() => {
          if(userServerID === null || userIdToken === null){
            return;
          }
          loadUserInfo(userServerID, userIdToken)
        }}/>
      </View>
    );
  }
  //@ts-ignore
  function SignUpScreen({ route, navigation }) {
    const { user } = route.params;
    return (
      <View style={styles.container}>
        <ScreenSignUp navigation={navigation} user={user} updateInfo={userCreatedNewAccount}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //Light Mode
  }
});
