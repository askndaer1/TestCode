import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Card from './Card';
import { Colors } from './constant';
import Text from "../component/Text"
import Fade from '@components/Animations/Fade'
const CategoryCard = ({ item, navigation }) => {
    return (
        <Card onPress={() => { navigation.push('Product', { categoryCode: item.categoryCode, categoryName: item.categoryName }) }}>

            <Image resizeMode="cover" source={{ uri: item.categoryImage }} style={{ width: "100%", height: 200, backgroundColor: '#69d2ff' }} />
            <View style={{ borderRadius: 10, alignSelf: "center", position: "absolute", bottom: 10, backgroundColor: Colors.Primary, width: "94%", height: 30, justifyContent: "space-between" }}>
                <Fade fadeMode={"fadeIn"} delay={300}>
                    <Text style={{ color: Colors.Text2, fontSize: 15, textAlign: "center" }} Bold>
                        {item.categoryName}
                    </Text>
                </Fade>
            </View>

        </Card>
    )
}

export default CategoryCard

const styles = StyleSheet.create({})
