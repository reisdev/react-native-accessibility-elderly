import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export function SpeechText({ Icon }): React.ReactElement<any> {
    return (
        <View style={styles.container}>
            <Icon />
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