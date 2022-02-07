import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Card, Overlay, Input, Button } from "react-native-elements";
import { updateUserInfo } from "../../utils/util";

/*
    Popup for editing the user's information
    Author: Alec Mathisen
*/
const EditUserInfoModal = ({userInfo, manuallyUpdateUserInfo, open, closeModal}) => {
    const studentIDRegex = /^[0-9]{7}$/;
    const phoneRegex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                    
    const [name, setName] = useState("");
    const [student_id, setStudentID] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if(userInfo !== null){
            setName(userInfo.name)
            setStudentID(userInfo.student_id)
            setPhone(userInfo.phone)
        } else {
            setName("")
            setStudentID("")
            setPhone("")
        }
    }, [userInfo])

    function hasInfoChanged(){
        let changed = false;

        if(userInfo === null)return false;

        if(name !== userInfo.name){
            changed = true;
            if(name === ""){
                return false;
            }
        }

        if(student_id !== userInfo.student_id){
            changed = true;
            if(student_id === ""){
                return false;
            }
            if(!studentIDRegex.test(student_id)){
                return false;
            }
        }

        if(phone !== userInfo.phone){
            changed = true;
            if(phone === ""){
                return false;
            }
            if(!phoneRegex.test(phone)){
                return false;
            }
        }

        return changed;
    }

    function onSubmit(){
        if(!hasInfoChanged()){
            return;
        }

        let data = {
            name: name,
            student_id: student_id,
            phone: phone
        }
        updateUserInfo(data)
        .then((res) => {
            if(res.type !== 'sucess'){
                Alert.alert("Error Updating Info")
            }
            else {
                manuallyUpdateUserInfo(data)
                closeModal();
            }
        })
    }

    return (
        <Overlay isVisible={open} onBackdropPress={() => closeModal()}
            overlayStyle={{
                flex: 1, 
                display: 'flex',
                maxHeight: '50%',
            }}
        >
            <View
                style={{
                   flex: 1,
                   marginTop: 20                      
                }}
            >
                <ScrollView>
                    <Input
                        label={"Name"}
                        autoComplete='name'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        value={name}
                        onChangeText={value => setName(value)}
                        containerStyle={{
                            width: 300
                        }}
                        key={"name"}
                    />
                    <Input
                        label={"Student ID"}
                        autoComplete='off'
                        keyboardType="number-pad"
                        leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                        value={student_id}
                        onChangeText={value => setStudentID(value)}
                        errorMessage={!studentIDRegex.test(student_id) ? "Invalid Student ID" : ""}
                        key={"student_id"}
                    />
                    <Input
                        label={"Phone Number"}
                        autoComplete='tel'
                        keyboardType='number-pad'
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        value={phone}
                        onChangeText={value => setPhone(value)}
                        errorMessage={!phoneRegex.test(phone) ? "Invalid Phone Number Format" : ""}
                        key={"phone_number"}
                    />

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        key={"buttons"}
                    >
                        <Button
                            disabled={!hasInfoChanged()}
                            buttonStyle={{
                                backgroundColor: 'green',
                                paddingHorizontal: 15
                            }}
                            containerStyle={{
                                marginRight: 5
                            }}
                            title={"Save"}
                            onPress={() => onSubmit()}
                        />
                        <Button
                            buttonStyle={{
                                backgroundColor: 'red'
                            }}
                            onPress={closeModal}
                            title={"Cancel"}
                        />
                    </View>
                </ScrollView>
            </View>
        </Overlay>
    );
};

export default EditUserInfoModal;