import React from 'react'
import { View, Text, NativeModules } from 'react-native'

const SimpleRotationImage = NativeModules.SimpleRotationImage;
console.log(SimpleRotationImage);
export function SimpleRotation(): React.ReactElement<any> {
    return (
        <View>
            <Text></Text>
        </View>
    )
}
