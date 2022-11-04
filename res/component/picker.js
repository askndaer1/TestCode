import { Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import Text from './Text'
const picker = (props) => {
    const [isShow, setIsShow] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [label, setLabel] = useState('');

    useEffect(() => {
        setLabel(props.label);
    }, [props.label])
    return (
        <>
            <View style={{ width: "100%", marginBottom: 20 }}>
                <Text style={{ margin: 5 }}>
                    {props.title}
                </Text>
                <TouchableOpacity onPress={() => { setIsShow(true) }}>


                    <TextInput

                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        value={label}
                        editable={false}
                        placeholderTextColor={"#dedede"}
                        placeholder={"يرجى اختيارالمنطقة"}
                        // keyboardType="numeric"
                        {...props}
                    />
                    <Entypo name="chevron-down" size={24} color="#8f8f8f" style={{ position: "absolute", lineHeight: 40, margin: 5 }} />
                </TouchableOpacity>
            </View>

            <Modal
                presentationStyle={'overFullScreen'}
                animationType="slide"
                transparent={true}
                visible={isShow}
                onShow={() => { setIsBack(true) }}
            >
                {isBack &&
                    <TouchableOpacity style={{ width: "100%", backgroundColor: "#0000004C", position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                        onPress={() => { setIsShow(false) }}
                    />}

                <ScrollView showsVerticalScrollIndicator={false} style={{ height: 400, position: "absolute", bottom: 0, backgroundColor: "#fff", paddingHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}>
                    {props.options.map(item => (
                        <TouchableOpacity key={item.code}
                            onPress={() => { setLabel(item.label); setIsBack(false); setIsShow(false); props.handleToUpdate(item.code, item.label) }}
                        >
                            <View style={{ flexDirection: 'row', height: 45, fontFamily: 'CustomFont', fontSize: 14, lineHeight: 45, width: '100%' }}>
                                <Text style={{ height: 45, fontSize: 14, lineHeight: 45, width: '95%' }}>
                                    {item.label}
                                </Text>
                                <Entypo name="dot-single" size={24} color="black" style={{ marginTop: 10 }} />
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: "#f3f3f3", margin: 10 }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </Modal>

        </>
    )

}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        // margin: 12,
        borderWidth: 1,
        backgroundColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        padding: 10,
        textAlign: "right",
        paddingHorizontal: 20,
        fontFamily: "arabicFont",
        color: "#000"
    }
})
export default picker
