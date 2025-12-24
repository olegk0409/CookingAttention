import { View, Image, StyleSheet, Animated } from "react-native"
import React, { useEffect, useRef } from 'react';


const ProgressionPanel = ({ second }) => {
  const animatedWidth = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 100 - second * 10,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [second]);

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });


  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/timer.png')}
        style={{width: 22, height: 22}}
      />

      <View style={styles.externalBar}>
        <Animated.View
          style={{
            backgroundColor: '#3DC55B',
            borderRadius: 7,
            flex: 1,
            width: interpolatedWidth,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
        <Image
          source={require('@/assets/images/fire.png')}
          style={{width: 24, height: 36, transform: [{ translateY: '-50%' }, { translateX: '50%' }]}}
        />
        </Animated.View>
      </View>
    </View>
  )
}

export default ProgressionPanel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  externalBar: {
    backgroundColor: '#fff',
    height: 14,
    flex: 1,
    borderRadius: 7,
  },
  img: {
    width: 17,
    height: 27,
  }
})
