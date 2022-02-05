import React, { useEffect, useState } from "react";
import { Text, SafeAreaView , View, ScrollView, TouchableOpacity, Alert} from "react-native";
import { Button, Icon, Divider, LinearProgress } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getUserInfo, getUserRewardTier, getMaxRewardTierPoints, getSortedRewardTiers } from "../../utils/util";
import RewardProgressBar from "../rewardprogressbar";
import QRCode from 'react-native-qrcode-svg';

/*
    Account Tab
    This tab shows the user their current reward points and tier and their info 
    Author: Alec Mathisen
*/
const TabAccount = ({navigation}) => {

    const [userInfo, setUserInfo] = useState(null);
    const [tiers, setTiers] = useState([]);
    const [userTier, setUserRewardTier] = useState(null);

    useEffect(() => {
        
        getUserInfo()
        .then((res) => {
            setUserInfo(res);
            loadTierInfo(res);
        })
    }, [])

    function loadTierInfo(userInfo){
        getSortedRewardTiers()
        .then((res) => {
            setTiers(res);
            setUserRewardTier(getUserRewardTier(userInfo.rewardPoints, res));
        })
    }

    return (
        <View style={{flex: 1}}>
            {userInfo !== null && userInfo !== undefined ?
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
                        key={"qr_code"}
                    >
                        {/* ID QR Code */}
                        <View
                            style={{
                                width: 125,
                                height: 125,
                                backgroundColor: 'white',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 'auto',
                                marginBottom: 'auto'
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 'auto',
                                    marginBottom: 'auto'
                                }}
                            >
                                <QRCode
                                    value={JSON.stringify({
                                        name: userInfo.name === undefined ? "Error" : userInfo.name,
                                        student_id: userInfo.student_id === undefined ? "Error" : userInfo.student_id,
                                        phone: userInfo.phone === undefined ? "Error" : userInfo.phone,
                                    })}
                                    size={100}
                                />
                            </View>
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
                        key={"user_tier"}
                    >
                        <Text
                            style={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: userTier === undefined || userTier == null ? 'black' : userTier.color
                            }}
                        >
                            {userTier === undefined || userTier == null ? 'Error' : userTier.name}
                        </Text>
                    </View>

                    
                    {/* Rewards */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        key={"reward_progress"}
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
                            <RewardProgressBar tiers={tiers} userTier={userTier} userRewardPoints={userInfo.rewardPoints}/>
                        </TouchableOpacity>
                    </View>


                    {/* User Info */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        key={"info_box"}
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
                                {userInfo.name}
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
                                {userInfo.student_id}
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
                                {userInfo.phone}
                            </Text>
                        </View>
                    </View>
                    
                </ScrollView>
            : null } 
            {/* TODO Add view for error in grabbing user info */}
        </View>
    );
};

export default TabAccount;