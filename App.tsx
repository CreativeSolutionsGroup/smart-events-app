import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';

export default function App() {
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const [tabIndex, setTabIndex] = useState(0); //Handles which tab the app is currently in
  const statusBarColor = Platform.OS === 'ios' ? 'black' : 'transparent';
  return (
    <View style={styles.container}>
      {/* Status Bar Buffer */}
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: statusBarColor}}/> 

      {/* App Content */}
      <TabManager currentTab={tabIndex} />
      <AppNavigationBar setTab={setTabIndex} currentTab={tabIndex}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //Light Mode
  }
});
