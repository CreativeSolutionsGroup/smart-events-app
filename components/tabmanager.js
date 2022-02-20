import React, {useRef, useEffect, useState} from "react";
import { View, Dimensions, Text, Animated, TouchableHighlight, TouchableOpacity } from "react-native";
import TabHome from "./tabs/TabHome";
import TabEvents from "./tabs/TabEvents";
import TabAccount from "./tabs/TabAccount";
import TabLocationTest from "./tabs/TabLocationTest";
import { Button, Icon } from "react-native-elements";
import { COLOR_CEDARVILLE_YELLOW } from "../utils/util";


/*
    Component that manages the tab switching display
    Author: Alec Mathisen
*/
const TabManager = ({currentTab, navigation, userInfo, refreshUserInfo, userPhoto, checkLocation, setCheckLocation}) => {

    

    const checkInAnimation = useRef(new Animated.Value(-100)).current
    const [checkInVisible, setCheckInVisible] = useState(false);
    const [checkInMainName, setCheckInMainName] = useState("");
    const [checkInSubName, setCheckInSubName] = useState("");

    useEffect(() => {
        if(checkLocation){
            console.log("Checking Location")
            startPopup();
            setCheckLocation(false); 
        }
    }, [])

    function startPopup(){
        // setCheckInVisible(true);
        // setCheckInMainName("Test");
        // Animated.timing(
        //     checkInAnimation,
        //     {
        //         toValue: 0,
        //         duration: 1000,
        //         useNativeDriver: false
        //     }
        // ).start();
    }

return (    
    <View
        style={{flex: 1}}
    >
        {checkInVisible ? 
            <Animated.View 
                style={{
                    display: 'flex',
                    positon: 'absolute',
                    zIndex: 100,
                    left: 0, right: 0, top: checkInAnimation,
                    height: 100
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 5,
                        margin: 5,
                        height: 80
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: 'black',
                                marginLeft: 10
                            }}
                        >
                            {checkInMainName}
                        </Text>
                        {checkInSubName !== "" ?
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                    marginLeft: 10
                                }}
                            >
                                {checkInSubName}
                            </Text>
                        : null}
                    </View>
                    {/* Check in button */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: 'auto',
                            marginRight: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}
                    >
                        <Button
                            title="Check In"
                            titleStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            buttonStyle={{
                                backgroundColor: 'green',
                                borderRadius: 3
                            }}
                            containerStyle={{
                                width: 100
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}
                            onPress={() => setCheckInVisible(false)}
                        >
                            <Icon name="close"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        : null}
        <View
            style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
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
                    <TabLocationTest /> //Calendar
                :
                currentTab === 2 ?
                    <TabEvents userInfo={userInfo} refreshUserInfo={refreshUserInfo}/> //Event List
                :
                currentTab === 3 ?
                    <View /> //Tickets
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
    </View>
  );
};

export default TabManager;