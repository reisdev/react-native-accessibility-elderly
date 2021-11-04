import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, PermissionsAndroid } from 'react-native';
import { PinchZoom, SimpleRotation, SpeechToText, SeekBarZoom } from "react-native-accessibility-elderly";

export default function App() {

  async function verifyPermission() {
    if (Platform.OS == "android") {
      try {
        let hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

        if (!hasPermission) {
          let given = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        }
      } catch (e) { throw e }
    }
  }

  useEffect(() => {
    verifyPermission()
  }, [])

  return (
    <View style={styles.container}>
      <SeekBarZoom containerStyle={styles.container}>
        <SimpleRotation>
          <Image source={require("./assets/favicon.png")} />
        </SimpleRotation>
        <SpeechToText onError={console.log} />
        <Text>213123123</Text>
        <PinchZoom>
          <Text>123123123</Text>
        </PinchZoom>
      </SeekBarZoom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});
