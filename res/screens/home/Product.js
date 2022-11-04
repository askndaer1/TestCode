import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native'
import Screen from '@components/Screen'
import Card from '../../component/Card'
import { Colors, Currency, Category, Shadow } from '@components/constant'
import { withDataStorageContext } from '../../Data/context'
import Text from "@components/Text"
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Product = (props) => {
    const [loading, setLoading] = useState(false);
    const [ProductList, setProductList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const { categoryCode, categoryName } = props.route.params;

    const HandleRefresh = () => {
        setLoading(true);
        doGetProduct()
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }


    useEffect(() => {
        doGetProduct()
    }, [])

    const doGetProduct = async () => {
        setLoading(true);
        let Product = await Server.getProduct(categoryCode)
        // console.log("=========>Product")
        console.log(Product)
        if (Product) {
            setProductList(Product.Products)
            setLoading(false)
        }
        setLoading(false)
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
        return (<View key={item.productID} style={[{ overflow: 'hidden', margin: 10, flex: 1, height: 320, backgroundColor: "#fff", borderRadius: 10 }, Shadow]}>
            <Image resizeMode="cover" source={{ uri: item.productImg1 }} style={{ width: "100%", height: 180, backgroundColor: Colors.Primary }} />
            <View style={{ height: 60, backgroundColor: "#f9f9f9", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", }}>{item.productName}</Text>
            </View>
            <View style={{ paddingHorizontal: 10, height: 40, backgroundColor: "#2980b9", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                <Text style={{ color: '#fff', }}>{item.productQuantity}</Text>
                <Text translate={false} style={{ color: '#fff', }}>RM {item.productPrice}</Text>
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
        <Screen loading={loading} title={categoryName}>
            <View style={{ flex: 1, paddingBottom: 70 }}>
                {categoryCode == 'c15' &&
                    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, height: 60, width: "94%", backgroundColor: "#00b894", margin: 20, alignItems: "center", justifyContent: "center", alignSelf: 'center' }}>

                        <Text style={{ color: '#fff', flexGrow: 1 }} >If you request any service, you will be contacted by phone</Text>
                        <AntDesign name="infocirlce" size={24} color="#fff" style={{ margin: 10 }} />
                    </View>
                }
                <FlatList

                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.productID}
                    data={ProductList}
                    renderItem={renderItem}
                    numColumns={2}
                    onEndReachedThreshold={.3}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={HandleRefresh}
                        />
                    }
                />
            </View>
        </Screen>
    )
}

export default withDataStorageContext(Product)
