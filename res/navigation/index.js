import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Product from '../screens/home/Product';
import SearchProduct from '../screens/home/SearchProduct';
import MyOrder from '../screens/MyOrder';
import OrderDetails from '../screens/MyOrder/orderDetails';
import OrderList from '../screens/MyOrder/orderList';

import Cart from '../screens/cart/Cart';
import ShippingAddress from '../screens/cart/ShippingAddress';
import OrderMessage from '../screens/MyOrder/OrderMessage';
import Help from '../screens/Help';
import MyAccount from '../screens/MyAccount';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register';
import React, { useEffect } from 'react'
import { Colors, Shadow } from '../component/constant';
import { View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Message from '../screens/Message';
import Text from '../component/Text';
import { withDataStorageContext } from '../Data/context'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProductStack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainNavigation = (props) => {

    // Product
    useEffect(() => {
        async function SetData() {
            const UserInformation = await AsyncStorage.getItem('@UserInformation')
            if (UserInformation != null) {
                props.DataStorageProvider.setIslogin("true")
                props.DataStorageProvider.setUserInformation(JSON.parse(UserInformation))
            }
        }
        SetData();
    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode={'none '}
            >
                <Stack.Screen name="Tab" component={MyTab} />
                <Stack.Screen name="orderDetails" component={OrderDetails} />
                <Stack.Screen name="orderList" component={OrderList} />
                <Stack.Screen name="Cart" component={CartStackScreen} />
                <Stack.Screen name="OrderMessage" component={OrderMessage} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="SearchProduct" component={SearchProduct} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default withDataStorageContext(MainNavigation)

function ProductStackScreen() {
    return (
        <ProductStack.Navigator
            headerMode={'none '}
        >
            <ProductStack.Screen name="Home" component={Home} />
            <ProductStack.Screen name="Product" component={Product} />
        </ProductStack.Navigator>
    );
}

function CartStackScreen() {
    return (
        <ProductStack.Navigator
            headerMode={'none '}
        >
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="ShippingAddress" component={ShippingAddress} />

        </ProductStack.Navigator>
    );
}



function MyTab() {
    return (

        <Tab.Navigator
            initialRouteName={'Home3'}
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "#70d4ff",
                    // borderTopLeftRadius: 30,
                    // borderTopRightRadius: 30,
                    height: 70,
                    borderTopWidth: 3,
                    borderTopColor: Colors.Primary
                }
            }}
        >
            <Tab.Screen name="MyOrder" component={MyOrder}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="history" size={24} color={focused ? Colors.MenuON : Colors.MenuOFF} style={{ width: 25, height: 25 }} />
                            <Text style={{ color: focused ? Colors.MenuON : Colors.MenuOFF, fontSize: 12 }}>MY ORDERS</Text>
                        </View>
                    )
                }}

            />
            <Tab.Screen name="Home2" component={Message}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center', fontFamily: 'Montserrat' }}>
                            <MaterialIcons name="message" size={24} color={focused ? Colors.MenuON : Colors.MenuOFF} style={{ width: 25, height: 25 }} />
                            {/* <Image source={require('../../assets/icon.png')} style={{ width: 25, height: 25}} /> */}
                            <Text style={{ color: focused ? Colors.MenuON : Colors.MenuOFF, fontSize: 12 }}>MESSAGES</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Home3" component={ProductStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[{ borderWidth: .2, borderColor: "#fff", backgroundColor: focused ? "#227093" : Colors.Primary, width: 60, height: 60, borderRadius: 35, marginTop: -50, justifyContent: "center", alignItems: "center" }, Shadow]}>
                            <AntDesign name="home" size={24} color={focused ? "#fff" : "#fff"} style={{ width: 25, height: 25 }} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Home4" component={Help}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo name="help" size={24} color={focused ? Colors.MenuON : Colors.MenuOFF} style={{ width: 25, height: 25 }} />
                            <Text style={{ color: focused ? Colors.MenuON : Colors.MenuOFF, fontSize: 12 }}>HELP</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Home5" component={MyAccount}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="account" size={24} color={focused ? Colors.MenuON : Colors.MenuOFF} style={{ width: 25, height: 25, }} />
                            <Text style={{ color: focused ? Colors.MenuON : Colors.MenuOFF, fontSize: 12 }}>MY ACCOUNT</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>

    );
}
