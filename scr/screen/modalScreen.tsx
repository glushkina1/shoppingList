import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';
import NewProduct from "../components/newProduct";

const ModalScreen = (props: any) => {
    const {isVisible, onSetVisible} = props;

    return (
        <Provider>
            <Portal>
                <Modal visible={isVisible} onDismiss={() => onSetVisible(false)} style={styles.modal}
                       contentContainerStyle={{elevation: 0}}>
                    <View style={styles.modalView}>
                        <NewProduct onHideModal={() => onSetVisible(false)}/>
                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
};


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    modalView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        margin: 'auto',
        borderRadius: 15,
        padding: 10,
        height: 170,
        width: 270,
    },
});

export default ModalScreen;
