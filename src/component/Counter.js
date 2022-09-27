import React from 'react'
import { View, Dimensions, Animated, Text } from 'react-native'
import styles from "../stylesheet/stylesheet";

const Counter = ({ hour, opacity, scrollHour, minDuration, duration, setHourDuration, setTotalSecond,
    min, scrollMin, setMinDuration, sec, scrollX, hourDuration, setDuration }) => {

    const { width: WIDTH } = Dimensions.get("window");
    const ITEM_SIZE = WIDTH * 0.40;
    const ITEM_SPACING = (WIDTH - ITEM_SIZE) / 2;

    return (
        <React.Fragment>
            <View style={[styles.counterOutterView]}>
                <Animated.FlatList data={min}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ flexGrow: 0, opacity, marginLeft:ITEM_SIZE/3 }}
                    bounces={false}
                    snapToInterval={ITEM_SIZE / 2} // her scrollun boyutu
                    decelerationRate="fast"
                    initialNumToRender={10}
                    contentContainerStyle={{ paddingVertical: ITEM_SPACING }} // flatlist top bottom başlangıç boşlugu
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollMin } } }],
                            { useNativeDriver: true }
                        )}
                    onMomentumScrollEnd={ev => { // scroll bittigindeki değeri alıp set etme
                        const index = Math.round(ev.nativeEvent.contentOffset.y / (ITEM_SIZE / 2));
                        let saniye = ((hourDuration * 60) * 60) + (min[index] * 60) + duration;
                        setMinDuration(min[index]);
                        setTotalSecond(saniye);
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * (ITEM_SIZE / 2),
                            index * (ITEM_SIZE / 2),
                            (index + 1) * (ITEM_SIZE / 2)
                        ]
                        const opacity = scrollMin.interpolate({ inputRange, outputRange: [.4, 1, .4] })
                        const scale = scrollMin.interpolate({ inputRange, outputRange: [.6, 1, .6] })

                        return <Animated.View style={[styles.counterAnimatedView]}>
                            <Animated.Text style={[styles.counterText, { opacity: opacity, transform: [{ scale }] }]}>
                                {item}
                            </Animated.Text>
                        </Animated.View>
                    }} />
            </View>
            <View style={[styles.counterOutterView]}>
                <Animated.FlatList data={sec}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ flexGrow: 0, opacity, marginRight:ITEM_SIZE/3 }}
                    // bounces={false}
                    snapToInterval={ITEM_SIZE / 2} // her scrollun boyutu
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingVertical: ITEM_SPACING }} // flatlist top bottom başlangıç boşlugu
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollX } } }], { useNativeDriver: true })}
                    onMomentumScrollEnd={ev => { // scroll bittigindeki değeri alıp set etme
                        const index = Math.round(ev.nativeEvent.contentOffset.y / (ITEM_SIZE / 2));
                        let saniye = ((hourDuration * 60) * 60) + (minDuration * 60) + sec[index];
                        setDuration(sec[index]);
                        setTotalSecond(saniye);
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * (ITEM_SIZE / 2),
                            index * (ITEM_SIZE / 2),
                            (index + 1) * (ITEM_SIZE / 2)
                        ]
                        const opacity = scrollX.interpolate({ inputRange, outputRange: [.4, 1, .4] })
                        const scale = scrollX.interpolate({ inputRange, outputRange: [.6, 1, .6] })

                        return <Animated.View style={[styles.counterAnimatedView]}>
                            <Animated.Text style={[styles.counterText, { opacity: opacity, transform: [{ scale }] }]}>
                                {item}
                            </Animated.Text>
                        </Animated.View>
                    }} />
            </View>
        </React.Fragment>
    )
}

export default Counter;
