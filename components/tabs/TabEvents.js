import React from "react";
import { Text, ScrollView, View } from "react-native";
import { Icon, Card } from 'react-native-elements';
import { displayDateRange } from "../../utils/util";
    
/*
    Events Tab
    This tab lists events and allows the user to reserve tickets or get more info about an event
    Author: Alec Mathisen
*/
const TabEvents = () => {
    const events = [
        {
            event_id: "1",
            event_name: "Test Event",
            desctiption: "This is a test event\nMultiline",
            start_time: "01/25/22 8:00 PM",
            end_time:"01/25/22 10:00 PM",
            location: 'BTS'
        }
    ];
    return (
        <ScrollView 
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {
                events.map((l, i) => {
                    return (
                        <Card
                            containerStyle={{
                                backgroundColor: 'blue'
                            }}
                            key={i}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {/* Title */}
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}
                                >
                                    {l.event_name}
                                </Text>

                                {/* Description */}
                                <Text
                                    style={{
                                        marginTop: 10
                                    }}
                                >
                                    {l.desctiption}
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
                                        type='font-awesome-5' name='clock' color='black'
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 5,
                                            marginTop: 'auto',
                                            marginBottom: 'auto'
                                        }}
                                    >
                                        {displayDateRange(new Date(l.start_time), new Date(l.end_time))}
                                    </Text>
                                </View>

                                {/* Location Info */}
                                {l.location !== "N/A" ?
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
                                                {l.location}
                                            </Text>
                                        }
                                    
                                    </View>
                                : null}
                            </View>
                        </Card>
                    );
                })
            }
        </ScrollView>
    );
};

export default TabEvents;