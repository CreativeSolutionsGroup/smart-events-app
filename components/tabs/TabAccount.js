import React, { useEffect, useState } from "react";
import { Text, SafeAreaView , View, ScrollView, TouchableOpacity, Alert} from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getUserInfo, getUserRewardTier, getMaxRewardTierPoints, getSortedRewardTiers, COLOR_CEDARVILLE_YELLOW } from "../../utils/util";
import RewardTierModal from "../modal/RewardTierModal";
import RewardProgressBar from "../rewardprogressbar";
import QRCode from 'react-native-qrcode-svg';
import EditUserInfoModal from "../modal/EditUserInfoModal";
import UserQRCodeModal from "../modal/UserQRCodeModal";
import { signOut, getAuth } from "firebase/auth";

/*
    Account Tab
    This tab shows the user their current reward points and tier and their info 
    Author: Alec Mathisen
*/
const TabAccount = ({navigation, userInfo, userPhoto}) => {

    //const [userInfo, setUserInfo] = useState(null); //Caches user's info
    const [qrCodeOpen, setQRCodeOpen] = useState(false); // Used for User QR Code Modal
    const [editInfoOpen, setEditInfoOpen] = useState(false); //Used for Edit Info Modal
    const [tiers, setTiers] = useState([]); //Caches the reward tiers
    const [userTier, setUserRewardTier] = useState(null); //Used to update the user's tier displayed
    const [tiersOpen, setTiersOpen] = useState(false); // Used for Tier Information Modal

    useEffect(() => {
        loadTierInfo();
    }, [])

    function manuallyUpdateUserInfo(data){
        this.setUserInfo(data);
    }

    //Downloads a sorted list of reward tiers from largest to least points
    function loadTierInfo(){
        getSortedRewardTiers()
        .then((res) => {
            setTiers(res);
            if(userInfo !=null){  
                setUserRewardTier(getUserRewardTier(userInfo.reward_points, res));
            } else {
                setUserRewardTier(null);            
            }
        })
    }

    function fixPhotoURL(){
        let originalURL = userPhoto;
        let cut = originalURL.slice(0, -4);
        return cut + "500-c";
    }

    return (
        <View style={{flex: 1}}>
            {userInfo !== null && userInfo !== undefined ?
                // Scroll View to support smaller screens
                <ScrollView
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            right: 10,
                            top: 10,
                            width: 50,
                            height: 50
                        }}
                        onPress={() => {
                            let auth = getAuth();
                            auth.signOut().then(function() {
                                navigation.navigate("Login")
                            }, function(error) {
                                alert('Sign Out Error');
                            });
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                width: 50,
                                height: 50,
                            }}
                        >
                            <Icon
                                name='sign-out'
                                type='font-awesome'
                                color={COLOR_CEDARVILLE_BLUE}
                                size={30}
                                containerStyle={{
                                    marginTop: 'auto',
                                    marginBottom: 'auto'
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* QR Code Circle */}
                    <View
                        style={{
                            display: 'flex',
                            width: 200,
                            height: 200,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 20
                        }}
                        key={"qr_code"}
                    >
                        
                        <View
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 200 / 2,
                                backgroundColor: COLOR_CEDARVILLE_BLUE,
                            }}
                        >
                            {/* ID QR Code */}
                            {/* <View
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
                                { 
                                    //White Padding for QR Code standard
                                }
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
                                            uid: userInfo.uid === undefined ? "Error" : userInfo.uid,
                                            name: userInfo.name === undefined ? "Error" : userInfo.name,
                                            student_id: userInfo.student_id === undefined ? "Error" : userInfo.student_id,
                                            phone: userInfo.phone === undefined ? "Error" : userInfo.phone,
                                        })}
                                        size={100}
                                    />
                                </View>
                            </View> */}
                            <Image
                                source={{uri: fixPhotoURL()}}
                                containerStyle={{
                                    aspectRatio: 1,
                                    width: 200,
                                    height: 200,
                                    objectFit: 'scale-down',
                                    borderRadius: 200 / 2,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 'auto',
                                    marginBottom: 'auto'
                                }}
                            />
                        </View>  
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                position: 'relative',
                                left: 0,
                                top: -50,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                zIndex: 1
                            }}
                            onPress={() => setQRCodeOpen(true)}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    backgroundColor: COLOR_CEDARVILLE_BLUE,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50 / 2,
                                    zIndex: 1
                                }}
                            >
                                <Icon
                                    name='qrcode'
                                    type='font-awesome'
                                    color='white'
                                    size={30}
                                    containerStyle={{
                                        marginTop: 'auto',
                                        marginBottom: 'auto'
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>  

                    {/* Name */}
                    <Text
                        style={{
                            marginTop: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 28,
                            fontWeight: 'bold',
                            color: COLOR_CEDARVILLE_BLUE
                        }}
                    >
                        {userInfo.name}
                    </Text>

                    {/* Tier */}
                    <TouchableOpacity
                        onPress={() => setTiersOpen(true)}
                    >
                        <View
                            style={{
                                paddingHorizontal: 8,
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
                    </TouchableOpacity>

                    
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
                            <RewardProgressBar tiers={tiers} userTier={userTier} userRewardPoints={userInfo.reward_points}/>
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
                            <Text
                                style={{
                                    marginTop: 5,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    color: COLOR_CEDARVILLE_BLUE
                                }}
                            >
                                Student ID
                            </Text>
                            <Text
                                style={{
                                    marginTop: 5,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    fontSize: 20,
                                    color: COLOR_CEDARVILLE_BLUE
                                }}
                            >
                                {userInfo.student_id}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 5,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    color: COLOR_CEDARVILLE_BLUE
                                }}
                            >
                                Phone Number
                            </Text>
                            <Text
                                style={{
                                    marginTop: 5,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    fontSize: 20,
                                    color: COLOR_CEDARVILLE_BLUE
                                }}
                            >
                                {userInfo.phone_number}
                            </Text>
                        </View>
                    </View>
                    <Button
                        title="Edit"
                        icon={{
                            name: 'edit',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        titleStyle={{ fontWeight: 'bold', paddingRight: 10 }}
                        buttonStyle={{
                            backgroundColor: COLOR_CEDARVILLE_YELLOW,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 30,
                            paddingHorizontal: 10
                        }}
                        containerStyle={{
                            marginTop: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        onPress={() => setEditInfoOpen(true)}
                    />
                </ScrollView>
            : null } 
            {/* TODO Add view for error in grabbing user info */}
            <RewardTierModal tiers={tiers} open={tiersOpen} closeModal={() => setTiersOpen(false)}/>
            <EditUserInfoModal userInfo={userInfo} manuallyUpdateUserInfo={manuallyUpdateUserInfo} open={editInfoOpen} closeModal={() => setEditInfoOpen(false)}/>
            {userInfo !== null ?
                <UserQRCodeModal uid={userInfo._id} name={userInfo.name} student_id={userInfo.student_id} phone={userInfo.phone} open={qrCodeOpen} closeModal={() => setQRCodeOpen(false)}/>
            : null}
        </View>
    );
};

export default TabAccount;