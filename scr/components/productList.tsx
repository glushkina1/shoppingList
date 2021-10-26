import React, { useState} from 'react';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {resetProducts} from '../store/action';
import MenuPopUp from './menu'
import {Provider} from "react-native-paper";
import {CUC, RUB, USD} from "../constants/currencies";

export const ProductList = () => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('USD')
    const products = useSelector((state: any) => state.products);
    let totalSum: number = 0;

    const renderPrice = (price: number) => {
        if (currency === 'USD') {
            return  (price * USD).toFixed(2);
        }
        if (currency === 'CUC') {
            return  (price * CUC).toFixed(2);
        } else {
            return  (price * RUB).toFixed(2);
        }
    };
    const renderSum = (sum: number) => {
        if (currency === 'USD') {
            return  (sum * USD).toFixed(2);
        }
        if (currency === 'CUC') {
            return  (sum * CUC).toFixed(2);
        } else {
            return  (sum * RUB).toFixed(2);
        }
    };
    const renderTotalSum = (totalSum: number) => {
        if (currency === 'USD') {
            return  (totalSum * USD).toFixed(2);
        }
        if (currency === 'CUC') {
            return  (totalSum * CUC).toFixed(2);
        } else {
            return  (totalSum * RUB).toFixed(2);
        }
    };
    const renderAveragePrice = (averagePrice: number) => {
        if (currency === 'USD') {
            return  (averagePrice * USD).toFixed(2);
        }
        if (currency === 'CUC') {
            return  (averagePrice * CUC).toFixed(2);
        } else {
            return  (averagePrice * RUB).toFixed(2);
        }
    };


    for (let i = 0; i < products.length; i++) {
        totalSum += products[i].price * products[i].amount
    }

    const averagePrice = (item: any) => {
        let sumForAvrPrice = item.arrayForAveragePrice.reduce(function(accumulator:any, currentValue:any) {
            return accumulator + currentValue;
        }, 0);
        let avgPrice = sumForAvrPrice / item.arrayForAveragePrice.length
        return avgPrice ? avgPrice.toFixed(2) : item.price
    }


    const tableItems = () => {
        if (products.length > 0)
            return <View style={styles.renderRow}>
                <Text style={styles.renderName}>Наименование</Text>
                <Text style={styles.renderNumber}>Цена</Text>
                <Text style={styles.renderNumber}>Кол-во</Text>
                <Text style={styles.renderNumber}>Средняя цена за шт</Text>
                <Text style={styles.renderNumber}>Всего</Text>
            </View>
    }

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.containerItems}>
                    {tableItems()}
                    <FlatList
                        data={products}
                        keyExtractor={item => item.name.toString()}
                        style={{marginBottom: 5}}
                        renderItem={({item}) => (
                            <View style={styles.renderRow}>
                                <Text style={styles.renderName}>{item.name}</Text>
                                <Text style={styles.renderNumber}>{renderPrice(item.price)}</Text>
                                <Text style={styles.renderNumber}>{item.amount} шт</Text>
                                <Text style={styles.renderNumber}>{renderAveragePrice(averagePrice(item))}</Text>
                                <Text style={styles.renderNumber}>{renderSum(item.amount * item.price)}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={{flex: 1}}>
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row',}}>
                        <Text style={{color: 'grey', textAlign: 'center'}}>
                            Чтобы пересчитать в другую валюту, {'\n'} нажмите на меню
                        </Text>
                        <MenuPopUp currency={currency} setCurrency={setCurrency}/>
                    </View>
                    <View style={{justifyContent: 'flex-end', flexDirection: 'row', marginTop: 6,}}>
                        <Text>Сумма за все время</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: '20%',
                            justifyContent: 'space-between',
                            marginLeft: 20,
                        }}>
                            <Text>{renderTotalSum(totalSum)}</Text>
                            <Text>{currency}</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 3}}>
                        <TouchableOpacity onPress={() => dispatch(resetProducts())}>
                            <Text style={styles.textDeleteEverything}>
                                Удалить все данные
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                width: '100%',
                margin: 7,
            },
            web: {
                width: 430,
            },
            android: {
                width: '100%',
            }
        }),
        borderColor: 'black',
        borderWidth: 1,
        margin: 'auto',
        padding: 17,
        minHeight: 260,
        maxHeight: 300,

    },
    containerItems: {
        flex: 2,
    },
    renderRow: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    renderName: {
        flex: 3,
    },
    renderNumber: {
        flex: 1,
        textAlign: 'center'
    },
    textDeleteEverything: {
        color: '#ddd',
        alignItems: 'flex-end'
    }
});

export default ProductList;
