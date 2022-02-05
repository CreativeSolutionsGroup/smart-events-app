import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image, Overlay } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
/*
    Popup for redeeming a user's reward
    Pass in a userReward object with fields
        - reward: the reward object
        - remaining_uses: number of uses left
    Author: Alec Mathisen
*/
const RewardRedeemModal = ({studentId, userReward, open, closeModal}) => {

    return (
        <Overlay isVisible={open} onBackdropPress={() => closeModal()}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {
                    userReward !== null && userReward !== undefined ?
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Image */}
                            {userReward.reward.image_url !== undefined && userReward.reward.image_url !== "" ?
                            <Image
                                source={{ uri: userReward.reward.image_url }}
                                resizeMode={'center'}
                                containerStyle={{
                                    aspectRatio: 1,
                                    width: 100,
                                    objectFit: 'scale-down',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginVertical: 10
                                }}
                                PlaceholderContent={<ActivityIndicator />}
                                placeholderStyle={{
                                    backgroundColor: 'transparent',
                                    aspectRatio: 1,
                                    width: 100,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginVertical: 10
                                }}
                            />
                          : null}

                            {/* Title */}
                            <View
                                style={{
                                    width: 300, 
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        flexWrap: 'wrap',
                                        textAlign: 'center'
                                    }}
                                >
                                    {userReward.reward.name}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                Remaining Uses: {userReward.remaining_uses}
                            </Text>

                            <View
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 10
                                }}
                            >
                                <QRCode
                                    value={JSON.stringify({student_id: studentId, reward_id: userReward.reward._id})}
                                    size={200}
                                    //Option for Logo
                                    //logo={{url: userReward.image_url}}
                                    //logoSize={200*.2}
                                    //logoBackgroundColor='white'
                                />
                            </View>
                        </View>
                    : <Text>Error</Text>
                }
            </View>
        </Overlay>
    );
};

export default RewardRedeemModal;