import React, { useEffect } from "react";
import { useState } from "react";
import { Text, ScrollView, View, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { Icon, Card, Image } from 'react-native-elements';
import { displayDate, displayDateRange, API_URL, getStudentTickets } from "../../utils/util";
import AttractionModal from "../modal/AttractionModal";

/*
    Events Tab
    This tab lists events and allows the user to reserve tickets or get more info about an event
    Author: Alec Mathisen
*/
const TabEvents = () => {

    const [refreshing, setRefreshing] = useState(false);

    const [attractions, setAttractions] = useState({});
    const [slots, setSlots] = useState({});
    const [slotTicketCounts, setSlotTicketCounts] = useState({});
    const [userTickets, setUserTickets] = useState([]);

    const [openAttraction, setOpenAttraction] = useState(null);

    // Initial Load
    useEffect(() => {
        loadInContent();
    }, []);


    function loadInContent(){
        loadUserTickets();

        getAllAttractions();
        getAttractionSlots();
        getSlotTicketCounts();
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        loadInContent();

        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setRefreshing(false));
      }, []);

    async function loadUserTickets(){
        let tickets = await getStudentTickets();
        setUserTickets(tickets);
    } 

    function getAllAttractions(){
        fetch(API_URL + "/attractions")
        .then((res) => res.json())
        .then((res) => {
            if (res.status !== "success") {
                console.error("Failed to retrieve attractions");
                console.error("Error:", res.message);
                //TODO: Create User Error Popup
                return;
            }

            //console.log(res.data)

            //Sort Attractions
            let now = new Date();
          
            //Sort by start time to order events by time
            let sortedAttractions = res.data.sort((a, b) => 
                (new Date(a.end_time).getTime() - new Date(b.end_time).getTime())
            );
            //Sort by end time to order similar starting time events to be ordered by end_time
            sortedAttractions = sortedAttractions.sort((a, b) => 
                (new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
            );
            //Sort Live events over past events
            sortedAttractions = res.data.sort((a, b) => 
                ((now >= new Date(b.start_time) && new Date(b.end_time) >= now) ? 1 : 0) - ((now >= new Date(a.start_time) && new Date(a.end_time) >= now) ? 1 : 0)
            );

            //Remove Hidden Attractions
            let attractions = sortedAttractions.reduce((acc, val) => {
                if (val.hidden === true) {
                    return acc;
                }
                acc[val._id] = val;
                return acc;
            }, {});
            setAttractions(attractions);
        },
        (err) => {
          console.error("Failed to retrieve attractions");
          console.error(err);
          setAttractions({});
        });
    }

    function getAttractionSlots(){
        fetch(API_URL + "/slots")
        .then((res) => res.json())
        .then((res) => {
            if (res.status !== "success") {
                console.error("Failed to retrieve slots");
                console.error("Error:", res.message);
                //TODO: Create User Error Popup
                return;
            }

            // Reduce array to object with attraction ID as key and all slots
            // for each attraction
            let initVal = {};
            let slots = res.data.reduce(
                (acc, val) => ({
                ...acc,
                [val.attraction_id]: [...(acc[val.attraction_id] || []), val],
                }),
                initVal
            );
            setSlots(slots);
        },
        (err) => {
          console.error("Failed to retrieve slots");
          console.error(err);
          setSlots({});
        });
    }

    function getSlotTicketCounts() {
        fetch(API_URL + "/tickets/")
            .then((res) => res.json())
            .then(
                (res) => {
                    if (res.status !== "success") {
                        console.error("Failed to retrieve slot tickets");
                        console.error("Error:", res.message);
                        return;
                    }

                    let newSlotTicketCount = {}
                    res.data.forEach((ticket) => {
                        let oldCount = newSlotTicketCount[ticket.slot_id] === undefined ? 0 : newSlotTicketCount[ticket.slot_id];
                        newSlotTicketCount[ticket.slot_id] = oldCount + 1;
                    })
                    setSlotTicketCounts(newSlotTicketCount);
                },
                (err) => {
                    console.error("Failed to retrieve slot tickets");
                    console.error(err);
                    setSlotTicketCounts({});
                }
            );
    }

    function reloadTickets(){
        getSlotTicketCounts();
        loadUserTickets();
    }

    function closeModal() {
        setOpenAttraction(null);
    }

    return (
        <View>
            <ScrollView 
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >   
                {
                    Object.entries(attractions).map((l, i) => {
                        let attraction = attractions[l[0]];
                        const hasSlots = slots[attraction._id];
                        return (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => setOpenAttraction(attraction)}
                                key={i}
                            >
                                <Card
                                    containerStyle={{
                                        backgroundColor: 'blue',
                                        borderRadius: 5
                                    }}
                                    onPress={() => setOpenAttraction(attraction)}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {/* Image */}
                                        <Image
                                            source={{ uri: attraction.image_url }}
                                            containerStyle={{
                                                aspectRatio: 16 / 9,
                                                width: '100%',
                                                flex: 1,
                                                marginBottom: 10
                                            }}
                                            PlaceholderContent={<ActivityIndicator />}
                                            placeholderStyle={{
                                                backgroundColor: 'blue',
                                                aspectRatio: 16 / 9,
                                                width: '100%',
                                                flex: 1,
                                            }}
                                        />

                                        {/* Title */}
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}
                                            >
                                                {attraction.name}
                                            </Text>
                                            {hasSlots ? 
                                                <Icon 
                                                    type="font-awesome" name="ticket" 
                                                    color='white'
                                                    containerStyle={{
                                                        marginLeft: 'auto',
                                                        marginTop: 'auto',
                                                        marginBottom: 'auto'
                                                    }}
                                                />
                                            : null}
                                        </View>

                                        {/* Description */}
                                        <Text
                                            style={{
                                                marginTop: 10,
                                                color: 'white'
                                            }}
                                        >
                                            {attraction.description}
                                        </Text>

                                        {/* Time Info */}
                                        <View 
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                padding: 2,
                                                marginTop: 5
                                            }}
                                        >    
                                            <Icon 
                                                iconStyle={{
                                                    marginTop: 'auto',
                                                    marginBottom: 'auto'
                                                }}
                                                type='font-awesome-5' name='clock' color='white'
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 5,
                                                    marginTop: 'auto',
                                                    marginBottom: 'auto',
                                                    color: 'white'
                                                }}
                                            >
                                                {hasSlots ? "End Time: " + displayDate(new Date(attraction.end_time)) : displayDateRange(new Date(attraction.start_time), new Date(attraction.end_time))}
                                            </Text>
                                        </View>

                                        {/* Location Info */}
                                        {attraction.location !== "N/A" ?
                                            <View 
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    padding: 2,
                                                    marginTop: 5
                                                }}
                                            >    
                                                <Icon 
                                                    iconStyle={{
                                                        marginTop: 'auto',
                                                        marginBottom: 'auto'
                                                    }}
                                                    name='location-pin' color='white'
                                                />
                                                {
                                                    <Text
                                                        style={{
                                                            marginLeft: 5,
                                                            marginTop: 'auto',
                                                            marginBottom: 'auto',
                                                            color: 'white'
                                                        }}
                                                    >
                                                        {attraction.location}
                                                    </Text>
                                                }
                                            
                                            </View>
                                        : null}
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
            <AttractionModal attraction={openAttraction} slots={slots} slotCounts={slotTicketCounts} userTickets={userTickets} closeModal={closeModal} reloadTickets={reloadTickets}/>
        </View>
    );
};

export default TabEvents;