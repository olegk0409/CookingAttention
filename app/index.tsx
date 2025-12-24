import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PreLoader = () => {
  const [currentTiming, setCurrentTiming] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (currentTiming === 0) {
        setCurrentTiming(1);
        return;
      }
      if (currentTiming === 1) {
        setCurrentTiming(2);
        return;
      }
      if (currentTiming === 2) {
        setCurrentTiming(3);
        return;
      }
      if (currentTiming === 3) {
        setCurrentTiming(0);
        return;
      }
    }, 500);
  }, [currentTiming]);

  useEffect(() => {
    setTimeout(() => router.replace("/startScreen"));
  }, []);

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
          source={require("../assets/images/Preloader.png")}
          style={styles.background}
        >
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: "0%",
              }}
            >
              <Text style={styles.text}>Loading</Text>
              <Text style={[styles.dot, currentTiming < 1 && { opacity: 0 }]}>
                .
              </Text>
              <Text style={[styles.dot, currentTiming < 2 && { opacity: 0 }]}>
                .
              </Text>
              <Text style={[styles.dot, currentTiming < 3 && { opacity: 0 }]}>
                .
              </Text>
            </View>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 30,
    width: "100%",
  },
  text: {
    fontSize: 40,
    fontWeight: 500,
    marginBottom: 100,
    color: "white",
  },
  dot: {
    color: "white",
    fontSize: 40,
    fontWeight: 500,
    opacity: 1,
  },
});

export default PreLoader;
