import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { Text, TextField, TextFieldPassword, TextFieldPhone, Button, Picker } from '@components';
import Constants from 'expo-constants';
import { CountryState } from "../component/constant"
import { Colors } from '@components/constant'
import Steps from "@components/steps";
import { withDataStorageContext } from '../Data/context'
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import AddressButton from '@components/AddressButton';


const Register = (props) => {
    const navigation = useNavigation();

    const [ViewSteps, setViewSteps] = useState(0);
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Name, setName] = useState("");

    const [Building, setBuilding] = useState("");
    const [Address, setAddress] = useState("");
    const [Area, setArea] = useState("");
    const [AreaCode, setAreaCode] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordC, setPasswordC] = useState("");
    const [StateCodeSelected, setStateCodeSelected] = useState('');
    const [StateLabel, setStateLabel] = useState('');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [showErrorNumberFound, setShowErrorNumberFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);





    useEffect(() => {
        registerForPushNotificationsAsync().then(token => { setExpoPushToken(token); });
    }, [])

    const handleStatePickOption = (Code, StateLabel) => {
        setAreaCode(Code)
        setArea(StateLabel)
    }


    const doRegister = async () => {
        let Body = {
            "name": Name,
            "email": "askndaer@gmail.com",
            "gender": "",
            "password": Password,
            "building": Building,
            "address": Address,
            "phone": "006" + PhoneNumber,
            "token": expoPushToken,
            "area": Area
        }
        let Login = await Server.doRegister(Body)
        if (Login) {
            props.DataStorageProvider.setUserInformation(Login.user)
            props.DataStorageProvider.setIslogin("true")
            await AsyncStorage.setItem('@UserInformation', JSON.stringify(Login.user))
            await AsyncStorage.setItem('@Islogin', "true")

            setShowSuccessMessage(true)

        }
    }


    const odCheckPhoneNumberExists = async () => {
        let Body = {
            "phone": "006" + PhoneNumber,
        }
        let Login = await Server.odCheckPhoneNumberExists(Body)
        if (Login) {
            return false
        } else
            return true
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            //   console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: Colors.Primary,
            });
        }

        return token;
    }



    const NextStep = async () => {

        setErrorMessage("")
        setShowErrorNumberFound(false)
        if (ViewSteps == 0) {
            if (Name == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("Please write the name")
                setShowLoading(false);
                return
            }

            if (PhoneNumber == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("Please write the phone number")
                setShowLoading(false);
                return
            }


            setShowLoading(true);
            if (await odCheckPhoneNumberExists()) {

                setShowLoading(false);
                setViewSteps(1)
            }

            else {
                setShowErrorNumberFound(true)
                setErrorMessage("This number is already in use")
                setShowLoading(false);
                return
            }
        } else if (ViewSteps == 1) {
            if (Building == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("Please write the name of the building")
                setShowLoading(false);
                return
            }
            if (Address == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("Please wite the address")
                setShowLoading(false);
                return
            }
            if (Area == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("Choose Region")
                setShowLoading(false);
                return
            }
            setShowErrorNumberFound(false)
            setShowLoading(false);
            setViewSteps(2)

        } else if (ViewSteps == 2) {
            setShowErrorNumberFound(false)
            if (Password == '') {
                setShowErrorNumberFound(true)
                setErrorMessage("enter your password")
                setShowLoading(false);
                return
            }

            if (PasswordC != Password) {
                setShowErrorNumberFound(true)
                setErrorMessage("password does not match")
                setShowLoading(false);
                return
            }

            doRegister()
        }
    }

    const ShowUserMessageAndInfo = () => {

        if (showLoading)
            return (<View style={{ height: 50 }}><ActivityIndicator size="large" color="#0000ff" /></View>)
        else if (showErrorNumberFound)
            return (<View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, height: 60, width: "94%", backgroundColor: "#e17055", margin: 0, alignItems: "center", justifyContent: "center", alignSelf: 'center' }}>

                <Text style={{ color: '#fff', flexGrow: 1 }} >{errorMessage}</Text>
                <AntDesign name="infocirlce" size={24} color="#fff" style={{ margin: 10 }} />
            </View>
            )
        else return (<View></View>)
    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {!showSuccessMessage ?
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 30, marginHorizontal: 30 }}>
                        <View style={{ marginBottom: 30 }}>
                            <Text Bold style={{ fontSize: 18, textAlign: 'center' }}>Register a new account</Text>
                            <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                            <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
                                <Entypo name="cross" size={40} color="#8a8a8a" />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ padding: 20 }}>
                        <Steps Current={ViewSteps} />
                    </View>
                    <ShowUserMessageAndInfo />
                    {ViewSteps == 0 &&
                        <View style={{ padding: 20 }}>
                            <TextField
                                title={"Full Name"}
                                placeholder={"Please write your full name"}
                                value={Name}
                                onChangeText={setName}
                            />
                            <TextFieldPhone
                                value={PhoneNumber}
                                onChangeText={setPhoneNumber}
                                title={"Phone number"}
                                placeholder={"enter your phone number"}
                            />



                            <Button
                                onPress={NextStep}
                                title={"next"}
                            />
                        </View>
                    }
                    {ViewSteps == 1 &&
                        <View style={{ padding: 20 }}>

                            <AddressButton Address={setAddress} co={handleStatePickOption} />

                            <TextField
                                value={Building}
                                onChangeText={setBuilding}
                                title={"building's name"}
                                placeholder={"Please write the name of the building"}
                            />
                            <TextField
                                value={Address}
                                onChangeText={setAddress}
                                title={"Address "}
                                placeholder={"Please wite the address"}
                            />

                            <Picker
                                title={"Choose Region"}
                                label={Area}
                                onPress={() => { setStateView(true) }}
                                options={CountryState}
                                handleToUpdate={handleStatePickOption}
                            />


                            <Button
                                onPress={NextStep}
                                title={"next"}
                            />
                        </View>
                    }
                    {ViewSteps == 2 &&
                        <View style={{ padding: 20 }}>
                            <TextFieldPassword
                                value={Password}
                                onChangeText={setPassword}
                                title={"Password"}
                                placeholder={"enter your password"}
                            />
                            <TextFieldPassword
                                value={PasswordC}
                                onChangeText={setPasswordC}
                                title={"Password confirmation"}
                                placeholder={"enter your password"}
                            />

                            <Button
                                onPress={NextStep}
                                title={"تسجيل"}
                            />
                        </View>
                    }
                </View>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <LottieView autoPlay loop={true}
                        style={{
                            width: 200, height: 200
                        }}
                        source={require('../../assets/ok.json')}
                    />
                    <Text Bold style={{ fontSize: 24, color: Colors.Primary }}>successfully registered</Text>
                    <Button
                        onPress={() => { navigation.goBack() }}
                        title={"LOGIN"}
                    />
                </View>}
        </View>
    )
}

export default withDataStorageContext(Register)

const styles = StyleSheet.create({})
