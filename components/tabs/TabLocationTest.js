import React, { createRef, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button } from 'react-native-elements';
import MapView from "react-native-maps"
import { ERROR_NO_LOCATION_PERMISSION, ERROR_NO_LOCATION_SILENT_PERMISSION, getAllLocations, getUserLocation, sendLocalNotification } from "../../utils/util";

/*
    Location Test Tab
    This tab shows all the main campus locations and the user's distance from them
    Author: Alec Mathisen
*/
const TabLocationTest = ({}) => {

    const mapRef = createRef();

    const [loadingPosition, setLoadingPosition] = useState(false);
    const [latitude, setLat] = useState(0.0);
    const [longitude, setLong] = useState(0.0);
    const [accuracy, setAccuracy] = useState(0);

    const [locations, setLocations] = useState([]);

    // Initial Load
    useEffect(async () => {
        loadAllLocations();
        getCurrentLocation();

        
    }, [])

    function loadAllLocations(){
        getAllLocations()
        .then(res => {
            setLocations(res);
        })
    }

    async function getCurrentLocation(){

        setLoadingPosition(true);

        //Request needed permissions
        let location = await getUserLocation(); 

        if(location.error !== undefined){
            //Error Handling
            if(location.error === ERROR_NO_LOCATION_PERMISSION){
                Alert.alert("Please enable location permissions \n or scan a QR Code to Check In");
                //TODO Open QR Scan
            }
            if(location.error === ERROR_NO_LOCATION_SILENT_PERMISSION){
                //TODO Open Camera without location warning (ie the user has manually gone to settings and turned off location)
                Alert.alert("QR Scan")
            }
            console.log("Location Error")
            setLoadingPosition(false);
            return;
        }

        setLat(location.latitude);
        setLong(location.longitude);
        setAccuracy(location.accuracy);

        setLoadingPosition(false);
    }

    function roundNumber(number){
        return number.toFixed(2);
    }

    function calculateDistance(lattitude1, longittude1, lattitude2, longittude2) {

        const toRadian = n => (n * Math.PI) / 180

        let lat2 = lattitude2
        let lon2 = longittude2
        let lat1 = lattitude1
        let lon1 = longittude1

        let R = 6371  // km
        let x1 = lat2 - lat1
        let dLat = toRadian(x1)
        let x2 = lon2 - lon1
        let dLon = toRadian(x2)
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let d = R * c
        return d
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 5
                }} 
                key="text_container"
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        BTS: {roundNumber(calculateDistance(latitude, longitude, 39.749099,-83.81106) * 1000)}m
                    </Text>
                    <Text
                        style={{
                            marginLeft: 10,
                            marginRight: 10,
                            fontWeight: 'bold'
                        }}
                    >
                        SSC: {roundNumber(calculateDistance(latitude, longitude, 39.749165,-83.814518) * 1000)}m
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        DMC: {roundNumber(calculateDistance(latitude, longitude, 39.750159, -83.812469) * 1000)}m
                    </Text>
                </View>
                <Text
                    style={{
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontWeight: 'bold'
                    }}
                >
                    Location: {latitude},{longitude}
                </Text>
                <Text
                    style={{
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontWeight: 'bold',
                        color: (accuracy > 50.0 ? 'red' : 'green') //If accuracy is larger than 50m we can not be confident on the user's location
                    }}
                >
                    Accuracy: {roundNumber(accuracy)}m
                </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                key="button_container"
            >
                <Button
                    key="location_button"
                    title="Update Location"
                        buttonStyle={{
                        backgroundColor: 'rgba(78, 116, 289, 1)',
                        borderRadius: 3
                    }}
                    containerStyle={{
                        width: 200,
                        marginVertical: 10
                    }}
                    onPress={() => getCurrentLocation()}
                    loading={loadingPosition}
                />
                <Button
                    key="notification_button"
                    title="Notification"
                        buttonStyle={{
                        backgroundColor: 'rgba(78, 116, 289, 1)',
                        borderRadius: 3
                    }}
                    containerStyle={{
                        width: 100,
                        marginVertical: 10
                    }}
                    onPress={() => sendLocalNotification()}
                />
            </View>
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: 39.748995,
                    longitude: -83.812558,
                    latitudeDelta: 0.0050,
                    longitudeDelta: 0.0050,
                }}
                style={{
                    width: 500,
                    height: 500  
                }}
                showsBuildings={true}
                showsUserLocation={true}
                key={"map"}
            >                
                {
                    locations.map((location) => {
                        let distance = calculateDistance(latitude, longitude, location.latitude, location.longitude) * 1000;
                        let insideRange = distance <= location.radius && accuracy <= 50.0;
                        return(
                            <View
                                key={location._id}
                            >
                                <MapView.Marker
                                    key={"marker_" + location._id}
                                    title={location.name}
                                    description={`${roundNumber(distance)}m`}
                                    coordinate={{latitude: location.latitude, longitude: location.longitude}}
                                />
                                <MapView.Circle
                                    key={"circle_" + location._id}
                                    center={{latitude: location.latitude, longitude: location.longitude}}
                                    radius={location.radius}
                                    fillColor={insideRange ? "rgba(0,255,0,0.3)" : "rgba(255,0,0,0.3)"}
                                />
                            </View>
                        )
                    })
                }
                <MapView.Marker
                    key="marker_your_location"
                    title={"Your Location"}
                    coordinate={{latitude: latitude, longitude: longitude}}
                />
            </MapView>
        </View>
    );
};

export default TabLocationTest;