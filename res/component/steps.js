// import i18n from 'i18n-js';
import React from 'react';
import { View } from 'react-native';
import Steps from 'react-native-steps';
let Step = ["1", "2", "3"]
const labelsAr = ["1", "2", "3"]
import { Colors } from './constant';
const configs = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.Primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.Primary,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.Primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.Primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.Primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: Colors.Primary,
    labelStyle: {
        fontFamily: 'arabicFontBold'
    }
};



export default function stpes(props) {




    return (
        <View style={{ width: '100%' }}>
            <Steps
                configs={configs}
                current={props.Current}
                // labels={Step}
                // labels={i18n.locale == "en" ? labels : labelsAr}
                reversed={true}
                count={3}


            />
        </View>
    )
}
