import React from "react";
import { Overlay, Icon } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import { COLOR_CEDARVILLE_BLUE } from "../../utils/util";

/*
    Popup for Ticket QR Code
    Author: Aidan Graef
*/
const UserQRCodeModal = ({data, open, closeModal}) => {

    return (
        <Overlay 
            isVisible={open} onBackdropPress={() => closeModal()}
            overlayStyle={{
                maxHeight: '60%',
            }}
            windowBackgroundColor={'rgba(100, 0, 0, .5)'}
        >
            {/* <Icon
                iconStyle={{
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }}
                type='font-awesome-5' name='clock' color='black'
            /> */}
            
            <QRCode
                value={JSON.stringify(data)}
                size={200}
            />
        </Overlay>
    );
};

export default UserQRCodeModal;