import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

/**
// 테스트 코드
import Test from './Test';

const App = () => {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    )
}
/*/
// Stack Navigation 구성

// Android, iOS Native 호환을 위해 참조
import 'react-native-gesture-handler';

// StackNavigation 생성자
import { createStackNavigator } from '@react-navigation/stack';

// 화면에 대한 최상위 컨테이너
import { NavigationContainer } from '@react-navigation/native';

import List from './screens/List';
import Add from './screens/Add';
import Edit from './screens/Edit';

// Stack Navigation 객체
const Stack = createStackNavigator();

const App = () => {
    const myGlobalOption = {
        cardStyle: {
            backgroundColor: '#ffffff'
        },
        headerStyle: {
            height: 100,
            backgroundColor: '#0066ff',
            borderBottomWidth: 1,
            borderBottomColor: '#34495e',
        },
        headerTintColor: '#ffff00',
        headerTitleStyle: {
            color: '#ffffff',
            fontSize: 24
        },
        headerTitleAlign: 'center',
        headerTitle: '학과관리'
    };

    return (
        <Provider store={store}>
            <NavigationContainer
                initialRouteName="List"
                screenOptions={myGlobalOption}>
                <Stack.Navigator>
                    <Stack.Screen name="List" component={List}/>
                    <Stack.Screen name="Add" component={Add} />
                    <Stack.Screen name="Edit" component={Edit} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );

};

/**/

export default App