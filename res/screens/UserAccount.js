import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, TouchableOpacity
} from 'react-native'
import { withDataStorageContext } from '../Data/context'
import Button from '../component/Button'
import Text from "../component/Text"
import TextField from '../component/TextField'
import Screen from '../component/Screen'
import { Colors } from '@components/constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n, ChangeLanguage } from '../Data/lang/i18n'
const UserAccount = (props) => {
    const [UserInformation, setUserInformation] = useState("");
    const [rereander, setrereander] = useState(false);
    useEffect(() => {
        setUserInformation(props.DataStorageProvider.UserInformation)
    }, [])


    const doLogout = async () => {
        // const jsonValue = await AsyncStorage.getItem('@UserInformation')
        // console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
        props.DataStorageProvider.setUserInformation([])
        props.DataStorageProvider.setIslogin(false)
        await AsyncStorage.removeItem('@UserInformation')
        await AsyncStorage.removeItem('@Islogin')
        await AsyncStorage.removeItem('@MySuperStore:access_token')
    }


    return (
        <Screen title={"Personal information"}>
            <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
                <TextField
                    title={"Full Name"}
                    // placeholder={"يرجى كتاب الاسم بكامل"}
                    value={UserInformation.name}
                    editable={false}
                // onChangeText={setName}
                />
                <TextField
                    title={"Phone number"}
                    // placeholder={"يرجى كتاب الاسم بكامل"}
                    value={UserInformation.phone}
                    editable={false}
                // onChangeText={setName}
                />
                {/* <TextField
                    title={"البريد الالكتروني"}
                    placeholder={"يرجى كتاب الاسم بكامل"}
                    value={UserInformation.email}
                    editable={false}
                // onChangeText={setName}
                /> */}
                <TextField
                    title={"Address"}
                    // placeholder={"يرجى كتاب الاسم بكامل"}
                    value={UserInformation.address}
                    editable={false}
                // onChangeText={setName}
                />

                <Button
                    onPress={doLogout}
                    title={"SIGN OUT"}
                />
            </View>
            <TouchableOpacity style={{ width: 80, height: 45, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 100, left: 0, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: Colors.Primary }}
                onPress={() => { ChangeLanguage(); setrereander(!rereander) }}

            >
                <Text Bold style={{ color: '#fff', fontSize: 16 }}>{i18n.language}</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default withDataStorageContext(UserAccount)

const styles = StyleSheet.create({})
