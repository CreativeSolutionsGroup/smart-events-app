import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Overlay, Button } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getRewardById} from "../../utils/util";

/*
    Popup for infomation on the different reward tiers
    Author: Alec Mathisen
*/
const RewardTierModal = ({tiers, open, closeModal}) => {

    const [tierRewards, setTierRewards] = useState({});

    useEffect(() => {
        if(tiers !== undefined){
            tiers.forEach(async (tier) => {
                let reward_ids = tier.rewards;
                if(reward_ids.length > 0){
                    let rewards = await Promise.all(reward_ids.map(async (tierReward) => {
                        let reward = await getRewardById(tierReward); //Async grab of the rewards information
                        return reward;
                    }));
                    let newTierRewards = tierRewards;
                    newTierRewards[tier._id] = rewards;
                    console.log(rewards)
                    setTierRewards(newTierRewards);
                }
            })
        } else {
            setTierRewards({})
        }
    }, [tiers])

    function buildStringList(list){
        let listOfNames = list.map((element) => {
            return element.name
        });
        return listOfNames.join(', ');
    }

    return (
        <Overlay isVisible={open} onBackdropPress={() => closeModal()}
            overlayStyle={{
                flex: 1,
                display: 'flex',
                maxHeight: '70%',
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
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            marginTop: 20,
                            color: COLOR_CEDARVILLE_BLUE,
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        Reward Tiers
                    </Text>
                    {/* Reward Tier Cards */}
                    {
                        tiers !== undefined && tiers !== null ?
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                            {
                                <ScrollView>
                                {
                                    tiers.map((tier) => {
                                        return (
                                            <Card
                                                containerStyle={{
                                                    borderColor: 'black',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    width: 300
                                                }}
                                                key={"tier_" + tier.name}
                                            >
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: tier.color,
                                                                fontSize: 18,
                                                                fontWeight: 'bold',
                                                                marginLeft: 5,
                                                                marginRight: 'auto',
                                                                marginTop: 'auto',
                                                                marginBottom: 'auto'
                                                            }}
                                                        >
                                                            {tier.name}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: tier.color,
                                                                fontWeight: 'bold',
                                                                marginLeft: 'auto',
                                                                marginRight: 5,
                                                                marginTop: 'auto',
                                                                marginBottom: 'auto'
                                                            }}
                                                        >
                                                            {tier.min_points}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            marginTop: 5
                                                        }}
                                                    >
                                                        {tier.description}
                                                    </Text>
                                                    {/* List of Rewards for the tier */}
                                                    {tierRewards[tier._id] !== null && tierRewards[tier._id] !== undefined ?
                                                        <View
                                                            style={{
                                                                marginTop: 5
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontWeight: 'bold'
                                                                }}
                                                            >
                                                                Rewards  
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    marginLeft: 10
                                                                }}
                                                            >
                                                                {buildStringList(tierRewards[tier._id])}  
                                                            </Text>
                                                        </View>
                                                    : null}
                                                </View>
                                            </Card>
                                        )
                                    })
                                }
                                </ScrollView>
                            }
                            </View>
                        : null
                    }
                </View>
            </View>
        </Overlay>
    );
};

export default RewardTierModal;