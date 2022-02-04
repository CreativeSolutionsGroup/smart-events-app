import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Text} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';
import ScreenRewards from './components/screens/ScreenRewards';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [tabIndex, setTabIndex] = useState(0); //Handles which tab the app is currently in

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
          {/* Main Screen with hidden Header */}
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/> 
          {/* Rewards Screen with header enabled */}
          <Stack.Screen name="Rewards" component={RewardsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );

  //@ts-ignore
  function MainScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <TabManager currentTab={tabIndex} navigation={navigation}/>
        <AppNavigationBar setTab={setTabIndex} currentTab={tabIndex}/>
      </View>
    );
  }

  //@ts-ignore
  function RewardsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <ScreenRewards navigation={navigation}/>
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
