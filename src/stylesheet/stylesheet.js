import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BUTTON_SIZE = WIDTH / 5;
const ITEM_SIZE = WIDTH * 0.40;

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor:"black"
    },
    buttonsOutterView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 100,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    buttonsOutterView2: {
        justifyContent: "flex-end",
        //alignItems: "flex-end",
        paddingBottom: 100,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    buttonView: {
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE,
        alignContent: "center",
        alignItems: "center",
        backgroundColor:"#6dc33e"
    },
    buttonView2: {
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE,
        alignContent: "center",
        alignItems: "center",
        backgroundColor:"#6dc33e"
    },
    buttonImage: {
        marginTop: BUTTON_SIZE / 3,
        height: BUTTON_SIZE / 3,
        width: BUTTON_SIZE / 3,
    },
    counterOutterView: {
        height: ITEM_SIZE * 2, top: HEIGHT / 4, left: 0, right: 0, flex: 1
    },
    counterAnimatedView: {
        height: ITEM_SIZE / 2, justifyContent: "center", alignItems: "center"
    },
    counterText: {
        fontSize: 68,
        fontFamily: 'digital-7',
        color: "#6dc33e",
        //fontWeight: "bold",
    }
});
