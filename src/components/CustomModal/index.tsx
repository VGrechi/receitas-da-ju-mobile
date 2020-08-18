import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

interface CustomModalProps {
    isVisible: boolean;
    title: string;
    children: ReactNode;
    cancelCallback: Function;
    confirmCallback: Function;
    cancelText: string;
    confirmText: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({ isVisible, title, children, cancelCallback, confirmCallback, cancelText, confirmText }) => {

    function handleCancel(){
        cancelCallback();
    }

    function handleConfirm(){
        confirmCallback();
    }

    return (
        <Modal isVisible={isVisible} onBackButtonPress={handleCancel} coverScreen={true}>
            <View style={styles.modal}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.content}>
                    {children}
                </View>

                <View style={styles.footer}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleCancel}>
                            <Text style={styles.buttonText}>{cancelText.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text style={styles.buttonText}>{confirmText.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default CustomModal;