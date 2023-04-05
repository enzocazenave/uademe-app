import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Navigation } from './navigation/Navigation';
import { AuthProvider } from './context/AuthContext';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const Main = () => {
    return (
        <TouchableWithoutFeedback
            onPress={ Keyboard.dismiss }
        >
            <NavigationContainer>
                <AuthProvider>
                    <Navigation />
                </AuthProvider>
            </NavigationContainer>
        </TouchableWithoutFeedback>
    );
}