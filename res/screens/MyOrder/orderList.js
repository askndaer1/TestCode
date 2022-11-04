import React from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native'
import Text from '@components/Text'
import { Entypo } from '@expo/vector-icons';
import { Colors } from '@components/constant'
import { Shadow, ReturnDate } from '@components/constant'
const orderList = (props) => {
    const { item } = props.route.params;

    const list = JSON.parse(item.products)
    const renderItem = ({ item, index }) => (
        <View key={index} style={[{ backgroundColor: "#fff", flexDirection: 'row', borderRadius: 15, marginVertical: 10, padding: 10, width: "100%", height: 120, }, Shadow]}>
            <Image resizeMode="cover" source={{ uri: item.productImg1 }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <View style={{ alignItems: 'flex-end', flexGrow: 1, }}>
                <Text Bold translate={false} style={{ fontSize: 18, color: Colors.Primary, margin: 5 }}>{item.productName}</Text>
                <View style={{ flexDirection: 'row', }}>
                    <Text translate={false} style={{ fontSize: 14 }}>{item.productPrice}</Text>
                    <Text translate={false} Bold style={{ fontSize: 14, width: '25%' }}>Price</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Text translate={false} style={{ fontSize: 14 }}>{item.productPrice * item.productQuantity}</Text>
                    <Text Bold style={{ fontSize: 14, width: '25%', marginRight: 30 }}>الاجمالي</Text>
                    <Text translate={false} style={{ fontSize: 14 }}>{item.productQuantity}</Text>
                    <Text Bold style={{ fontSize: 14, width: '25%' }}>الكمية</Text>

                </View>
            </View>
            {/* <Text Bold style={{ fontSize: 18 }}>السعر</Text>
            <Text Bold style={{ fontSize: 18 }}>الكمية</Text>
            <Text Bold style={{ fontSize: 18 }}>الاجمالي</Text> */}

        </View>
    );
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30 }}>


                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Entypo name="cross" size={40} color="#8a8a8a" />
                </TouchableOpacity>
                <View style={{ marginBottom: 30 }}>
                    <Text Bold style={{ fontSize: 18 }}>المنتجات</Text>
                    <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={list}
                    renderItem={renderItem}
                    numColumns={2}
                    onEndReachedThreshold={.3}

                />
                <View style={{ height: 50, borderRadius: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.Primary }}>
                    <Text Bold style={{ fontSize: 18, color: "#fff" }}>RM 160.50</Text>
                    <Text Bold style={{ fontSize: 18, color: "#fff" }}>TOTAL PRICE</Text>
                </View>
            </View>
        </View>
    )
}

export default orderList

const styles = StyleSheet.create({})
