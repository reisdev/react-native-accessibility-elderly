import Slider from '@react-native-community/slider'
import React from 'react'
import { View } from 'react-native'

export function SeekBarZoom({ children }): React.ReactElement<any> {
    return (
        <View>
            {children}
            <Slider minimumValue={0.1} maximumValue={4.0} />
        </View>
    )
}
