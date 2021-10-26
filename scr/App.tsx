import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainScreen from "./screen/mainScreen";
import {Provider} from "react-redux";
import {persistor, store} from "./store/configStore"
import {PersistGate} from 'redux-persist/integration/react'

export default function App() {


    return (
        <View style={styles.container}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainScreen/>
                </PersistGate>
            </Provider>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

