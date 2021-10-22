import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, PanResponder } from 'react-native'
import { SimpleRotationProps } from '@typings';
import AngleUtils from '../../utils/angle';

export const SimpleRotation: React.FC<SimpleRotationProps> = ({
    children,
    accessibilityHint,
    onRotate,
    containerStyle = {},
    viewStyle = {}
}) => {
    const viewRef = useRef<View>()
    const [viewMeasures, setViewMeasures] = useState({
        x: 0, y: 0,
        width: 0, height: 0,
        pageX: 0, pageY: 0
    })
    const draggableXY = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [rotationAngle, setRotationAngle] = useState(0);

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
            draggableXY.setOffset({
                /* @ts-ignore */
                x: draggableXY.x._value,
                /* @ts-ignore */
                y: draggableXY.y._value
            })
            draggableXY.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (_, { dx, dy }) => {
            let angle = AngleUtils.angleBetweenLines(
                viewMeasures.pageX, viewMeasures.pageY,
                viewMeasures.x, viewMeasures.y,
                viewMeasures.pageX, viewMeasures.pageY,
                dx, dy
            )
            setRotationAngle(-angle + rotationAngle)
            return Animated.event([null, {
                dx: draggableXY.x,
                dy: draggableXY.y
            }], { useNativeDriver: true })
        }
    })).current

    useEffect(() => {
        onRotate && onRotate(rotationAngle)
    }, [rotationAngle, onRotate])

    return (
        <View
            style={[{
                margin: 10
            }, containerStyle]}
        >
            <Animated.View
                ref={viewRef}
                style={[{
                    transform: [{
                        rotate: `${rotationAngle}deg`
                    }],
                    alignSelf: "center"
                }, viewStyle]}
                accessibilityHint={accessibilityHint}
                {...panResponder.panHandlers}
                onLayout={(e) => {
                    viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
                        setViewMeasures({ x, y, width, height, pageX, pageY })
                    })
                }}
            >
                {children}
            </Animated.View>
        </View >
    )
}
