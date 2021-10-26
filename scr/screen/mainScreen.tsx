import React, {useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ModalScreen from "./modalScreen";
import ProductList from "../components/productList";

const MainScreen = () => {
    const [visible, setVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ProductList/>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Text style={{color: 'white'}}>Добавить трату</Text>
            </TouchableOpacity>
            <ModalScreen isVisible={visible} onSetVisible={(visible: boolean) => setVisible(visible)}/>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 30,
    },
    carLottie: {
        width: 200,
        height: 200,
    },
    button: {
        backgroundColor: '#0074D9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        position: 'absolute',
        right: 130,
        bottom: 50,
        height: 27,
        ...Platform.select({
            ios: {
                width: 50,
                margin: 7,
            },
            web: {
                minWidth: 200,
            },
            android: {
                width: 50,
            }
        }),
    },
});


export default MainScreen;
