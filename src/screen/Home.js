import React from 'react'
import { View, StatusBar, } from 'react-native'
import styles from '../stylesheet/stylesheet'
import Buttons from '../component/Buttons'

const Home = () => {
    return (
        <View style={[styles.container, { flexDirection: "row" }]}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Buttons />
        </View>
    )
}

export default Home;
