import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, I18nManager } from 'react-native';
import Button from '@components/Button'
import * as Notifications from 'expo-notifications';
import App from "./res/navigation"
import server from './res/API/Server'
import { LogBox } from 'react-native';
import DataStorageProvider from './res/Data/context'
import * as SplashScreen from 'expo-splash-screen';
import Text from '@components/Text'
import Message from '@components/Message'
import * as Font from 'expo-font';
import moment from "moment";
import 'moment/locale/ar';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function AppLoader(props) {
    LogBox.ignoreAllLogs();
    moment.locale('ar');
    Server = new server;
    I18nManager.allowRTL(false);
    const [appIsReady, setAppIsReady] = useState(false);
    const [ServerISReady, setServerISReady] = useState(false);
    const [indicatorServer, setIndicatorServer] = useState(false);
    useEffect(() => {

        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    'arabicFont': require('./assets/Fonts/Cairo/Cairo-SemiBold.ttf'),
                    'arabicFontBold': require('./assets/Fonts/Cairo/Cairo-Bold.ttf'),
                });
                await new Promise(resolve => setTimeout(resolve, 2000));

                await CheckServer()

            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();

    }, []);

    const CheckServer = async function () {
        setIndicatorServer(true)
        let CheckServer1 = await Server.CheckServer()
        console.log(CheckServer1)
        if (CheckServer1) {
            setServerISReady(true);
            setIndicatorServer(false)
        }
        setIndicatorServer(false)
    }

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {

            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }


    return (
        <View
            style={{ flex: 1 }}
            onLayout={onLayoutRootView}>
            {!ServerISReady ?
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image resizeMode="cover" source={require('./assets/splash1.png')} style={{ width: 200, height: 200, borderRadius: 10 }} />
                    <Text Bold style={{ fontSize: 26 }}>لا يمكن الاتصال بالسرفر</Text>
                    <Button
                        onPress={CheckServer}
                        title={"Try again"}
                    />
                    {indicatorServer && <ActivityIndicator size="small" color="#34ace0" />}
                </View>
                :
                <DataStorageProvider>

                    <App />
                    <Message />
                </DataStorageProvider>}
        </View>
    );
}