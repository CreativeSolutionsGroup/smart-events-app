import React from "react";
import { Overlay } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
/*
    Popup for User's QR Code
    Author: Alec Mathisen
*/
const UserQRCodeModal = ({uid, name, student_id, phone, open, closeModal}) => {

    return (
        <Overlay 
            isVisible={open} onBackdropPress={() => closeModal()}
            overlayStyle={{
                maxHeight: '60%',
            }}
        >
           <QRCode
                value={JSON.stringify({
                    user_id: uid === undefined ? "Error" : uid,
                    name: name === undefined ? "Error" : name,
                    student_id: student_id === undefined ? "Error" : student_id,
                    phone: phone === undefined ? "Error" : phone,
                })}
                size={200}
            />
        </Overlay>
    );
};

export default UserQRCodeModal;