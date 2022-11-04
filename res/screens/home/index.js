import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, RefreshControl } from 'react-native';

import Screen from '../../component/Screen'
import Card from '../../component/Card'
import { Colors, Currency, Category } from '../../component/constant'
import CategoryCard from '../../component/CategoryCard'




const App = (props) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [CategoryList, setCategoryList] = useState([]);

    const renderItem = ({ item, index }) => (<CategoryCard navigation={props.navigation} key={index} item={item} />);

    const HandleRefresh = () => {
        setLoading(true);
        doGetAllCategory()
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }


    useEffect(() => {
        doGetAllCategory()
    }, [])

    const doGetAllCategory = async () => {
        setLoading(true);
        let Category = await Server.getAllCategory()
        //  console.log("=========>Category")
        //  console.log(Category)
        if (Category) {
            setCategoryList(Category.category)
            setLoading(false)
        }
        setLoading(false)
    }



    return (
        <Screen props loading={loading} title="Main">
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.categoryID}
                data={CategoryList}
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
            <View style={{ margin: 50 }} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        height: 400,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default App;