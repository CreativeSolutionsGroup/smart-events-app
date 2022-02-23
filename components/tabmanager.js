import React from "react";
import { View, Dimensions, Text } from "react-native";
import TabHome from "./tabs/TabHome";
import TabEvents from "./tabs/TabEvents";
import TabAccount from "./tabs/TabAccount";
import TabTickets from "./tabs/TabTickets";


/*
    Component that manages the tab switching display
    Author: Alec Mathisen
*/
const TabManager = ({currentTab, navigation, userInfo, refreshUserInfo, userPhoto}) => {

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
                <TabEvents userInfo={userInfo} refreshUserInfo={refreshUserInfo}/> //Event List
            :
            currentTab === 3 ?
                <TabTickets userInfo={userInfo} refreshUserInfo={refreshUserInfo}/> //Tickets
            :
            currentTab === 4 ?
                <TabAccount navigation={navigation} userInfo={userInfo} userPhoto={userPhoto}/> //Account
            :
            <View />
        }
        <Text>
            {userInfo !=null ? "Valid User" : "Error"}
        </Text>
    </View>
  );
};

export default TabManager;