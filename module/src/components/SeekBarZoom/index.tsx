import React, { useState } from 'react'
import { View } from 'react-native'
import Slider from "@react-native-community/slider";
import { SeekBarZoomProps } from '@typings';

export const SeekBarZoom: React.FC<SeekBarZoomProps> = ({ children, containerStyle }) => {
    const [scale, setScale] = useState<number>(1.0);
    return (
        <View style={{ width: "100%", flex: 1, alignContent: "center" }}>
            <View style={[{ transform: [{ scale }] }, containerStyle]} >
                {children}
            </View>
            <Slider
                style={{ width: "100%" }}
                minimumValue={1.0}
                maximumValue={4.0}
                step={0.1}
                onValueChange={setScale}
            />
        </View>
    )
}
