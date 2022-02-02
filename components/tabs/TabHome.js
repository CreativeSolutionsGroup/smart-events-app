import React from "react";
import { Text, SafeAreaView , View, ScrollView, TouchableOpacity, Alert} from "react-native";
import { COLOR_CEDARVILLE_BLUE, COLOR_CEDARVILLE_YELLOW } from "../../utils/util";

/*
    Home Tab
    This tab lists the current date and check in button as well as what events are happening now and basic user info
    Author: Alec Mathisen
*/
const TabHome = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView 
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Top Info Bar/Check In Button */}
                <View 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: COLOR_CEDARVILLE_BLUE,
                        marginLeft: 5,
                        marginRight: 5,
                        height: 50,
                        borderRadius: 30,
                        marginTop: 20
                    }}
                >
                    {/* Current Date */}
                    <View 
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.25)', //Darker Date Color Area
                            width: '65%',
                            height: '80%',
                            borderRadius: 30,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            marginLeft: 5
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                fontSize: 20,
                                color: 'white'
                            }}
                        >
                          Mon Jan 24, 2022
                        </Text>                      
                    </View>

                    {/* Custom Rounded Button */}
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            backgroundColor: COLOR_CEDARVILLE_YELLOW,
                            width: '30%',
                            height: '80%',
                            borderRadius: 30,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        onPress={() => Alert.alert("checked in")}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}>
                            Check In
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Happening Now */}
                <View 
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        marginLeft: 5,
                        marginRight: 5,
                        height: 300,
                        borderRadius: 5,
                        backgroundColor: COLOR_CEDARVILLE_BLUE
                    }}
                >
                    <Text>Happening Now</Text>
                </View>

                {/* My Info */}
                <View 
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        marginBottom: 20, 
                        marginLeft: 5,
                        marginRight: 5,
                        height: 300,
                        borderRadius: 5,
                        backgroundColor: COLOR_CEDARVILLE_BLUE
                    }}
                >
                    <Text>My Info</Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default TabHome;