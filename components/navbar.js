import React from "react";
import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLOR_CEDARVILLE_BLUE, COLOR_CEDARVILLE_YELLOW } from "../utils/util";

/*
    Navigation Bar that allows the user to switch tabs
    Author: Alec Mathisen
*/
const AppNavigationBar = ({setTab, currentTab}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: "row",
        height: 80,
        position: 'absolute', left: 0, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'
      }}
    >
         <View 
            style={{ 
                display: 'flex',
                flexDirection: "row",
                alignSelf: 'center', padding: 12, backgroundColor: COLOR_CEDARVILLE_BLUE,
                borderRadius: 25
            }} 
        >
            {/* Home Button */}
            <View
                style={{marginLeft: 5, marginRight: 5}}
            >
                <FontAwesome.Button 
                    name="home" 
                    borderRadius={0}
                    backgroundColor={'transparent'}
                    size={30}
                    iconStyle={{marginRight: 0}}
                    color={currentTab === 0 ? COLOR_CEDARVILLE_YELLOW : 'white'}
                    onPress={() => setTab(0)}
                >
                </FontAwesome.Button>
            </View>

            {/* Calendar Button */}
            <View
                style={{marginLeft: 5, marginRight: 5}}
            >
                <FontAwesome.Button 
                    name="calendar" 
                    borderRadius={0}
                    backgroundColor={'transparent'}
                    size={30}
                    iconStyle={{marginRight: 0}}
                    color={currentTab === 1 ? COLOR_CEDARVILLE_YELLOW : 'white'}
                    onPress={() => setTab(1)}
                >
                </FontAwesome.Button>
            </View>

            {/* List Events Button */}
            <View
                style={{marginLeft: 5, marginRight: 5}}
            >
                <FontAwesome.Button 
                    name="list" 
                    borderRadius={25}
                    size={30}
                    backgroundColor={COLOR_CEDARVILLE_YELLOW}
                    iconStyle={{marginRight: 0, marginTop: 2}}
                    color={currentTab === 2 ? 'black' : 'white'}
                    onPress={() => setTab(2)}
                >
                </FontAwesome.Button>
            </View>

            {/* Tickets Button */}
            <View
                style={{marginLeft: 5, marginRight: 5}}
            >
                <FontAwesome.Button 
                    name="ticket" 
                    borderRadius={0}
                    size={30}
                    backgroundColor={'transparent'}
                    iconStyle={{marginRight: 0}}
                    color={currentTab === 3 ? COLOR_CEDARVILLE_YELLOW : 'white'}
                    onPress={() => setTab(3)}
                >
                </FontAwesome.Button>
            </View>

            {/* Account Button */}
            <View
                style={{marginLeft: 5, marginRight: 5}}
            >
                <FontAwesome.Button 
                    name="user" 
                    size={30}
                    backgroundColor={'transparent'}
                    iconStyle={{marginRight: 0}}
                    color={currentTab === 4 ? COLOR_CEDARVILLE_YELLOW : 'white'}
                    onPress={() => setTab(4)}
                >
                </FontAwesome.Button>
            </View>
        </View>
    </View>
  );
};

export default AppNavigationBar;