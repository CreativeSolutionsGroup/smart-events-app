import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Input, Image, Divider, Button } from "react-native-elements";
import { API_URL, COLOR_CEDARVILLE_BLUE } from "../../utils/util";
import { getAuth } from "firebase/auth";
import axios from "axios";

/*
    Screen for user sign up
    Author: Alec Mathisen
*/
const ScreenSignUp = ({navigation, user, updateInfo}) => {
    const studentIDRegex = /^[0-9]{7}$/;
    const phoneRegex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [studentID, setStudentID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");  

    useEffect(() => {
        if(user !== null){
            setEmail(user.email);
            setName(user.name);
            setStudentID("")
            setPhoneNumber(user.phoneNumber)
        } else {
            setEmail("")
            setName("")
            setStudentID("")
            setPhoneNumber("")
        }
    }, [user])

    function isSubmitValid(){
        if(name === ""){
            return false;
        }
        if(studentID === ""){
            return false;
        }
        if(!studentIDRegex.test(studentID)){
            return false;
        }
        if(phoneNumber === ""){
            return false;
        }
        if(!phoneRegex.test(phoneNumber)){
            return false;
        }
        return true;
    }

    async function handleSubmit(){

        const auth = getAuth();
        const user = auth.currentUser;
        const authToken = await user.getIdToken().catch((error) => {
            Alert.alert("Error getting authToken");
            return null;
        });

        if(authToken == null)return;

        let authHeader = {Authorization: "Bearer " + authToken}
        let data =
        {
            email: email,
            name: name,
            student_id: studentID,
            phone_number: phoneNumber
        }
        let userInfo = await axios.post(API_URL + "/user/", data, {headers: authHeader});
        let response = userInfo.data;
        if(response.status !== "success"){
            Alert.alert(response.message);
            console.log(response.message)
            return;
        }
        updateInfo(navigation, authToken, response.data);  
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Image
                    source={require('../../smart-events-logo.png')}
                    resizeMode={'center'}
                    containerStyle={{
                        aspectRatio: 16/9,
                        width: 200,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10
                    }}
                />
                <Text
                    style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    Welcome to the Cedarville Smart Events App!
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 12,
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: 10
                    }}
                >
                    Please take a few seconds to fill out some information for your account
                </Text>
                <Divider 
                    style={{
                        marginHorizontal: 10,
                        borderRadius: 5
                    }}
                    width={5}
                    color={COLOR_CEDARVILLE_BLUE}
                />
                <Input
                    containerStyle={{marginTop: 10}}
                    label={"Email"}
                    leftIcon={{ type: 'MaterialIcons', name: 'email' }}
                    value={email}
                    editable={false}
                    key={"email"}
                />
                <Input
                    label={"Name"}
                    autoComplete='name'
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    value={name}
                    onChangeText={value => setName(value)}
                    key={"name"}
                />
                <Input
                    label={"Student ID"}
                    autoComplete='off'
                    keyboardType="number-pad"
                    leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                    value={studentID}
                    onChangeText={value => setStudentID(value)}
                    errorMessage={!studentIDRegex.test(studentID) ? "Invalid Student ID" : ""}
                    key={"student_id"}
                />
                <Input
                    label={"Phone Number"}
                    autoComplete='tel'
                    keyboardType='number-pad'
                    leftIcon={{ type: 'font-awesome', name: 'phone' }}
                    value={phoneNumber}
                    onChangeText={value => setPhoneNumber(value)}
                    errorMessage={!phoneRegex.test(phoneNumber) ? "Invalid Phone Number Format" : ""}
                    key={"phone_number"}
                />
                <Button
                    disabled={!isSubmitValid()}
                    title="Create Account"
                    onPress={() => {
                        handleSubmit();
                    }}
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{
                        backgroundColor: "green"
                    }}
                    containerStyle={{
                        marginBottom: 'auto',
                        marginTop: 40,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 200
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default ScreenSignUp;