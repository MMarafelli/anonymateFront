import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Main from '../screens/Main';
import ChatScreen from '../screens/ChatScreen'

const ScreenRouter = createAppContainer(
    createStackNavigator({
        SignIn,
        SignUp,
        Main,
        ChatScreen,
    },
        {
            initialRouteName: 'SignIn'
        }
    )
);

export default ScreenRouter;
