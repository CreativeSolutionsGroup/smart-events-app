import React, { useEffect } from "react";
import { useState } from "react";
import { Text, ScrollView, View, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { Icon, Card, Image, Divider} from 'react-native-elements';
import { displayDate, displayDateRange, API_URL, getStudentTickets, getSlotInfo, getAttraction, getUserInfo, COLOR_CEDARVILLE_BLUE } from "../../utils/util";
import AttractionModal from "../modal/AttractionModal";
import QRTicket from "../modal/qrTicket";
import UserQRCodeModal from "../modal/UserQRCodeModal";

/*
    Tickets Tab
    This tab lists all of the user's tickets
    Author: Aidan Graef
*/
const TabTickets = ({userInfo, refreshUserInfo}) => {

    const [refreshing, setRefreshing] = useState(false);

    //const [userInfo, setUserInfo] = useState(null);
    const [attractions, setAttractions] = useState({});
    const [slots, setSlots] = useState({});
    const [userTickets, setUserTickets] = useState([]);
    const [selectedTicket, selectTicket] = useState(null);

    // Initial Load
    useEffect(() => {
        loadInContent();
    }, [])

    function ticketQRData(){
        if(selectedTicket===null)
            return {}

        return {
            type: "ticket",
            id: selectedTicket._id,
        }
    }

    async function loadInContent(){
        // if(userInfo !== null){
        //     loadUserTickets(userInfo.student_id);
        // }
        await loadUserTickets("2364990"); // get all the tickets for the use with id
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        loadInContent();

        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setRefreshing(false));
      }, []);

    async function loadUserTickets(studentId){
        let tickets = await getStudentTickets(studentId);
        setUserTickets(tickets);
        await getTicketSlots(tickets); // get all of the slots that the user cares about
    }

    async function getTicketSlots(tickets){
        let importantSlots = {};
        await Promise.all(tickets.map(async ticket => {
            let slotid = ticket.slot_id;
            let slotinfo = await getSlotInfo(slotid);
            console.log(slotinfo);

            importantSlots[slotid] = slotinfo;
        }))
        setSlots(importantSlots);
        getTicketAttractions(Object.values(importantSlots));
    }

    async function getTicketAttractions(slots){
        let importantAttractions = {};
        await Promise.all(slots.map(async slot => {
            let attractionid = slot.attraction_id;
            let attractioninfo = await getAttraction(attractionid);
            importantAttractions[attractionid] = attractioninfo;
        }))
        setAttractions(importantAttractions);
    }

    function reloadTickets(){
        getSlotTicketCounts();
        loadUserTickets(userInfo.student_id);
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
            >
                <Text
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLOR_CEDARVILLE_BLUE
                    }}
                >
                    Tickets
                </Text>
                <Divider 
                    style={{
                        marginTop: 10,
                        marginHorizontal: 10,
                        borderRadius: 5
                    }}
                    color={COLOR_CEDARVILLE_BLUE}
                    width={5}
                />
                {
                Object.keys(slots).length > 0 ? 
                userTickets.map(ticket => {
                    let slot = slots[ticket.slot_id];
                    if (slot == undefined) {
                        return null;
                    }

                    let attraction = attractions[slot.attraction_id];
                    let name = attraction === undefined ? "UNKNOWN ATTRACTION" : attraction.name;
                    let description = attraction === undefined ? "UNKNOWN ATTRACTION" : attraction.description;
                    let location = attraction === undefined ? "INVALID" : attraction.location;
                    let imageurl = attraction === undefined ? "no image": attraction.image_url;

                    return (
                        <TouchableOpacity
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => selectTicket(ticket)}
                                key={ticket._id}
                        >
                            <QRTicket ticketID={ticket._id} imageURL={imageurl} startTime={displayDate(new Date(slot.hide_time))} name={name} description={description} location={location}></QRTicket>
                        </TouchableOpacity>
                    )
                })
                : <QRTicket key={1} ticketID={113331} imageURL={"no image"} startTime={"6:00"} name={"gladitorial combat"} description={"Fight to the death against other students!"} location={"SSC"}></QRTicket> //<Text>empty slots {slots.length}</Text> // there are no slots
                }

            </ScrollView>
            <UserQRCodeModal data={ticketQRData()} open={selectedTicket != null} closeModal={() => selectTicket(null)}/>
        </View>
    );
};

export default TabTickets;