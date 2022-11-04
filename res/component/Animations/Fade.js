import React from "react";
import { Animated, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Fade = ({ delay, fadeMode, children, alreadyAnimated, style }) => {
    let duration = 1000
    let animation = new Animated.Value(1);
    const animated = new Animated.Value(30);

    if (!alreadyAnimated) {
        animation = new Animated.Value(0)
        Animated.parallel([
            Animated.timing(animation, {
                toValue: fadeMode === "fadeIn" ? 1 : 0,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(animated, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }),
        ]).start()
    }
    return (
        <Animated.View style={[styles.container, { opacity: animation, transform: [{ translateY: animated }] }, style]}>{children}</Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});

Fade.propTypes = {
    children: PropTypes.object.isRequired,
    // duration: PropTypes.number.isRequired,
    delay: PropTypes.number,
    fadeMode: PropTypes.oneOf(["fadeIn", "fadeOut"]).isRequired,
    alreadyAnimated: PropTypes.bool,
};

Fade.defaultProps = {
    delay: 0,
};

const Memoiz = React.memo(Fade);

export default Memoiz;
