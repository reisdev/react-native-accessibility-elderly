import React, { useState } from 'react'
import { View } from 'react-native'
import Slider from "@react-native-community/slider";

export const SeekBarZoom: React.FC = ({ children }) => {
    const [scale, setScale] = useState<number>(1.0);
    return (
        <View>
            <View style={{ transform: [{ scale }] }} >
                {children}
            </View>
            <Slider
                minimumValue={1.0}
                maximumValue={4.0}
                step={0.1}
                onValueChange={setScale}
            />
        </View>
    )
}
