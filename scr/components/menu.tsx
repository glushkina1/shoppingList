import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Menu, Divider} from "react-native-paper";
import {RUB, CUC} from "../constants/currencies"


type Props = {
    currency: string,
    setCurrency: (currency: string) => void,
}

const MenuPopUp = ({currency, setCurrency}: Props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);



    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity onPress={openMenu}>
                        <Text style={{textAlign: 'center'}}>{currency}</Text>
                    </TouchableOpacity>}
                contentStyle={styles.contentMenuStyle}>
                <Menu.Item
                    style={styles.menuItemStyle}
                    onPress={() => {
                        setCurrency('USD');
                        closeMenu()
                    }} title="USD"/>
                <Divider style={{margin: 3}}/>
                <Menu.Item
                    style={styles.menuItemStyle}
                    onPress={() => {
                        setCurrency('RUB');
                        closeMenu()
                    }} title="RUB"/>
                <Divider style={{margin: 3}}/>
                <Menu.Item
                    style={styles.menuItemStyle}
                    onPress={() => {
                        setCurrency('CUC');
                        closeMenu()
                    }} title="CUC"/>
            </Menu>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: '#ddd',
        width: 42,
        justifyContent:'center',
    },
    contentMenuStyle: {
        height: 88,
        width: 70,
    },
    menuItemStyle: {
        height: 20,
        width: 7,
    }
});


export default MenuPopUp;
