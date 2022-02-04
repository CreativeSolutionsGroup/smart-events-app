import React from "react";
import { Text, SafeAreaView , View, ScrollView, TouchableOpacity, Alert} from "react-native";
import { Button, Icon, Divider, LinearProgress } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getUserInfo, getUserRewardTier, getMaxRewardTierPoints, getSortedRewardTiers } from "../../utils/util";
import RewardProgressBar from "../rewardprogressbar";

/*
    Account Tab
    This tab shows the user their current reward points and tier and their info 
    Author: Alec Mathisen
*/
const TabAccount = ({navigation}) => {

    return (
        <View style={{flex: 1}}>
            <ScrollView
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                
                {/* QR Code Circle */}
                <View
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 200 / 2,
                        backgroundColor: COLOR_CEDARVILLE_BLUE,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 20
                    }}
                >
                    {/* ID QR Code */}
                    <View
                        style={{
                            width: 125,
                            height: 125,
                            backgroundColor: 'black',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}
                    >
                    </View>
                </View>    

                {/* Tier */}
                <View
                    style={{
                        width: 100,
                        height: 30,
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        backgroundColor: COLOR_CEDARVILLE_BLUE,
                        borderRadius: 10
                    }}
                >
                    <Text
                        style={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: getUserRewardTier().color
                        }}
                    >
                        {getUserRewardTier().name}
                    </Text>
                </View>

                
                {/* Rewards */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLOR_CEDARVILLE_BLUE
                        }}
                    >
                        Reward Points
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Rewards")
                        }}
                    >
                        <RewardProgressBar />
                    </TouchableOpacity>
                </View>


                {/* User Info */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Title and Settings Button */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 5
                        }}
                    >
                        {/* Filler View to allow centering of text */}
                        <View 
                            style={{
                                width: 40
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 'auto',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginBottom: 'auto',
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            Your Information
                        </Text>
                        {/* TODO: Add Edit Modal for user Info */}
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                backgroundColor: 'transparent',
                                borderRadius: 20,
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}
                        >
                            <Icon name='edit' type='font-awesome5' size={25} color={COLOR_CEDARVILLE_BLUE} />
                        </TouchableOpacity>
                    </View>

                    {/* Info */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 20,
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            Name:
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 50,
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            {getUserInfo().name}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 20,
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            Student ID:
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 50,
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            {getUserInfo().student_id}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 20,
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            Phone Number:
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 50,
                                marginRight: 'auto',
                                marginBottom: 20,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLOR_CEDARVILLE_BLUE
                            }}
                        >
                            {getUserInfo().phone}
                        </Text>
                    </View>
                </View>
                
            </ScrollView>
        </View>
    );
};

export default TabAccount;