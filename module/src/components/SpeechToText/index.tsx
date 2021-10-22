import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    View, TextInput, StyleSheet,
    Alert, PermissionsAndroid, Platform
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Voice from "@react-native-voice/voice";

import { SpeechToTextProps } from '@typings';

export const SpeechToText: React.FC<SpeechToTextProps> = ({
    icon,
    interval = 1000,
    multiline = false,
    onStartRecognizing,
    onError
}) => {
    const Icon: React.ReactNode = useMemo(() => icon, [icon]);
    const [speechText, setSpeechText] = useState<string>("");
    const [timer, setTimer] = useState<any>();
    const [iconColor, setIconColor] = useState("black");
    const [isRecording, setIsRecording] = useState<boolean>(false);

    async function hasPermissions(): Promise<boolean> {
        if (Platform.OS == "android") {
            try {
                const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

                if (!hasPermission) {
                    onError({
                        error: {
                            message: "Missing permission to microphone recording and/or speech recognition"
                        }
                    });
                }
                return Promise.resolve(hasPermission)
            } catch (e) {
                Promise.reject(e)
            }
        } else return Promise.resolve(true)
    }

    const handleResult = useCallback(({ value }) => {
        setSpeechText(value.join(" "))
    }, [setSpeechText]);

    const handleFinalResult = useCallback(({ value }) => {
        setSpeechText(value.join(" "))
        if (timer) {
            clearInterval(timer)
            setTimer(null)
        }
    }, [timer, setSpeechText]);

    const handleMonitorRecording = useCallback(() => {
        Voice.isRecognizing().then((isRecognizing) => {
            if (!isRecognizing) {
                handleStopRecording()
            } else {
                setIconColor(iconColor == "black" ? "red" : "black")
            }
        })
    }, [timer, Voice]);

    const handleStartRecording = useCallback(async () => {
        try {
            if (isRecording) return handleStopRecording()
            else if (!await hasPermissions()) throw Error()

            const isAvailable = await Voice.isAvailable()
            const isRecognizing = await Voice.isRecognizing()

            if (!isAvailable) {
                throw Error("Unavailable recognition service")
            } else if (!isRecognizing && !isRecording) {
                await Voice.start("pt-br");
                setIconColor("red")
                setIsRecording(true);
                if (!timer) {
                    const timerId = setInterval(
                        handleMonitorRecording, interval
                    );
                    setTimer(timerId);
                }
            } else {
                handleStopRecording()
            }
        } catch (e) {
            onError(e)
        }
    }, [setTimer, setIsRecording, isRecording, Voice, Alert]);

    const handleStopRecording = useCallback(async () => {
        try {
            await Voice.stop()
            clearInterval(timer)
            setTimer(null);
            setIconColor("black")
            setIsRecording(false)
        } catch (e) {
            onError(e)
        }
    }, [Voice, timer, setTimer, setIconColor, setIsRecording])

    const handleTypedText = useCallback(({ value }) => {
        setSpeechText(value)
    }, [setSpeechText]);

    useEffect(() => {
        try {
            Voice.onSpeechPartialResults = handleResult
            Voice.onSpeechResults = handleFinalResult
            Voice.onSpeechStart = onStartRecognizing
            Voice.onSpeechError = onError
        } catch (e) {
            onError(e)
        }
    }, [handleResult, handleStartRecording, handleFinalResult, Voice]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleStartRecording()}
                style={styles.icon}
            >
                {icon ? Icon : <FAIcon
                    name="microphone"
                    color={iconColor}
                    style={styles.icon}
                    size={18}
                />}
            </TouchableOpacity>
            <TextInput
                multiline={multiline}
                style={styles.input}
                value={speechText}
                onChange={handleTypedText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
    },
    input: {
        flex: 1,
    },
    icon: {
        flex: 1,
        marginRight: 5
    }
})
