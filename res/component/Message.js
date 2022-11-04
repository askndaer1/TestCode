import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native'
import { withDataStorageContext } from '../Data/context'
import Fade from '@components/Animations/Fade'
import Text from '@components/Text'
const Message = (props) => {
    const { show, title, message } = props.DataStorageProvider.Message

    const Hide = () => {
        props.DataStorageProvider.setMessage((prevState) => ({
            ...prevState,
            show: false,
        }))
    }

    if (show)
        return (

            <View onPress={Hide}
                style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: '#000000CC', justifyContent: 'center', alignItems: 'center' }}
            >
                <Fade fadeMode={"fadeIn"} delay={300} style={{ overflow: 'hidden', backgroundColor: '#fff', borderRadius: 10, width: '90%', minHeight: 150 }}>
                    <View style={{ height: 45, width: '100%', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' }}>
                        <Text Bold>{title}</Text>
                    </View>
                    <View style={{ padding: 20 }}>
                        <Text>{message}</Text>

                    </View>
                    <TouchableOpacity onPress={Hide} style={{ height: 45, width: '100%', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10 }}>
                        <Text Bold style={{ color: '#3498db' }}>اخفاء</Text>
                    </TouchableOpacity>
                </Fade>
            </View>

        )
    else return (<></>)

}

export default withDataStorageContext(Message)

const styles = StyleSheet.create({})
