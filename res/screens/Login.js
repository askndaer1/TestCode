import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Screen from '../component/Screen'
import LoadingScreen from '@components/LoadingScreen'
import TextFieldPassword from '../component/TextFieldPassword'
import TextFieldPhone from '../component/TextFieldPhone'
import Button from '../component/Button'
import Divider from '../component/divider'
import { useNavigation } from '@react-navigation/native';
import { withDataStorageContext } from '../Data/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n, ChangeLanguage } from '../Data/lang/i18n'
import Text from "../component/Text"
import { Colors } from '@components/constant'
const Login = (props) => {

    useEffect(() => {

    }, ChangeLanguage)

    const navigation = useNavigation();
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rereander, setrereander] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const doLogin = async () => {
        setLoading(true)
        let Body = {
            "phone": "006" + PhoneNumber,
            "password": password,

        }
        let Login = await Server.doLogin(Body)
        setLoading(false)
        if (Login) {
            //  console.log(Login.user)
            props.DataStorageProvider.setUserInformation(Login.user)
            props.DataStorageProvider.setIslogin("true")
            await AsyncStorage.setItem('@UserInformation', JSON.stringify(Login.user))
            await AsyncStorage.setItem('@Islogin', "true")
        } else {
            props.DataStorageProvider.setMessage({
                message: "Please enter your correct information",
                title: 'notes',
                show: true
            })
        }

    }

    if (rereander == true || rereander == false) { }
    return (
        <Screen isHiddenHeader={true} title={"تسجيل الدخول"}>
            <View style={{ margin: 30, flex: 1, alignItems: 'center' }}>
                <Image resizeMode="cover" source={require('../../assets/icon.png')} style={{ width: 200, height: 200 }} />
                <TextFieldPhone
                    value={PhoneNumber}
                    onChangeText={setPhoneNumber}
                    title={"Phone number"}
                    placeholder={"enter your phone number"}
                />
                <TextFieldPassword
                    value={password}
                    onChangeText={setPassword}
                    title={"Password"}
                    placeholder={"enter your password"}
                />
                <Button
                    onPress={doLogin}
                    title={"LOGIN"}
                />
                <Divider title={"OR"} />

                <Button
                    onPress={() => { navigation.push('Register') }}
                    title={"CREATE ACCOUNT"}
                />


            </View>
            <LoadingScreen show={isLoading} />
            <TouchableOpacity style={{ width: 80, height: 45, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 100, left: 0, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: Colors.Primary }}
                onPress={() => { ChangeLanguage(); setrereander(!rereander) }}

            >
                <Text Bold style={{ color: '#fff', fontSize: 16 }}>{i18n.language}</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default withDataStorageContext(Login)

const styles = StyleSheet.create({})
