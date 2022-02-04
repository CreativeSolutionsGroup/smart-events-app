import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image, Overlay } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import { COLOR_CEDARVILLE_BLUE, getSortedRewardTiers, getUserInfo, getUserReward, getUserRewards} from "../../utils/util";

/*
    Popup for redeeming a user's reward
    Author: Alec Mathisen
*/
const RewardRedeemModal = ({id, open, closeModal}) => {

    const [userReward, setUserReward] = useState(null);

    useEffect(() => {
        if(id === null || id === undefined || id === ''){
            setUserReward(null);
        }
        else {
            setUserReward(getUserReward(id));
        }
    }, [id])

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
                            {userReward.image_url !== undefined && userReward.image_url !== "" ?
                            <Image
                                source={{ uri: userReward.image_url }}
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
                                    {userReward.name}
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
                                    value={JSON.stringify({student_id: getUserInfo().student_id, reward_id: id})}
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