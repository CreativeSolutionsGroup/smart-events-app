import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';

export default function App() {

  const [tabIndex, setTabIndex] = useState(0); //Handles which tab the app is currently in

  return (
    <View style={styles.container}>
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
