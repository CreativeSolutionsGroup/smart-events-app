import { Alert } from "react-native";
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

export const API_URL = "https://api.cusmartevents.com/api"; //`http://${IP_ADDRESS}:3001/api` 

export const COLOR_CEDARVILLE_BLUE = 'rgb(0,82,136)'
export const COLOR_CEDARVILLE_YELLOW = 'rgb(235,185,19)'

export const getUserInfo = async (user_id) => {
    
    const auth = getAuth();
    const user = auth.currentUser;
    const authToken = await user.getIdToken().catch((error) => {
        Alert.alert("Error getting authToken");
        return null;
    });

    return getUserInfoFromServer(user_id, authToken);
}

export const getUserServerID = async () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;

    if(email === undefined || email === ''){
        console.error("Invalid Email")
        return new Promise((resolve, reject) => { reject(null) });
    }

    const userReq = {
        email: email
    };

    const postOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(userReq),
    };

    let userID = await fetch(API_URL + "/find_user/", postOptions);
    let json = await userID.json();
    if(json.status !== "success"){
        return null;
    }

    return json.data.user_id;
}

export const getUserInfoFromServer = async (id, authToken) => {
    if(id === undefined || id === ''){
        Alert.alert("Invalid UserID");
        console.error("Invalid UserID")
        return null;
    }

    const getOptions = {
        method: "GET",
        headers: { 
            'Authorization': 'Bearer '+ authToken,
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    };

    let userInfo = await fetch(API_URL + `/user/${id}`, getOptions);
    let json = await userInfo.json();
    if(json.status !== "success"){
        Alert.alert("User Info does not exist");
        console.log(json.message)
        return null;
    }
    return json.data;
}

export const updateUserInfo = (data) => {
    Alert.alert("Update User not added")
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
        reward_id: '61ff021058ebed489a3be292', //Free Rinnova
        remaining_uses: 1,
        date_earned: "2022-02-06T05:45:53Z"
    },
    {
        reward_id: '61ff023458ebed489a3be293', //Free Sticker
        remaining_uses: 2,
        date_earned: "2022-02-01T06:00:00Z"
    },
    {
        reward_id: '61ff37f458ebed489a3be295', //Ride With OPS Reward
        remaining_uses: 0,
        date_earned: "2022-02-03T06:00:00Z"
    }
]

export function getRewards(){
    return fetch(API_URL + "/reward")
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
    return fetch(API_URL + "/reward/" + id)
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
    return fetch(API_URL + "/reward_tier")
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

export const getUserRewards = async (userId, authToken) => {
    let userRewards = await fetch(API_URL + "/user/" + userId + "/rewards");
    let json = await userRewards.json();
    if(json.status !== "success"){
        Alert.alert("User Rewards do not exist");
        console.log("User Rewards do not exist")
        return null;
    }

    return json.data;
}

//LOCATION

export const ERROR_NO_LOCATION_SILENT_PERMISSION = "no-location-permission-silent";
export const ERROR_NO_LOCATION_PERMISSION = "no-location-permission";
export const ERROR_COARSE_LOCATION_PERMISSION = "coarse-location-permission";

export const getUserLocation = async () => {    

    let forgroundPermissions = await Location.getForegroundPermissionsAsync();
    let highAccuracy = await Location.enableNetworkProviderAsync();

    console.log("Location Permission")
    console.log(forgroundPermissions)

    if(forgroundPermissions.granted === false){
        if(forgroundPermissions.canAskAgain === false){
            return {error: ERROR_NO_LOCATION_SILENT_PERMISSION}
        }
        forgroundPermissions = await Location.requestForegroundPermissionsAsync();
        if(forgroundPermissions.granted === false){
            return {error: ERROR_NO_LOCATION_PERMISSION}
        }
    }

    if(forgroundPermissions.android !== undefined){
        if(forgroundPermissions.android.accuracy === "coarse"){
            return {error: ERROR_COARSE_LOCATION_PERMISSION, android: true}
        }
    }
        
    let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        mayShowUserSettingsDialog: true,
        accuracy: Location.LocationAccuracy.BestForNavigation
    });
    return {latitude: location.coords.latitude, longitude: location.coords.longitude, accuracy: location.coords.accuracy}
}

//TODO Create location permission walkthrough window
export const setUpBackgroundLocation = async () => {
    let backgroundPermissions = await Location.getBackgroundPermissionsAsync();
        
    if(backgroundPermissions.granted === false){
        backgroundPermissions = await Location.requestBackgroundPermissionsAsync();
        if(backgroundPermissions.granted === false){
            return;
        }
    }

    TaskManager.defineTask("GEOFENCE", ({ data: { eventType, region }, error }) => {
        if (error) {
            console.error(error.message);
            return;
        }
        if (eventType === GeofencingEventType.Enter) {
            sendLocalNotification("Geofence", "You have entered " + region.identifier)
        }
    });
    Location.startGeofencingAsync("GEOFENCE", [
        {identifier: "DMC", latitude: 39.750159, longitude: -83.812469, radius: 50},
        {identifier: "SSC", latitude: 39.749165, longitude: -83.814518, radius: 60},
        {identifier: "BTS", latitude: 39.749099, longitude: -83.811061, radius: 50},
        {identifier: "Fieldhouse", latitude: 39.751590, longitude: -83.814733, radius: 50},
        {identifier: "Callen", latitude: 39.751202, longitude: -83.813371, radius: 50}
    ]);
}

export const getAllLocations = async () => {
    let locations = await fetch(API_URL + "/location");
    let json = await locations.json();
    if(json.status !== "success"){
        Alert.alert("Locations do not exist");
        console.log("Locations do not exist")
        return [];
    }

    return json.data;
}

//Notifications
export const askNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    return existingStatus === 'granted';
};

export function sendLocalNotification(title, body){
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: null,
    })
};