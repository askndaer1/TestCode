import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/Text'
import { withDataStorageContext } from '../../Data/context'
import { Colors, Currency, Category, Shadow } from '@components/constant'
import TextFieldSearch from '@components/TextFieldSearch'
const SearchProduct = (props) => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [ProductList, setProductList] = useState([]);

    const doGetProductName = async () => {

        if (search.length < 2)
            return;
        let Product = await Server.getProductName(search)

        //  console.log(Product)
        if (Product) {
            setProductList(Product.Products)

        }

    }

    const addToCart = async (item, Op, Qu) => {
        props.DataStorageProvider.AddToCart(item, Op, Qu)
    }

    const checkQuantity = (productID) => {
        const List = props.DataStorageProvider.Cart
        const newData = List.filter(item => { return item.productID == productID })
        //  console.log(newData)
        if (newData.length > 0) { return newData[0].productQuantity } else return 0
    }

    const renderItem = ({ item, index }) => {
        let x = checkQuantity(item.productID)
        return (<View style={[{ overflow: 'hidden', margin: 10, flex: 1, height: 320, backgroundColor: "#fff", borderRadius: 10 }, Shadow]}>
            <Image resizeMode="cover" source={{ uri: item.productImg1 }} style={{ width: "100%", height: 180, backgroundColor: Colors.Primary }} />
            <View style={{ height: 60, backgroundColor: "#f9f9f9", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", }}>{item.productName}</Text>
            </View>
            <View style={{ paddingHorizontal: 10, height: 40, backgroundColor: "#2980b9", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                <Text style={{ color: '#fff', }}>{item.productQuantity}</Text>
                <Text style={{ color: '#fff', }}>RM {item.productPrice}</Text>
            </View>
            {x == 0 ?
                <TouchableOpacity
                    onPress={() => addToCart(item, "add", x)}
                    style={{ paddingHorizontal: 10, height: 40, backgroundColor: "#2c3e50", flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{ color: '#fff', }} >ADD</Text>

                </TouchableOpacity>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center", width: 40, height: 40, backgroundColor: "#e74c3c" }}
                        onPress={() => addToCart(item, "minus", x)}>
                        <Entypo name="minus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text Bold style={{ lineHeight: 40, fontSize: 16 }}>{x}</Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center", width: 40, height: 40, backgroundColor: "#27ae60" }}
                        onPress={() => addToCart(item, "add")}>
                        <Entypo name="plus" size={24} color="#fff" />
                    </TouchableOpacity>

                </View>

            }
        </View>)
    };



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30 }}>

                <View style={{ marginBottom: 10 }}>
                    <Text Bold style={{ fontSize: 18, textAlign: 'center' }}>Find a product</Text>
                    <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
                        <Entypo name="cross" size={40} color="#8a8a8a" />
                    </TouchableOpacity>
                </View>


                <TextFieldSearch
                    // title={"الاسم كامل"}
                    placeholder={"Please write the product name"}
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={doGetProductName}
                    autoFocus={true}
                />


                <FlatList

                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.productID}
                    data={ProductList}
                    renderItem={renderItem}
                    numColumns={2}
                    onEndReachedThreshold={.3}

                />

            </View>
        </View>
    )
}

export default withDataStorageContext(SearchProduct)
const styles = StyleSheet.create({})
