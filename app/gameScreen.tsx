import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, KeyboardAvoidingView, StatusBar, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressionPanel from './components/ProgressionPanel';
import { eggs, getRandomColor, saveDashboardItems } from '@/utils/vars';
import LottieView from 'lottie-react-native';
import Modal from './components/Modal';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

const Game = () => {
  const router = useRouter();
  const [numberOfCoins, setNumberOfCoins] = useState(0);
  const [second, setSecond] = useState(1);
  const [firstEgg, setFirstEgg] = useState(eggs[0]);
  const [secondEgg, setSecondEgg] = useState(eggs[1]);
  const [thirdEgg, setThiredEgg] = useState(eggs[2]);
  const [currentColor, setCurrentColor] = useState(eggs[0].color);
  const [eggClicked, setEggClicked] = useState(0);
  const [textColor, setTextColor] = useState(getRandomColor());
  const [isLost, setIsLost] = useState(false);
  const [isFireVisible, setIsFireVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const animation = useRef<LottieView>(null);
  const animationOpacity = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    if (second > 10) {
      setIsLost(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecond(prev => prev + 1);
    }, 1000);

    if (eggClicked > 0) clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [second, eggClicked]);

  const getThreeRandomEggs = () => {
    const usedIndices = new Set<number>();

    while (usedIndices.size < 3) {
      const index = Math.floor(Math.random() * eggs.length);
      usedIndices.add(index);
    }

    const indices = Array.from(usedIndices);
    return [eggs[indices[0]], eggs[indices[1]], eggs[indices[2]]];
  };

  const getCurrentColorName = (egg1, egg2, egg3) => {
    const possibleColors = [egg1.color, egg2.color, egg3.color].filter(color => color !== 'Golden');

    if (numberOfCoins % 4 === 0) {
      return possibleColors.includes(egg3.color) ? egg3.color : possibleColors[0];
    } else {
      const index = Math.floor(Math.random() * possibleColors.length);
      return index > 1 ? possibleColors[1] : possibleColors[0]
    }
  };

  useEffect(() => {
    const color = getCurrentColorName(firstEgg, secondEgg, thirdEgg);
    setCurrentColor(color);
  }, [firstEgg, secondEgg, thirdEgg, numberOfCoins]);

  useEffect(() => {
    if (eggClicked === 0) return;

    const resetTimeout = setTimeout(() => {
      const [egg1, egg2, egg3] = getThreeRandomEggs();
      setEggClicked(0);
      setFirstEgg(egg1);
      setSecondEgg(egg2);
      setThiredEgg(egg3);
      setTextColor(getRandomColor());
      setSecond(1);
    }, 2000);

    return () => clearTimeout(resetTimeout);
  }, [eggClicked]);

  useEffect(() => {
    if (isLost) {
      setIsFireVisible(true);

      setTimeout(() => {
        Animated.timing(animationOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setIsFireVisible(false));
      }, 3000);

      setTimeout(() => {
        setIsModalVisible(true);
      }, 6000)
    };

  }, [isLost])

  const onEggPress = (egg, numberOfEgg) => {
    let newNumberOfCoins = numberOfCoins;

    if (egg.color === 'Golden') {
      newNumberOfCoins = newNumberOfCoins * 2;
      setEggClicked(numberOfEgg);
      setTimeout(() => {
        setNumberOfCoins(newNumberOfCoins)
      }, 2000)
      saveDashboardItems('numberOfCoins', newNumberOfCoins);
      return;
    }

    if (egg.color === currentColor) {
      newNumberOfCoins = newNumberOfCoins + 1;
      setEggClicked(numberOfEgg);
      setTimeout(() => {
        setNumberOfCoins(newNumberOfCoins)
      }, 2000)
      saveDashboardItems('numberOfCoins', newNumberOfCoins);
      return;
    } else {
      setSecond(11);
    }
  }

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
          source={isLost ? require('../assets/images/start-bg.png') : require('../assets/images/game-bg.png')}
          style={styles.background} 
        >

          <View style={styles.topContainer}>
            <Text style={[styles.text, {fontSize: 38, position: 'absolute', alignSelf: 'center', left: '50%', transform: [{ translateX: '-50%' }]}]}>{numberOfCoins}</Text>
            

            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Image
                source={require('@/assets/images/buttons/settings.png')}
                style={{width: 53, height: 53}}
              />
            </TouchableOpacity>
          </View>
          
          {isLost ? (
            <View style={{marginBottom: '10%'}}>
              <Image
                source={require('@/assets/images/cookedChicken.png')}
                style={{width: 218, height: 177}}
              />
            </View>
          ): (
            <View style={styles.bottomContainer}>
              {numberOfCoins % 4 !== 0 ? (
                <View style={styles.bottomInnerContainer}>
                  <TouchableOpacity onPress={() => onEggPress(firstEgg, 1)}>
                    <ImageBackground
                      source={require('@/assets/images/shine.png')}
                      resizeMode='contain'
                      style={{width: 179, height: 349, alignItems: 'center', justifyContent: 'flex-end'}}
                      imageStyle={[{ opacity: 0 }, eggClicked === 1 && {opacity: 1}]}
                    >
                      <Image
                        source={firstEgg.imgUri}
                        style={{width: 140, height: 178}}
                      />
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onEggPress(secondEgg, 2)}>
                    <ImageBackground
                      source={require('@/assets/images/shine.png')}
                      resizeMode='contain'
                      style={{width: 179, height: 349, alignItems: 'center', justifyContent: 'flex-end'}}
                      imageStyle={[{ opacity: 0 }, eggClicked === 2 && {opacity: 1}]}
                    >
                      <Image
                        source={secondEgg.imgUri}
                        style={{width: 140, height: 178}}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.bottomInnerContainer, {gap: '5%'}]}>
                  <TouchableOpacity onPress={() => onEggPress(firstEgg, 1)}>
                    <ImageBackground
                      source={require('@/assets/images/shine.png')}
                      resizeMode='contain'
                      style={{width: 117, height: 228, alignItems: 'center', justifyContent: 'flex-end'}}
                      imageStyle={[{ opacity: 0 }, eggClicked === 1 && {opacity: 1}]}
                    >
                      <Image
                        source={firstEgg.imgUri}
                        style={{width: 96, height: 122}}
                      />
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onEggPress(secondEgg, 2)}>
                    <ImageBackground
                      source={require('@/assets/images/shine.png')}
                      resizeMode='contain'
                      style={{width: 117, height: 228, alignItems: 'center', justifyContent: 'flex-end'}}
                      imageStyle={[{ opacity: 0 }, eggClicked === 2 && {opacity: 1}]}
                    >
                      <Image
                        source={secondEgg.imgUri}
                        style={{width: 96, height: 122}}
                      />
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onEggPress(thirdEgg, 3)}>
                    <ImageBackground
                      source={require('@/assets/images/shine.png')}
                      resizeMode='contain'
                      style={{width: 117, height: 228, alignItems: 'center', justifyContent: 'flex-end'}}
                      imageStyle={[{ opacity: 0 }, eggClicked === 3 && {opacity: 1}]}
                    >
                      <Image
                        source={thirdEgg.imgUri}
                        style={{width: 96, height: 122}}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}

              <ProgressionPanel second={second}/>
            </View>
          )}

          {eggClicked > 0 || isLost ? (
            <Image
              source={isLost ? require('@/assets/images/fried-coin.png') : require('@/assets/images/coin.png')}
              style={styles.coin}
            />
          ) : (
            <Text style={[styles.currentColorText, {color: textColor}]}>{currentColor}</Text>
          )}

          {isFireVisible && (
            <Animated.View style={{
              opacity: animationOpacity,
              width: screenWidth,
              height: screenHeight / 1.6,
              position: 'absolute',
              bottom: '8%',
            }}>
              <LottieView
                autoPlay
                ref={animation}
                style={{ width: '100%', height: '100%' }}
                source={require('@/assets/animations/fire-animation.json')}
              />
            </Animated.View>
          )}

          {isModalVisible && (
            <Modal setIsModalVisible={setIsModalVisible}/>
          )}
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
    paddingBottom: '10%',
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
    lineHeight: 35,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  bottomContainer: {
    gap: '5%'
  },
  bottomInnerContainer: {
    gap: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentColorText: {
    position: 'absolute',
    top: '50%',
    fontFamily: 'Arimo',
    fontSize: 50,
  },
  coin: {
    position: 'absolute',
    top: '42.5%',
    width: 185,
    height: 185,
  }
});

export default Game;