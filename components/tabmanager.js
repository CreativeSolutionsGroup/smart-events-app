import React from "react";
import { View, Dimensions } from "react-native";
import TabHome from "./tabs/TabHome";
import TabEvents from "./tabs/TabEvents";
import TabAccount from "./tabs/TabAccount";


/*
    Component that manages the tab switching display
    Author: Alec Mathisen
*/
const TabManager = ({currentTab, navigation}) => {

return (
    <View
      style={{
        display: 'flex',
        height: Dimensions.get('window').height - 100, //Leaves room between nav bar and tab
        width: '100%',
        //Debug Border Box
        borderColor: 'red',
        borderWidth: 1
      }}
    >
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
                <TabAccount navigation={navigation}/> //Account
            :
            <View />
        }
    </View>
  );
};

export default TabManager;