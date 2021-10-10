import React, { Component } from 'react';
import * as ReactNative from "react-native";

export interface SeekBarZoomProps extends ReactNative.ViewProps { }

export class SeekBarZoom extends Component<SeekBarZoomProps> { }

export interface SpeechTextProps extends ReactNative.ViewProps {
    /**
     * Element to be shown as the recording icon
     */
    icon?: React.ReactNode
}

export class SpeechText extends Component<SpeechTextProps> { }

export interface SimpleRotationProps extends ReactNative.ViewProps {
    radius?: number
}

export class SimpleRotation extends Component<SimpleRotationProps>{ }

export interface PinchZoomProps extends ReactNative.ViewProps { }

export class PinchZoom extends Component<PinchZoomProps> { }

export interface TouchZoomProps extends ReactNative.ViewProps { }

export class TouchZoom extends Component<TouchZoomProps> { }