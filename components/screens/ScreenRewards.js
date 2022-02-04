import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Image } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getUserRewardTier, getUserRewards, COLOR_CEDARVILLE_YELLOW } from "../../utils/util";
import RewardTierModal from "../modal/RewardTierModal";
import RewardRedeemModal from "../modal/RewardRedeemModal";
import RewardProgressBar from "../rewardprogressbar";
import { Divider } from "react-native-elements/dist/divider/Divider";

/*
    Screen for the user to view their rewards and more details on the reward tiers
    Author: Alec Mathisen
*/
const ScreenRewards = ({navigation}) => {

  const [tiersOpen, setTiersOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState('');

  const [userTier, setUserRewardTier] = useState(null);
  const [userRewards, setUserRewards] = useState(null);

  useEffect(() => {
    setUserRewardTier(getUserRewardTier());

    let rewards = getUserRewards();
    if(rewards !== undefined){
      rewards = rewards.reverse();
    }
    setUserRewards(rewards);
  }, [])

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
          {/* Tier */}
          <TouchableOpacity
            onPress={() => setTiersOpen(true)}
          >
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
                {userTier !== null ? 
                  <Text
                      style={{
                          marginTop: 'auto',
                          marginBottom: 'auto',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: userTier.color
                      }}
                  >
                      {userTier.name}
                  </Text>
                : null}
            </View>
          </TouchableOpacity>

          {/* Progress Bar */}
          <View
            style={{
              marginVertical: 10
            }}
          >
            <RewardProgressBar />
          </View>

          {/* Reward List */}
          <View>
            <Text
              style={{
                color: COLOR_CEDARVILLE_BLUE,
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Your Rewards
            </Text>
            <ScrollView
              style={{
                height: '75%'
              }}
              contentContainerStyle={{
                paddingBottom: 20
              }}
            >
              {
                userRewards !== null ? 
                  userRewards.map((reward) => {

                    if(reward.remaining_uses === 0)return null;

                    return (
                      <TouchableOpacity
                        onPress={() => setRewardOpen(reward.id)}
                      >
                        <Card
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          containerStyle={{
                            borderRadius: 10
                          }}
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row'
                            }}
                          >
                            {reward.image_url !== undefined && reward.image_url !== "" ?
                              <Image
                                  source={{ uri: reward.image_url }}
                                  resizeMode={'center'}
                                  containerStyle={{
                                      aspectRatio: 1,
                                      width: 100,
                                      objectFit: 'scale-down',
                                  }}
                                  PlaceholderContent={<ActivityIndicator />}
                                  placeholderStyle={{
                                      backgroundColor: 'transparent',
                                      aspectRatio: 1,
                                      width: 100,
                                  }}
                              />
                            : null}

                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                marginLeft: 10,
                                width: '70%',
                              }}
                            >
                              {/* Title of Reward */}
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    flexWrap: 'wrap',
                                    textAlign: 'auto'
                                  }}
                                >
                                  {reward.name}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  marginTop: 5,
                                  flexWrap: 'wrap'
                                }}
                              >
                                {reward.description}
                              </Text>
                            </View>
                          </View>

                          {/* Punch Card Row */}
                          {reward.remaining_uses > 1 ?
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Divider color={'black'} width={3} style={{marginHorizontal: 10, marginVertical: 5}} />
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  marginLeft: 10
                                }}
                              >
                                {
                                  [...Array(reward.remaining_uses)].map((num) => {
                                      return (
                                        <View
                                          style={{
                                            backgroundColor: COLOR_CEDARVILLE_YELLOW,
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            marginLeft: 5
                                          }}
                                        >

                                        </View>
                                      )
                                  })
                                }
                              </View>
                            </View>
                          : null}
                        </Card>
                      </TouchableOpacity>
                    )
                  })
                : null
              }
            </ScrollView>
          </View>
      </View>
      <RewardTierModal open={tiersOpen} closeModal={() => setTiersOpen(false)}/>
      <RewardRedeemModal id={rewardOpen} open={rewardOpen !== undefined && rewardOpen !== ''} closeModal={() => setRewardOpen("")}/>
    </View>
  );
};

export default ScreenRewards;