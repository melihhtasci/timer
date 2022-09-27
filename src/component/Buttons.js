import React, { useRef, useEffect, useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, Animated, StatusBar, TextInput, Image } from "react-native";
import { Easing } from 'react-native-reanimated';
import styles from '../stylesheet/stylesheet';
import Counter from './Counter';
import Sound from "react-native-sound";
import SplashScreen from "react-native-splash-screen";

const Buttons = props => {

    const sec = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

    const min = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

    const hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    const { width, height } = Dimensions.get("window");
    const ITEM_SIZE = width * 0.40;
    const ITEM_SPACING = (width - ITEM_SIZE) / 2;
    const BUTTON_SIZE = width / 5;
    const textTopMargin = height / 2 - (ITEM_SPACING) + ITEM_SIZE / 2; 
    const inputRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollMin = useRef(new Animated.Value(0)).current;
    const scrollHour = useRef(new Animated.Value(0)).current;

    const [totalSecond, setTotalSecond] = useState(0);
    const [duration, setDuration] = useState(sec[0]);
    const [minDuration, setMinDuration] = useState(min[0]);
    const [hourDuration, setHourDuration] = useState(hour[0]);
    const [isStop, setIsStop] = useState(false);
    const sound = new Sound("dring.aac", Sound.MAIN_BUNDLE, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });

    const buttonAmimation = useRef(new Animated.Value(0)).current;
    const buttonsOutterViewtopAnimation = useRef(new Animated.Value(1)).current;
    const buttonContinueAnimation = useRef(new Animated.Value(1)).current;
    const buttonResetAnimation = useRef(new Animated.Value(1)).current;
    const timerAnimation = useRef(new Animated.Value(height)).current;
    const textInputAnimation = useRef(new Animated.Value(totalSecond)).current;
    const remainingTimeAnimation = useRef(new Animated.Value(totalSecond)).current;
    const textOpacityAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
        const listener = textInputAnimation.addListener(({ value, }) => {
            inputRef?.current?.setNativeProps({
                text: nativeRound(value)
            })
        })
        return () => {
            textInputAnimation.removeListener(listener);
            textInputAnimation.removeAllListeners();
        }
    })

    function nativeRound(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        var n = Math.round(num * p) / p;
        //console.log(n)
        if (n >= 3660) {
            return Math.floor((n / 3600)).toString() + " : " + Math.floor(((n % 3600) / 60)).toString() + " : " + Math.floor(((n % 3600) % 60)).toString();
        } else if (n < 60) {
            return "0 : " + Math.floor(n).toString();
        } else {
            return parseInt((n / 60)).toString() + " : " + (n % 60).toString();
        }

    }

    const animation = useCallback(
        () => {
            textInputAnimation.setValue(totalSecond);
            remainingTimeAnimation.setValue(totalSecond);
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(buttonAmimation, {
                        toValue: 1, duration: 300, useNativeDriver: true
                    }),
                    Animated.timing(buttonsOutterViewtopAnimation, {
                        toValue: 0, duration: 300, useNativeDriver: true
                    }),
                    Animated.timing(textOpacityAnimation, {
                        toValue: 0, duration: 300, useNativeDriver: true
                    }),
                ]),
                Animated.timing(timerAnimation, {
                    toValue: 0, duration: 300, useNativeDriver: true
                }),
                Animated.parallel([
                    Animated.timing(textInputAnimation, {
                        toValue: 0, duration: totalSecond * 1000, useNativeDriver: true, easing: Easing.linear
                    }),
                    Animated.timing(timerAnimation, {
                        toValue: height, duration: totalSecond * 1000, useNativeDriver: true, easing: Easing.linear
                    })
                ]), 
            ]).start(()=>{
                Animated.parallel([
                    Animated.timing(buttonAmimation, {
                        toValue: 0, duration: 300, useNativeDriver: true
                    }).start(),
                    Animated.timing(buttonsOutterViewtopAnimation, {
                        toValue: 1, duration: 300, useNativeDriver: true
                    }).start(),
                    Animated.timing(buttonContinueAnimation, {
                        toValue: 1, duration: 300, useNativeDriver: true
                    }).start(),
                    textOpacityAnimation.setValue(1)
                ])
            })
        },
        [totalSecond],
    );


    const animationStop = useCallback(
        () => {
            Animated.timing(buttonAmimation, {
                toValue: 0, duration: 300, useNativeDriver: true
            }).stop(()=>{ console.log("worked here"); sound != null ? sound.stop() : true }),
            Animated.timing(buttonsOutterViewtopAnimation, {
                toValue: 1, duration: 300, useNativeDriver: true
            }).stop(),
            //sound.stop();
            Animated.parallel([
                Animated.timing(timerAnimation, {
                    toValue: height, duration: totalSecond * 1000, useNativeDriver: true
                }).stop(),
                Animated.timing(textInputAnimation, {
                    toValue: 0, duration: totalSecond * 1000, useNativeDriver: true
                }).stop(),
                Animated.timing(buttonAmimation, {
                    toValue: 1, duration: 100, useNativeDriver: true
                }).stop(),
                Animated.timing(textOpacityAnimation, {
                    toValue: 0, duration: 100, useNativeDriver: true
                }).start(),
                Animated.timing(buttonsOutterViewtopAnimation, {
                    toValue: 1, duration: 100, useNativeDriver: true
                }).start(),
                Animated.timing(buttonContinueAnimation, {
                    toValue: 0, duration: 300, useNativeDriver: true
                }).start(),
                Animated.timing(buttonResetAnimation, {
                    toValue: 0, duration: 300, useNativeDriver: true
                }).start(),
            ]).start()
        });

    const animationContinue = useCallback(
        () => {
            setIsStop(false);
            let newTime = textInputAnimation._value;
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(timerAnimation, {
                        toValue: height, duration: newTime * 1000, useNativeDriver: true
                    }).start(),
                    Animated.timing(buttonsOutterViewtopAnimation, {
                        toValue: 0, duration: 300, useNativeDriver: true
                    }).start(() => {
                        Animated.timing(textInputAnimation, {
                            toValue: 0, duration: newTime * 1000, useNativeDriver: true
                        }).start(() => {
                            Animated.parallel([
                                Animated.timing(buttonsOutterViewtopAnimation, {
                                    toValue: 1, duration: 300, useNativeDriver: true
                                }).start(),
                                Animated.timing(textOpacityAnimation, {
                                    toValue: 1, duration: 300, useNativeDriver: true
                                }).start(),
                                Animated.timing(buttonAmimation, {
                                    toValue: 0, duration: 300, useNativeDriver: true
                                }).start(),
                            ]).start()
                        })
                    }),
                    Animated.timing(buttonResetAnimation, {
                        toValue: 1, duration: 300, useNativeDriver: true
                    }).start(),
                    Animated.timing(buttonContinueAnimation, {
                        toValue: 1, duration: 100, useNativeDriver: true
                    }).start(),
                ]),
            ]).start()

        },
    );

    const animationReset = useCallback(
        () => {
            Animated.parallel([
                Animated.timing(buttonAmimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
                Animated.timing(buttonsOutterViewtopAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
                Animated.timing(buttonContinueAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
                Animated.timing(timerAnimation, {
                    toValue: height,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
                Animated.timing(textOpacityAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
                Animated.timing(buttonResetAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start(),
            ]).start()
        },
    );

    const opacity = buttonAmimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const translateY = buttonAmimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });

    const opacityStop = buttonsOutterViewtopAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const translateYStop = buttonsOutterViewtopAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });

    const opacityContinue = buttonContinueAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });


    const translateYContinue = buttonContinueAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });

    const opacityReset = buttonResetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const translateYReset = buttonResetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    });

    const textOpacity = textOpacityAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    return (
        <React.Fragment>
            <Animated.View style={[StyleSheet.absoluteFillObject],
            {
                height,
                width,
                position: "absolute",
                backgroundColor: "#54b36d",
                transform: [{ translateY: timerAnimation }]
            }} />
            <View style={[styles.buttonsOutterView2, { alignItems: "flex-end" }]}>
                <Animated.View style={[{ opacity: opacityReset, transform: [{ translateY: translateYReset }] }]}>
                    <TouchableOpacity onPress={() => animationReset()}>
                        <View style={[styles.buttonView2, { marginRight: BUTTON_SIZE + (BUTTON_SIZE / 3), }]}>
                            <Image style={[styles.buttonImage]} source={require("../icon/stop.png")} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <View style={[styles.buttonsOutterView2, { alignItems: "flex-start" }]}>
                <Animated.View style={[{ opacity: opacityContinue, transform: [{ translateY: translateYContinue }] }]}>
                    <TouchableOpacity onPress={() => animationContinue()}  >
                        <View style={[styles.buttonView2, { marginLeft: BUTTON_SIZE + (BUTTON_SIZE / 3), }]}>
                            <Image style={[styles.buttonImage]} source={require("../icon/play.png")} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <View style={[styles.buttonsOutterView]}>
                <Animated.View style={[{ opacity: opacityStop, transform: [{ translateY: translateYStop }] }]}>
                    <TouchableOpacity onPress={() => animationStop()}  >
                        <View style={[styles.buttonView]} >
                            <Image style={[styles.buttonImage]} source={require("../icon/pause-button.png")} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <View style={[styles.buttonsOutterView]}>
                <Animated.View style={[{ opacity, transform: [{ translateY }] }]}>
                    <TouchableOpacity onPress={() => animation() } disabled={totalSecond > 0 ? false: true}>
                        <View style={[styles.buttonView]}>
                            <Image style={[styles.buttonImage]} source={require("../icon/play.png")} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <View style={{ position: "absolute", top: textTopMargin, left: 0, right: 0, flex: 1, }}>
                <Animated.View style={[{ justifyContent: "center", alignSelf: "center", alignItems: "center", opacity: textOpacity }]}>
                    <TextInput ref={inputRef} style={{
                        fontSize: 72,
                        fontFamily: 'digital-7',
                        color: "white",
                    }} defaultValue={totalSecond.toString()} />
                </Animated.View>
            </View>

            <Counter duration={duration} hour={hour} opacity={opacity} scrollHour={scrollHour}
                setTotalSecond={setTotalSecond} min={min} scrollMin={scrollMin} scrollX={scrollX}
                minDuration={minDuration} sec={sec} setMinDuration={setMinDuration}
                setHourDuration={setHourDuration} hourDuration={hourDuration} setDuration={setDuration} />

        </React.Fragment>
    )


}



export default Buttons;
