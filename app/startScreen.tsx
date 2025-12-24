import React from 'react';
import { StyleSheet, ImageBackground, Text, KeyboardAvoidingView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const Start = () => {
  const router = useRouter();

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
          source={require('../assets/images/start-bg.png')}
          style={styles.background} 
        >
          <Text style={styles.text}>
            Welcome to the attention span game! All you need to do is choose an egg of the same color as the text, but there is a limited time, if you choose the wrong color or your time is affected, the chicken is fried. If you see a golden egg, click on it and get x2 to your score. Good luck!
          </Text>

          <Image 
            source={require('@/assets/images/chicken.png')}
            style={{width: 206, height: 226, marginBottom: 7}}
          />

          <TouchableOpacity style={styles.button} onPress={() => router.replace('/playScreen')}>
            <Image
              source={require('@/assets/images/start-button.png')}
              resizeMode='contain'
              style={{height: '100%', width: '100%'}}
            />
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    height: 86,
    width: '80%'
  },
  text: {
    fontFamily: 'Arimo',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 35,
  }
});

export default Start;