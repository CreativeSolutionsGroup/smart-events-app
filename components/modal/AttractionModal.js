import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { Overlay, Image, Card, Icon, Button } from "react-native-elements";
import { displayDate, displayDateRange, claimTicket, COLOR_CEDARVILLE_YELLOW, COLOR_CEDARVILLE_BLUE} from "../../utils/util";

/*
    Popup for infomation on an event and ticket slots
    Author: Alec Mathisen
*/
const AttractionModal = ({attraction, slots, slotCounts, userTickets, closeModal, reloadTickets}) => {
    const [open, setOpen] = useState(false)

    return (
        <Overlay isVisible={attraction !== undefined && attraction !== null} onBackdropPress={() => closeModal()}>
            {attraction !== undefined && attraction !== null ? 
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >           
                    {/* Title */}
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: 5
                        }}
                    >
                        {attraction.name}
                    </Text>

                    {/* Attraction Image */}
                    <Image
                        source={{ uri: attraction.image_url }}
                        containerStyle={{
                            aspectRatio: 16 / 9,
                            width: 300,
                            marginBottom: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                        placeholderStyle={{
                            aspectRatio: 16 / 9,
                            width: 300,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    />

                    {/* Description Area */}
                    <View
                        style={{
                            marginHorizontal: 20,
                            marginVertical: 10,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Text>{attraction.description}</Text>
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
                                type='font-awesome-5' name='clock' color='black'
                            />
                            <Text
                                style={{
                                    marginLeft: 5,
                                    marginTop: 'auto',
                                    marginBottom: 'auto'
                                }}
                            >
                                {displayDateRange(new Date(attraction.start_time), new Date(attraction.end_time))}
                            </Text>
                        </View>

                        
                        {
                            /* Location Info */
                            //TODO Create Map Intigration here
                        }
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
                                    name='location-pin' color='black'
                                />
                                {
                                    <Text
                                        style={{
                                            marginLeft: 5,
                                            marginTop: 'auto',
                                            marginBottom: 'auto'
                                        }}
                                    >
                                        {attraction.location}
                                    </Text>
                                }
                            
                            </View>
                        : null}
                    </View>

                    {/* Slot List */}
                    {
                        slots[attraction._id] ? 
                            <View
                                style={{
                                    height: 200
                                }}
                            >
                                <Text 
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    }}
                                >
                                    Tickets
                                </Text>
                                <ScrollView 
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        //backgroundColor: 'red'
                                    }}
                                    horizontal={true}
                                >
                                    {
                                        slots[attraction._id].map((slot) => {
                                            const now = Date.now();
                                            const hideTime = new Date(Date.parse(slot.hide_time));

                                            
                                            //Hide the slot if hide_time has passed
                                            if (hideTime <= now) {
                                                return null;
                                            }

                                            const ticketsReserved = (slotCounts[slot._id] !== undefined ? slotCounts[slot._id] : 0)
                                            //TODO Add ticket wallet check
                                            const hasTicket = userTickets.find((ticket) => ticket.slot_id === slot._id) !=undefined;
                                            
                                            return (
                                                <Card
                                                    key={slot._id}
                                                    containerStyle={{
                                                        backgroundColor: COLOR_CEDARVILLE_BLUE,
                                                        height: 150,
                                                        borderRadius: 5
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto',
                                                                fontWeight: 'bold',
                                                                fontSize: 20,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            {displayDate(hideTime)}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            <Icon type='font-awesome' name="ticket" color='white' />
                                                            <Text
                                                                style={{
                                                                    marginLeft: 5,
                                                                    marginTop: 'auto',
                                                                    marginBottom: 'auto',
                                                                    color: 'white'
                                                                }}
                                                            >
                                                                {slot.ticket_capacity - ticketsReserved}/{slot.ticket_capacity}{" "}
                                                                tickets available
                                                            </Text>
                                                        </View>
                                                        {/* TODO: Create popup for ticket confirmation/steps the user wants to take (setup reminders etc) */}
                                                        <Button
                                                            title={'Claim Ticket'}
                                                            buttonStyle={{
                                                                backgroundColor: COLOR_CEDARVILLE_YELLOW,
                                                                borderRadius: 3,
                                                            }}
                                                            containerStyle={{
                                                                width: 120,
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto',
                                                                marginVertical: 20,
                                                            }}
                                                            disabled={ticketsReserved === slot.ticket_capacity || hasTicket}
                                                            onPress={() => {
                                                                claimTicket(slot)
                                                                .then(success => {
                                                                    if(success){
                                                                        reloadTickets();
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </View>
                                                </Card>
                                            );
                                        })
                                    }
                                </ScrollView> 
                            </View>
                        : null
                    }
                       

                </View>
            : null}
        </Overlay>
    );
};

export default AttractionModal;