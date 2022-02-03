import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';

export default function App() {

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
      <TabManager currentTab={tabIndex} />
      <AppNavigationBar setTab={setTabIndex} currentTab={tabIndex}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //Light Mode
  }
});
