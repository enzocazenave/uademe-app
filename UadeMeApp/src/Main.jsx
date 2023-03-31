import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Navigation } from './navigation/Navigation';

export const Main = () => {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}