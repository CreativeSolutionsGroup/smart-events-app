import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { Card, Image } from "react-native-elements";
import { COLOR_CEDARVILLE_BLUE, getUserRewardTier, getUserRewards, getSortedRewardTiers, COLOR_CEDARVILLE_YELLOW, getUserInfo, getRewardById } from "../../utils/util";
import RewardTierModal from "../modal/RewardTierModal";
import RewardRedeemModal from "../modal/RewardRedeemModal";
import RewardProgressBar from "../rewardprogressbar";
import { Divider } from "react-native-elements/dist/divider/Divider";

/*
    Screen for the user to view their rewards and more details on the reward tiers
    Author: Alec Mathisen
*/
const ScreenRewards = ({navigation, userInfo, refreshUserInfo}) => {

  const [tiersOpen, setTiersOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(null);
  const [refreshing, setRefreshing] = useState(false);  
 
  const [tiers, setTiers] = useState([]);
  const [userTier, setUserRewardTier] = useState(null);
  const [userRewards, setUserRewards] = useState([]);

  useEffect(() => {
    loadTierInfo();
    loadUserRewards();
  }, [])

  function loadTierInfo(){
      getSortedRewardTiers()
      .then((res) => {
          setTiers(res);
          setUserRewardTier(getUserRewardTier(userInfo.reward_points, res));
      })
  }

  async function loadUserRewards() {
      let serverRewards = userInfo !== null ? await getUserRewards(userInfo._id) : [];
      
      //Sort Rewards
      let sortedRewards = serverRewards.sort((a, b) => new Date(b.date_earned).getTime() - new Date(a.date_earned).getTime()); //Sort by date earned
      
      //Loop though them and resolve all of the promises
      let rewards = await Promise.all(sortedRewards.map(async (userReward) => {
        let reward = await getRewardById(userReward.reward_id); //Async grab of the rewards information
        if(reward === null){
          return null;
        }
        return {remaining_uses: userReward.remaining_uses, reward: reward};
      }));

      let sortedRewards2 = rewards.sort((a, b) => a.remaining_uses === 0 ? 1 : b.remaining_uses === 0 ? -1 : 0) //Sort the rewards with zero uses left to the bottom

      setUserRewards(sortedRewards2);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    loadUserRewards();

    new Promise(resolve => setTimeout(resolve, 1000)).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
          style={{
            flex: 1,
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
                      paddingHorizontal: 8,
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
                            color: userTier === undefined || userTier == null ? 'black' : userTier.color
                        }}
                    >
                        {userTier === undefined || userTier == null ? 'Error' : userTier.name}
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
              <RewardProgressBar tiers={tiers} userTier={userTier} userRewardPoints={userInfo.reward_points}/>
            </View>

            {/* Reward List */}
            <View
              style={{
                flex: 1
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
                Your Rewards
              </Text>
              <ScrollView
                style={{
                  marginTop: 10,
                }}
                contentContainerStyle={{
                  paddingBottom: 10
                }}
                refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                  />
                }
              >
                {
                  userRewards.length > 0 ? 
                    userRewards.map((userReward) => {
                      if(userReward === null || userReward.reward === null || userReward.reward === undefined){
                        return null;
                      }
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            if(userReward.remaining_uses < 1){
                              Alert.alert("You have already used this reward")
                              return;
                            }
                            setRewardOpen(userReward)
                          }}
                          key={userReward.reward._id}
                        >
                          <Card
                            style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                            containerStyle={{
                              borderRadius: 10,
                              opacity: userReward.remaining_uses < 1 ? 0.3 : 1.0
                            }}
                          >
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row'
                              }}
                            >
                              {userReward.reward.image_url !== undefined && userReward.reward.image_url !== "" ?
                                <Image
                                    source={{ uri: userReward.reward.image_url }}
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
                                    {userReward.reward.name}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  {userReward.reward.description}
                                </Text>
                              </View>
                            </View>

                            {/* Punch Card Row */}
                            {userReward.remaining_uses > 1 ?
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <Divider color={'black'} width={3} style={{marginHorizontal: 10, marginTop: 10, marginBottom: 5, borderRadius: 5}} />
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginLeft: 10
                                  }}
                                >
                                  {
                                    [...Array(Math.min(userReward.remaining_uses, 10))].map((num, index) => {
                                        return (
                                          <View
                                            style={{
                                              backgroundColor: COLOR_CEDARVILLE_YELLOW,
                                              width: 20,
                                              height: 20,
                                              borderRadius: 10,
                                              marginLeft: 5
                                            }}
                                            key={"reward_dot_" + userReward.reward._id + "_" + index}
                                          >

                                          </View>
                                        )
                                    })
                                  }
                                  {
                                    userReward.remaining_uses - 10 > 0 ?
                                      <Text
                                        style={{
                                          color: COLOR_CEDARVILLE_YELLOW,
                                          marginLeft: 5,
                                          marginTop: 'auto',
                                          marginBottom: 'auto',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        +{userReward.remaining_uses - 10}
                                      </Text>
                                    : null
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
      {/* TODO Add View for missing user info */}
      <RewardTierModal tiers={tiers} open={tiersOpen} closeModal={() => setTiersOpen(false)}/>
      <RewardRedeemModal userReward={rewardOpen} open={rewardOpen !== undefined && rewardOpen !== null} closeModal={() => setRewardOpen(null)}/>      
    </View>
  );
};

export default ScreenRewards;