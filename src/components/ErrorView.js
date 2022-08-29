import React, { memo } from 'react';
import { View, Text } from 'react-native'
import { MyContainer, MyTitle } from '../globalStyle';

const ErrorView = memo(({ error }) => {
    return (
        <>
            { error && (
                <MyContainer>
                    <MyTitle style={{
                        color: 'red'
                    }}>{error.name}</MyTitle>
                    <Text style={{
                        fontSize: '12px'
                    }}>{error.message}</Text>
                </MyContainer>
            )}
        </>
    );
});

export default ErrorView;