import React, { useState } from 'react'
import { Keyboard, StyleSheet, View, TouchableOpacity } from 'react-native'
import Text from "../component/Text"
import TextField from '../component/TextField'
import TextFieldPassword from '../component/TextFieldPassword'
import TextFieldPhone from '../component/TextFieldPhone'
import Screen from '../component/Screen'
import { useIsFocused } from '@react-navigation/native';
import Picker from "../component/picker";
import { CountryState } from "../component/constant"
import { Colors } from '@components/constant'
import { withDataStorageContext } from '../Data/context'
import Register from './Register'
import Login from './Login'
import UserAccount from './UserAccount'

import Payment from './payment'


const MyAccount = (props) => {

    const [PhoneNumber, setPhoneNumber] = useState("");
    const [StateCodeSelected, setStateCodeSelected] = useState('');
    const [StateLabel, setStateLabel] = useState('');

    const handleStatePickOption = (Code, StateLabel) => {
        setStateCodeSelected(Code)
        setStateLabel(StateLabel)
    }

    const odLogin = async () => {
        let Body = {
            "phone": '0060183908955',
            "password": '123456',

        }
        let Login = await Server.doLogin(Body)
        //  console.log(Login)
    }


    if (!useIsFocused())
        Keyboard.dismiss()

    // alert(props.DataStorageProvider.isLogin)
    if (props.DataStorageProvider.isLogin == "true") {
        return (
            <UserAccount />
        )
    } else {
        return (
            <Login props={props} />

        )
    }

    // return (
    //     <Screen title={"حسابي"}>
    //         <View style={{ padding: 20 }}>

    //             <TextField
    //                 title={"الاسم كامل"}
    //                 placeholder={"يرجى كتاب الاسم بكامل"}
    //             />
    //             <TextField
    //                 title={"العنوان بكامل"}
    //                 placeholder={"يرجى كتاب العنوان بكامل"}
    //             />
    //             <Picker
    //                 title={"اختر المنطقة"}
    //                 onPress={() => { setStateView(true) }}
    //                 options={CountryState}
    //                 handleToUpdate={handleStatePickOption}
    //             />
    //             <TextFieldPassword
    //                 title={"كلمة السر"}
    //                 placeholder={"يرجى كتاب الاسم بكامل"}
    //             />
    //             <TextFieldPhone
    //                 value={PhoneNumber}
    //                 onChangeText={setPhoneNumber}
    //                 title={"رقم الهاتف"}
    //                 placeholder={"يرجى كتاب رقم الهاتف"}
    //             />
    //             <TouchableOpacity
    //                 onPress={odLogin}
    //                 style={{ justifyContent: "center", alignItems: "center", borderRadius: 25, backgroundColor: Colors.Primary, width: "80%", height: 50, marginTop: 30, alignSelf: 'center' }}>
    //                 <Text Bold style={{ fontSize: 14, color: "#fff" }}>تسجيل</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </Screen>
    // )
}

export default withDataStorageContext(MyAccount)

const styles = StyleSheet.create({ container: { flex: 1, } })
