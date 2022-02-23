import React from "react";
import { Card, Image, Icon } from "react-native-elements";
import { View, Text, ActivityIndicator } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { COLOR_CEDARVILLE_BLUE } from "../../utils/util";

const QRTicket = ({name, imageURL, startTime, description, ticketID, location}) => {

    // ticketID -> getSlot(slot_id) -> getAttraction(slot.attraction_id)
    

    return (
        <Card
            containerStyle={{
                backgroundColor: COLOR_CEDARVILLE_BLUE,
                borderRadius: 5
            }}
        >
            <View 
                style={{
                    display:"flex", 
                    flexDirection: "column" 
                }}
            >

                {/* Image */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 5,
                        marginTop: 5,
                        // marginLeft: "auto",
                        // marginRight: 'auto',
                        // backgroundColor: "white"
                    }}
                > 
                    {/* <QRCode
                    value={JSON.stringify({
                        type: "ticket",
                        ticket_id: ticketID,
                    })}
                    size={200}
                    /> */}

                    <Image
                        source={{ uri: imageURL }}
                        containerStyle={{
                            aspectRatio: 16 / 9,
                            width: '100%',
                            flex: 1,
                            marginBottom: 10
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                        placeholderStyle={{
                            backgroundColor: 'transparent',
                            aspectRatio: 16 / 9,
                            width: '100%',
                            flex: 1,
                        }}
                    />

                </View>

                {/* Title */}
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginTop: 10
                    }}
                >
                    {name}
                </Text>
                
                {/* Description */}
                <Text
                    style={{
                        marginTop: 10,
                        color: 'white'
                    }}
                >{description}</Text>

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
                        Start Time: {startTime}
                    </Text>
                </View>

                {/* Location */}
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
                    <Text
                        style={{
                            marginLeft: 5,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            color: 'white'
                        }}
                    >
                        Location: {location}
                    </Text>
                </View>
            </View>
        </Card>
    )
}

export default QRTicket;