import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import Voice from "@react-native-voice/voice";

interface SpeechTextProps {
    icon?: React.ReactNode
    recordingTimeout?: Number
}

export const SpeechText: React.FC<SpeechTextProps> = ({ icon }) => {
    const Icon: React.ReactNode = useMemo(() => icon, [icon]);
    const [speechText, setSpeechText] = useState<string[]>([]);
    const [timer, setTimer] = useState<any>();

    const handleResult = useCallback(({ value }) => {
        setSpeechText(value)
    }, [setSpeechText]);

    const handleFinalResult = useCallback(({ value }) => {
        setSpeechText(value)
        clearInterval(timer)
    }, [timer, setSpeechText]);

    const handleMonitorRecording = useCallback(() => {
        if (!Voice.isRecognizing()) {
            clearInterval(timer)
        }
    }, [timer, Voice]);

    const handleStartRecording = useCallback(() => {
        const timerId = setInterval(handleMonitorRecording);
        setTimer(timerId);
    }, [setTimer, Voice]);

    useEffect(() => {
        Voice.onSpeechPartialResults = handleResult
        Voice.onSpeechResults = handleFinalResult
        Voice.onSpeechStart = handleStartRecording
    }, [handleResult, Voice]);

    return (
        <View style={styles.container}>
            {icon && Icon}
            <TextInput style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    input: {
        flex: 1,
    }
})