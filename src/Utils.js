import { Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getIcon = (name = 'home') => {
    return {
        tabBarIcon: props => {
            return (<MaterialCommunityIcons name={name} size={24} color='#ffffff' />);
        }
    }
}

const getDefaultStackOption = (title) => {
    return {
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
        headerTitleAlign: 'center'
    };
};

const alertDialog = (title, message, buttonText = 'OK', onOkButtonPress = undefined) => {
    if (Platform.os === 'ios' || Platform.os === 'android') {
        Alert.alert(title, message, {
            text: buttonText,
            onPress: onOkButtonPress
        });
    } else {
        alert(message);
        if (onOkButtonPress !== undefined) {
            onOkButtonPress();
        }
    }
};

const pending = (state, { payload }) => {
    return { ...state, loading: true }
};

const fulfilled = (state, { payload }) => {
    return {
        data: payload?.data, 
        loading: false,
        error: null
    }
};

const rejected = (state, { payload }) => {
    return {
        ...state, 
        loading: false,
        error: {
            code: payload?.status ? payload.status : 500,
            message: payload?.statusText ? payload.statusText : 'Server Error'
        }
    }
};

export { getIcon, getDefaultStackOption, alertDialog, pending, fulfilled, rejected };