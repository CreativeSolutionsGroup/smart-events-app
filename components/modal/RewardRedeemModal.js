import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { Image, Overlay, Button} from "react-native-elements";
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
        <Overlay 
            isVisible={open} onBackdropPress={() => closeModal()}
            overlayStyle={{
                maxHeight: '60%',
            }}
        >
            <View>
                <Button
                    containerStyle={{
                        
                        position: 'absolute',
                        right: 5,
                        top: 5,
                        zIndex: 1000,
                        width: 50,
                        height: 50
                    }}
                    buttonStyle={{
                        backgroundColor: 'transparent'
                    }}
                    icon={{
                        name: 'close',
                        type: 'font-awesome',
                        size: 20,
                        color: 'black',
                    }}
                    onPress={() => closeModal()}
                />
                {
                    userReward !== null && userReward !== undefined ?
                        <View
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                        >
                            <ScrollView>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column'
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
                                            value={JSON.stringify({reward_id: userReward.reward._id})}
                                            size={200}
                                            //Option for Logo
                                            //logo={{url: userReward.image_url}}
                                            //logoSize={200*.2}
                                            //logoBackgroundColor='white'
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    : <Text>Error</Text>
                }
            </View>
        </Overlay>
    );
};

export default RewardRedeemModal;