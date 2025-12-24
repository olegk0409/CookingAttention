import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");


const Modal = ({setIsModalVisible}) => {
  const [name, setName] = useState('');
  const router = useRouter();

  const onButtonPress = () => {
    setIsModalVisible(false)
    router.replace('/startScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>Game over</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: '20%',
  },
  innerContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 16,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 38,
    backgroundColor: '#FF2F2F',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Arimo',
    color: 'white',
    fontSize: 36
  },
  titleText: {
    fontFamily: 'Arimo',
    fontSize: 30,
  }
})
