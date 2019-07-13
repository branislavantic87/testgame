import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import MainScreen from './components/MainScreen';

const RouterComponent = () => {
    return (
        <Router>
            <Stack>
                <Scene hideNavBar key='root'>
                    <Scene hideNavBar key={'Home'} component={MainScreen} inital />
                </Scene>
            </Stack>
        </Router>
    )
}

export default RouterComponent;