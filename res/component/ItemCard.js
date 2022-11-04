import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Card from './Card';
import { Colors } from './constant';
import Text from "../component/Text"

const ItemCard = ({ item }) => {
    return (
        <Card onPress={() => { alert(item.id) }}>
            <Image resizeMode="contain" source={{ uri: item.url }} style={{ marginTop: -4, width: "100%", height: 165 }} />
            <View style={{ backgroundColor: Colors.Seconder, width: "100%", height: 80, justifyContent: "space-between" }}>
                <Text style={{ color: Colors.Text1, fontSize: 15, padding: 10, textAlign: "center" }}>
                    {item.title}
                </Text>
                <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#ecf0f1" }}>
                    <Text style={{ color: Colors.Primary, fontSize: 18 }}>
                        {item.Currency} {item.price}
                    </Text>
                    <Text style={{ color: Colors.Primary, fontSize: 18 }}>
                        {item.size}
                    </Text>
                </View>
            </View>
        </Card>
    )
}

export default ItemCard

const styles = StyleSheet.create({})
