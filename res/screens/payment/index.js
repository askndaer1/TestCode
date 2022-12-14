import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
import { useConfirmPayment } from '@stripe/stripe-react-native';
import Button from './Button';
import PaymentScreen from './PaymentScreen';

export default function index() {
    const [email, setEmail] = useState('');
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`https://expo-stripe-server-example.glitch.me/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                currency: 'myr',
                items: [{ id: 'id' }],
                request_three_d_secure: 'any',
                payment_method_types: ['fpx'],
            }),
        });
        const { clientSecret, error } = await response.json();

        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        // const {
        //     clientSecret,
        //     error: clientSecretError,
        // } = await fetchPaymentIntentClientSecret();
        // if (clientSecretError) {
        //     Alert.alert(`Error`, clientSecretError);
        //     return;
        // }
        const clientSecret = 'pi_1J6KPHJFhQDtujAYFtC28k4V_secret_VO2SCWLCUYIJ2ZSCZt7jZe96G'
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
            type: 'Fpx',
        });

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
            console.log('Payment confirmation error', error.message);
        } else if (paymentIntent) {
            Alert.alert(
                'Success',
                `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
            );
            console.log('Success from promise', paymentIntent);
        }
    };

    return (
        <PaymentScreen paymentMethod="fpx">
            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={(value) => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />

            <Button
                variant="primary"
                onPress={handlePayPress}
                title="Pay"
                loading={loading}
            />
        </PaymentScreen>
    );
}

const styles = StyleSheet.create({
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        marginLeft: 12,
    },
    input: {
        height: 44,
        borderBottomColor: "#f42",
        borderBottomWidth: 1.5,
        marginBottom: 20,
    },
});
