import React, {useState} from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {saveProduct} from '../store/action';
import {useDispatch} from 'react-redux';
import MenuPopUp from './menu'
import {RUB, CUC} from "../constants/currencies"

type Props = {
    onHideModal: () => void;
}

const NewProduct = (props: Props) => {
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [showError, setShowError] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const dispatch = useDispatch();

    let arrayForAveragePrice: number[] = [];

    const convertToUsd = () => {
        if (currency === 'RUB') {
            return (parseFloat(price) / RUB).toFixed(2).toString();
        }
        if (currency === 'CUC') {
            return (parseFloat(price) / CUC).toFixed(2).toString();
        } else {
            return price;
        }
    }

    const upperCase = (text: string) => {
        setNameProduct(text.charAt(0).toUpperCase() + text.slice(1))
    }

    const regExDot = (text: string) => {
        let match = text.match(/[\d]+[.]?[\d]*/g) || []
            if(match.length) {
                let str = match[0];
                if (str.length > 3) {
                    if (str[str.length - 4] === '.') {
                        str = price;
                    }
                }
                setPrice(str)
        } else {
                setPrice(' ')
        }
    }



    const subtractAmount = () => {
        if (amount === '') {
            setAmount('0')
        } else if (parseInt(amount) > 0) {
            setAmount((parseInt(amount) - 1).toString())
        }
    }

    const addAmount = () => {
        if (amount === '') {
            setAmount('1')
        } else {
            setAmount((parseInt(amount) + 1).toString())
        }
    }


    const handleProduct = () => {
        if (nameProduct && price && parseFloat(amount) > 0) {
            const price = convertToUsd()
                let newProduct = {
                    name: nameProduct,
                    price: price,
                    amount: amount,
                    currency: 'USD',
                    arrayForAveragePrice: arrayForAveragePrice,
            }
            dispatch(saveProduct(newProduct))
            props.onHideModal()
        } else {
            setShowError(true)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Text>Название товара</Text>
                <View style={styles.borderInputName}>
                    <TextInput
                        value={nameProduct}
                        onChangeText={text => upperCase(text)}
                        style={styles.textInputNamePrice}
                    />
                </View>
            </View>
            <View style={styles.input}>
                <Text>Цена</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:105}}>
                    <View style={styles.borderInputPrice}>
                        <TextInput
                            placeholder={'0.0'}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#ddd'}
                            style={styles.textInputNamePrice}
                            value={price}
                            onChangeText={text => regExDot(text)}
                        />
                    </View>
                    <MenuPopUp currency={currency} setCurrency={setCurrency}/>
                </View>
            </View>
            <View style={styles.inputNButtons}>
                <Text>Количество</Text>
                <View style={{flexDirection: 'row', width: 105, justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.knopa} onPress={subtractAmount}>
                        <Text style={styles.knopaText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.borderInputAmount}>
                        <TextInput
                            placeholder={'0'}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#ddd'}
                            value={amount}
                            onChangeText={text => setAmount(text.replace(/[^0-9]/g, '').toString())}
                            style={styles.textInputAmount}
                        />
                    </View>
                    <TouchableOpacity style={styles.knopa} onPress={addAmount}>
                        <Text style={styles.knopaText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showError && <Text style={{color: 'red'}}>Error, fill in all the fields</Text>}
            <View style={styles.okCancelBtns}>
                <TouchableOpacity style={styles.borderBtn} onPress={() => handleProduct()}>
                    <Text>Сохранить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.borderBtn} onPress={() => props.onHideModal()}>
                    <Text>Отмена</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    borderInputName: {
        width: 105,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    borderInputPrice: {
        width: 60,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    input: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputNamePrice: {
        maxWidth: 100,
        minWidth: 50,
        textAlign: 'right',
        paddingRight: 5,
    },
    textInputAmount: {
        maxWidth: 30,
        minWidth: 10,
        textAlign: 'center',
    },
    knopa: {
        borderRadius: 7,
        minWidth: 25,
        minHeight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    knopaText: {
        color: 'white',
        paddingBottom: 3,
    },
    okCancelBtns: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    borderBtn: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputNButtons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    borderInputAmount: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,

    },
});


export default NewProduct;
