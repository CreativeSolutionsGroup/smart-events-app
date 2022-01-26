import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AppNavigationBar from './components/navbar';
import TabManager from './components/tabmanager';

export default function App() {

  const theme = useColorScheme(); //Current Device Theme
  const [tabIndex, setTabIndex] = useState(0); //Handles which tab the app is currently in

  return (
    <View style={theme === 'dark' ? styles.container_dark : styles.container}>
      <TabManager currentTab={tabIndex} />
      <AppNavigationBar setTab={setTabIndex} currentTab={tabIndex}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //Light Mode
  },
  container_dark: {
    flex: 1,
    backgroundColor: '#000', //Dark Mode
  }
});
