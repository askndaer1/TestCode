import React from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@components/constant'
import Text from '@components/Text'
const Message = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, paddingTop: 60 }}>
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView autoPlay loop={true}
                        style={{
                            width: 200, height: 200


                        }}
                        source={require('../../../assets/ok.json')}
                    />
                </View>
                <Text Bold style={{ fontSize: 40, color: Colors.Primary, textAlign: 'center' }}>تم ارسال طلبك بنجاح</Text>
                <Text Bold style={{ fontSize: 20, color: "#bdc3c7", textAlign: 'center' }}>يمكنك متابعة الطلب من قائمة طلباتي</Text>
            </View>

            <TouchableOpacity
                onPress={() => { navigation.popToTop() }}
                style={{ justifyContent: "center", alignItems: "center", borderRadius: 25, backgroundColor: Colors.Primary, width: "80%", height: 50, marginTop: 30, alignSelf: 'center' }}>
                <Text style={{ fontSize: 18, color: "#fff" }}>العودة</Text>
            </TouchableOpacity>
            <LottieView autoPlay

                style={{
                    width: windowWidth,
                    height: 400,
                    bottom: 0, position: 'absolute',
                }}
                source={require('../../../assets/der.json')}
            />
        </View>
    )
}

export default Message
