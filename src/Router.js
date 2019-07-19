import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import MainScreen from './components/MainScreen';
import ChoosePlayer from './components/comon/ChoosePlayer';
import GameStats from './components/comon/GameStats';
import ChooseLevel from './components/comon/ChooseLevel';

const RouterComponent = () => {
    return (
        <Router>
            <Stack>
                <Scene hideNavBar key='root'>
                    <Scene hideNavBar key={'Home'} component={MainScreen} inital />
                </Scene>
                <Scene hideNavBar key='choosePlayer' component={ChoosePlayer} />
                <Scene hideNavBar key='gameStats' component={GameStats} />
                <Scene hideNavBar key='chooseLevel' component={ChooseLevel} />
            </Stack>
        </Router>
    )
}

export default RouterComponent;