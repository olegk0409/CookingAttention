import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, KeyboardAvoidingView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Play = () => {
  const router = useRouter();
  const [numberOfCoins, setNumberOfCoins] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const coinsData = await AsyncStorage.getItem("numberOfCoins");
          if (coinsData !== null) {
            setNumberOfCoins(JSON.parse(coinsData));
          }
        } catch (error) {
          console.error(error);
        } finally {
        }
      };

      loadItems();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={'padding'}
      keyboardVerticalOffset={0} 
    >
      <StatusBar
        hidden={true}
        backgroundColor="#000"
        barStyle="light-content"
      />

        <ImageBackground 
          source={require('../assets/images/play-bg.png')}
          style={styles.background} 
        >

          <View style={styles.topContainer}>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <Text style={styles.text}>Score:</Text>
              <Text style={[styles.text, {fontSize: 40}]}>{numberOfCoins}</Text>
            </View>

            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Image
                source={require('@/assets/images/buttons/settings.png')}
                style={{width: 53, height: 53}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <Image 
              source={require('@/assets/images/chicken.png')}
              style={{width: 206, height: 226, marginBottom: 7, transform: [{translateY: 50}]}}
            />

            <TouchableOpacity style={styles.button} onPress={() => router.replace('/gameScreen')}>
              <Image
                source={require('@/assets/images/play-button.png')}
                resizeMode='contain'
                style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

    </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '20%',
    paddingBottom: '50%',
    justifyContent: 'space-between',
  },
  button: {
    height: 86,
    width: 209
  },
  text: {
    fontFamily: 'Arimo',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Play;