import React, { Component } from 'react';
import * as ReactNative from "react-native";
import { SpeechStartEvent } from '@react-native-voice/voice';

export interface SeekBarZoomProps extends ReactNative.ViewProps {
    containerStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>
}

export class SeekBarZoom extends Component<SeekBarZoomProps> { }

export interface SpeechToTextProps extends ReactNative.ViewProps {
    /**
     * Element to be shown as the recording icon
     */
    icon?: React.ReactNode
    /**
     * Interval(in milliseconds) to verify if still recording
     */
    interval?: number
    /**
     * If `true`, the text field will be multiline
     */
    multiline?: boolean

    /**
     * Callback for when speech recognition starts
     */
    onStartRecognizing?: (e: SpeechStartEvent) => void

    /**
     * Callback for when an error is thrown
     */
    onError?: (error) => void
}

export class SpeechToText extends Component<SpeechTextProps> { }

export interface SimpleRotationProps extends ReactNative.ViewProps {
    containerStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>
    viewStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>
    /**
     * Callback that receives the angle when the view is rotated
     */
    onRotate?: (angle: number) => void
}

export class SimpleRotation extends Component<SimpleRotationProps>{ }

export interface PinchZoomProps extends ReactNative.ViewProps { }

export class PinchZoom extends Component<PinchZoomProps> { }

export interface TouchZoomProps extends ReactNative.ViewProps { }

export class TouchZoom extends Component<TouchZoomProps> { }