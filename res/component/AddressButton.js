import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from "@components/Text"
import { Entypo } from '@expo/vector-icons';
import { Colors } from '@components/constant'
import * as Location from 'expo-location';
const AddressButton = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    const GetCurrentLocation = async () => {
        setIsLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            setIsLoading(false)
        }

        let { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, accuracy: Location.Accuracy.BestForNavigation, timeout: 6000 });

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            console.log(coords);
            console.log(response);
            setIsLoading(false)
            for (let item of response) {
                let address = `${item.name}, ${item.street}`;
                props.Address(address)
                props.co(item.postalCode, item.city)
                //   setDisplayCurrentAddress(address);
            }
        }
        setIsLoading(false)
    }

    return (
        <TouchableOpacity onPress={GetCurrentLocation}
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Primary, padding: 10, borderRadius: 5, marginBottom: 20 }}>
            {isLoading && <ActivityIndicator size='small' color="#fff" style={{ paddingHorizontal: 10 }} />}
            <Text Bold style={{ fontSize: 16, color: "#f3f3f3" }}>تحديد العنوان من خلال الموقع</Text>
            <Entypo name="location" size={20} color="#f3f3f3" style={{ paddingHorizontal: 10 }} />
        </TouchableOpacity>
    )
}

export default AddressButton

const styles = StyleSheet.create({})
