import React from "react";
import { Text, useColorScheme } from "react-native";

/*
    Text that changes color based on user's system dark mode preferences
    Author: Alec Mathisen
*/
const DarkModeText = (props) => {
    const theme = useColorScheme();

    return (
        <Text style={{color: theme === 'dark' ? 'white' : 'black'}}>{props.children}</Text>
    );
};

export default DarkModeText;