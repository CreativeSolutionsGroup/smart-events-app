import React from "react";
import { View, Text } from "react-native";
import { LinearProgress } from "react-native-elements";
import { getUserRewardTier, getUserInfo, getSortedRewardTiers, getMaxRewardTierPoints } from "../utils/util";

/*
    Progress Bar to show user's reward tier progress
    Author: Alec Mathisen
*/
const RewardProgressBar = ({}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: "column"
      }}
    >
         <Text
            style={{
                marginTop: 5,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 30,
                fontWeight: 'bold',
                color: getUserRewardTier().color
            }}
        >
            {getUserInfo().rewardPoints}
        </Text>

        {/* Badge Icons */}
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                height: 15,
                width: 300,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
                //Debug Box
                //borderWidth: 1,
                //borderRightColor: 'red'
            }}
        >
            {
                getSortedRewardTiers().map((tier) => {
                    let pos = (tier.min_points / getMaxRewardTierPoints()) * 300
                    return(
                        <View
                            style={{
                                backgroundColor: tier.color,
                                width: 15,
                                height: 15,
                                borderRadius: 7.5,
                                position: 'absolute',
                                left: pos-7.5
                            }}
                        >
                        </View>    
                    );
                })
            }
        </View>
        <LinearProgress 
            style={{ 
                width: 300,
                marginVertical: 10,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
            value={getUserInfo().rewardPoints / getMaxRewardTierPoints()}
            color={getUserRewardTier().color}
            variant="determinate"
        />
    </View>
  );
};

export default RewardProgressBar;