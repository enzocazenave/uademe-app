import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Navigation } from './navigation/Navigation';
import { AuthProvider } from './context/AuthContext';

export const Main = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
        </NavigationContainer>
    );
}