import React, { useCallback, useState } from 'react'
import { View, Animated } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import { PinchZoomProps } from '@typings';

export const PinchZoom: React.FC<PinchZoomProps> = ({ children }) => {
    const baseScale = new Animated.Value(1);
    const pinchScale = new Animated.Value(1);
    const [lastScale, setLastScale] = useState(1);
    const scale = Animated.multiply(baseScale, pinchScale);

    // Handles the pinch event
    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: false }
    );

    // Handle the state change. E.g.: When user stops the pinch
    const onPinchHandlerStateChange = useCallback((event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // TODO: Evaluate if anything needs to be done here
        }
    }, [lastScale, baseScale, pinchScale, setLastScale]);

    return (
        <View style={{ paddingVertical: 10 }}>
            <PinchGestureHandler
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchHandlerStateChange}
            >
                <Animated.View style={[
                    {
                        transform: [{ perspective: 200 }, { scale }],
                    },
                ]}>
                    {children}
                </Animated.View>
            </PinchGestureHandler>
        </View>
    )
}
