import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { fetchPublishableKey } from '../helpers';


const PaymentScreen = ({ paymentMethod, children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            const publishableKey = "pk_test_51J6J7BJFhQDtujAYeurdTw1gB74h1YDugXcIYdyLlBAH7Qiy5LbPDRq6HUgLHdms2nP66ZhqnrwwckP5ft4Vd8KQ00o4DMdIyi"//await fetchPublishableKey(paymentMethod);
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: 'merchant.com.stripe.react.native',
                    urlScheme: 'stripe-example',
                    setUrlSchemeOnAndroid: true,
                });
                setLoading(false);
            }
        }
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}
                accessibilityLabel="payment-screen"
                style={styles.container}
                keyboardShouldPersistTaps="handled">
                {children}
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <Text style={{ opacity: 0 }}>appium fix</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 16,
    },
});

export default PaymentScreen;
