import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Overlay } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getSortedRewardTiers} from "../../utils/util";

/*
    Popup for infomation on the different reward tiers
    Author: Alec Mathisen
*/
const RewardTierModal = ({open, closeModal}) => {

    return (
        <Overlay isVisible={open} onBackdropPress={() => closeModal()}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <View
                    style={{
                        marginBottom: 10
                    }}
                >
                    <Text
                        style={{
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
                        getSortedRewardTiers().map((tier) => {
                            return (
                                <Card
                                    containerStyle={{
                                        borderColor: COLOR_CEDARVILLE_BLUE,
                                        width: 300
                                    }}
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
                                                    marginRight: 'auto'
                                                }}
                                            >
                                                {tier.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: tier.color,
                                                    fontWeight: 'bold',
                                                    marginLeft: 'auto',
                                                    marginRight: 5
                                                }}
                                            >
                                                {tier.min_points}
                                            </Text>
                                        </View>
                                        <Text>
                                            {tier.description}
                                        </Text>
                                    </View>
                                </Card>
                            )
                        })
                    }
                </View>
            </View>
        </Overlay>
    );
};

export default RewardTierModal;