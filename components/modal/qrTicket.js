import React from "react";
import { Card, Image, Icon } from "react-native-elements";
import { View, Text, ActivityIndicator } from "react-native";
import { COLOR_CEDARVILLE_BLUE } from "../../utils/util";

const QRTicket = ({name, imageURL, startTime, description, ticketID, location}) => {

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
                    }}
                > 
                   <Image
                        source={{ uri: imageURL }}
                        containerStyle={{
                            aspectRatio: 16 / 9,
                            width: '100%',
                            flex: 1
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
                        marginTop: 5
                    }}
                >
                    {name}
                </Text>
                
                {/* Description */}
                <Text
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 5,
                        color: 'white'
                    }}
                >
                    {description}
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