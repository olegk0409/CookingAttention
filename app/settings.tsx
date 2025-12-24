import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Settings = () => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const router = useRouter();

    if (isWebViewVisible) {
    return (
      <SafeAreaView style={{flex: 1, position: 'relative',}}>
        <TouchableOpacity onPress={() => setIsWebViewVisible(false)}
          style={{position: 'absolute', top: '5%', right: '6%', zIndex: 10, width: 60, height: 35,
          backgroundColor: '#1B1B1B', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
        >
          <Text style={{color: 'white'}}>Close</Text>
        </TouchableOpacity>

        <View style={{flex: 1, backgroundColor: 'white', paddingTop: '5%'}}>
          <WebView
          source={{ uri: 'https://github.com/olegk0409' }}
          style={{ flex: 1 }}
        />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={"padding"}
        keyboardVerticalOffset={0}
      >
        <StatusBar
          hidden={true}
          backgroundColor="#000"
          barStyle="light-content"
        />

        <ImageBackground
          source={require("../assets/images/start-bg.png")}
          style={styles.background}
        >
          <View style={styles.topContainer}>
            <View>
            </View>

            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("@/assets/images/buttons/back.png")}
                style={{ width: 53, height: 53 }}
              />
            </TouchableOpacity>
          </View>

            <TouchableOpacity style={styles.itemsContainer} onPress={() => setIsWebViewVisible(true)}>
              <View style={styles.container}>
                <Text style={styles.text}>Privacy Policy</Text>
                <MaterialIcons name="privacy-tip" size={30} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemsContainer} onPress={() => setIsWebViewVisible(true)}>
              <View style={styles.container}>
                <Text style={styles.text}>Terms Of Use</Text>
                <MaterialIcons name="privacy-tip" size={30} color="white" />
              </View>
            </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: '20%',
  },
    topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
    text: {
    fontFamily: 'Arimo', 
    color: 'white', 
    fontSize: 24
  },
  itemsContainer: {
    backgroundColor: '#FF6A2F',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default Settings;
