import { Alert } from "react-native";

export const API_URL = "https://api.cusmartevents.com/api";

export const COLOR_CEDARVILLE_BLUE = 'rgb(0,82,136)'
export const COLOR_CEDARVILLE_YELLOW = 'rgb(235,185,19)'


export const getUserInfo = () => {
    return new Promise( (resolve, reject) => {
        resolve({name: 'Alec Mathisen', student_id: '2434296', phone: '(123) 456-7890', rewardPoints: 600});
    });
}

export const displayDate = (date) => {
    if (date === null || date === undefined) return "ERROR";

    let now = new Date();

    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let pm = hour > 11;

    let finalStr = "";

    if (now.getDate() !== day) { //If not today then show date
        finalStr += (month + 1) + "/" + (day) + " ";
    }

    let hourStr = hour === 0 ? "12" : (hour % 12); //If midnight then show 12
    finalStr += hourStr + ":" + ((min < 10 ? '0' : '') + min) + " " + (pm ? "PM" : "AM");
    return finalStr;
}

export const displayDateRange = (date1, date2) => {
    if (date1 === null || date1 === undefined) return "ERROR";
    if (date2 === null || date2 === undefined) return "ERROR";

    let now = new Date();

    let month1 = date1.getMonth();
    let day1 = date1.getDate();
    let hour1 = date1.getHours();
    let min1 = date1.getMinutes();
    let pm1 = hour1 > 11;
    let month2 = date2.getMonth();
    let day2 = date2.getDate();
    let hour2 = date2.getHours();
    let min2 = date2.getMinutes();
    let pm2 = hour2 > 11;

    let finalStr = "";
    if (month1 === month2 && day1 === day2) {
        if (now.getDate() !== day1) { //Test if event is on a different day and display that date
            finalStr += (month1 + 1) + "/" + (day1) + " ";
        }
    }
    let hour1Str = hour1 === 0 ? "12" : (hour1 % 12); //If midnight then show 12
    finalStr += hour1Str + ":" + ((min1 < 10 ? '0' : '') + min1);

    if (pm1 !== pm2) {
        finalStr += " " + (pm1 ? "PM" : "AM");
    }
    finalStr += " - ";
    if (month1 !== month2) {
        finalStr += (month2 + 1) + "/";
    }
    if (day1 !== day2) { //If the second date is not on the same day display that date
        if (month1 === month2) {
            finalStr += (month2 + 1) + "/"
        }
        finalStr += (day2) + " ";
    }

    let hour2Str = hour2 === 0 ? "12" : (hour2 % 12); //If midnight then show 12
    finalStr += hour2Str + ":" + ((min2 < 10 ? '0' : '') + min2) + " " + (pm2 ? "PM" : "AM");
    return finalStr;
}

export const getStudentTickets = (studentID) => {

    if(studentID === undefined || studentID === ''){
        return []
    }

    return fetch(API_URL + "/tickets")
      .then((res) => res.json())
      .then(
        (res) => {
          // Filter tickets specific to this student
          const userTickets = res.data.filter(
            (val) => val.student_id.toString() === studentID
          );
          
          return userTickets;
        },
        (err) => {
            console.error(err)
            return [];
        }
      );
  }

export const claimTicket = (studentID, slot) => {
    if(studentID === undefined || studentID === ''){
        Alert.alert("Invalid Student ID");
        console.error("Invalid Student ID")
        return false;
    }

    const ticketReq = {
        student_id: studentID,
        slot_id: slot._id,
    };

    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketReq),
    };

    return fetch(API_URL + "/tickets", postOptions)
    .then((res) => res.json())
    .then(
        (res) => {
            if (res.status !== "success") {
                Alert.alert("Error reserving ticket");
                return false;
            } else {
                Alert.alert("Reserved ticket!");
                return true;
            }
        },
        (err) => {
            console.error(err)
            return false;
        }
    );
}

//Reward Points

export const user_rewards = [
    {
        reward_id: '61fd9d1f91772958c3f68b11', //Free Rinnova
        remaining_uses: 1
    },
    {
        reward_id: '61fd9d4091772958c3f68b13', //Free Sticker
        remaining_uses: 2
    },
    {
        reward_id: '61fd9d6891772958c3f68b15', //Golf Cart ride
        remaining_uses: 1
    }
]

const IP_ADDRESS = ;

export function getRewards(){
    return fetch(`http://${IP_ADDRESS}:3001/api` + "/reward")
    .then((res) => res.json())
    .then(
        (res) => {
            return res.data;
        },
        (err) => {
            Alert.alert("Error: " + err)
            console.error(err)
            return [];
        }
    );
}

export function getRewardById(id){
    return fetch(`http://${IP_ADDRESS}:3001/api` + "/reward/" + id)
    .then((res) => res.json())
    .then(
        (res) => {
            return res.data;
        },
        (err) => {
            Alert.alert("Error: " + err)
            console.error(err)
            return null;
        }
    );
}

export function getRewardTiers(){
    return fetch(`http://${IP_ADDRESS}:3001/api` + "/reward_tier")
    .then((res) => res.json())
    .then(
        (res) => {
            return res.data;
        },
        (err) => {
            Alert.alert("Error: " + err)
            console.error(err)
            return [];
        }
    );
}

//Sort the tiers in order of largest min_points first
export function getSortedRewardTiers() {
    return getRewardTiers().then((res) => {
                return res.sort((a, b) => b.min_points > a.min_points ? 1 : -1);
            })
}

//Get the maximum tier points
export const getMaxRewardTierPoints = (tiers) => {
    if(tiers === null || tiers === undefined || tiers.length == 0){
        return -1;
    }
    return tiers[0].min_points;
}

//Get the users current tier
export function getUserRewardTier(rewardPoints, tiers){
    return tiers.find((tier) => tier.min_points <= rewardPoints);
}

//Get Users Current Rewards
export const getUserRewards = () => {
    return new Promise( (resolve, reject) => {
        resolve(user_rewards);
    });
}

export const getUserReward = (id) => {
    return user_rewards.find((reward) => reward.id === id);
}