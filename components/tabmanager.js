import React from "react";
import { View, StatusBar, Dimensions } from "react-native";
import TabHome from "./tabs/TabHome";
import TabEvents from "./tabs/TabEvents";
import TabAccount from "./tabs/TabAccount";


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

/*
    Component that manages the tab switching display
    Author: Alec Mathisen
*/
const TabManager = ({currentTab}) => {
  return (
    <View
      style={{
        display: 'flex',
        top: STATUS_BAR_HEIGHT, //Sets top to the bottom of the status bar
        height: Dimensions.get('window').height - 100, //Leaves room between nav bar and tab
        width: '100%',
        //Debug Border Box
        borderColor: 'red',
        borderWidth: 1
      }}
    >
        {/* <DarkModeText>Current Tab: {currentTab}</DarkModeText> */}
        {
            currentTab === 0 ?
                <TabHome /> //Home
            : 
            currentTab === 1 ?
                <View /> //Calendar
            :
            currentTab === 2 ?
                <TabEvents /> //Event List
            :
            currentTab === 3 ?
                <View /> //Tickets
            :
            currentTab === 4 ?
                <TabAccount /> //Account
            :
            <View />
        }
    </View>
  );
};

export default TabManager;