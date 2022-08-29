import React, { memo, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import useAxios from 'axios-hooks';

//const ListItemWrapper = styled.Pressable`
const ListItemWrapper = styled.TouchableOpacity`
    ${props => props.index === 0 && `
        border-top-width: 1px;
    `}
    border-bottom-width: 1px;
    border-bottom-style: 'solid';
    border-color: #eeeeee;
    box-sizing: border-box;
    padding: 5px 10px;
    background-color: #ffffff;
`;

const ListItem = memo(({index, id, dname, loc, onMyPressHandler}) => {
    return (
        <ListItemWrapper index={index}
            onPress={onMyPressHandler}>
            <Text className='title'>학과번호: {id}</Text>
            <Text>학과명: {dname}</Text>
            <Text>학과위치: {loc}</Text>
        </ListItemWrapper>
    )
});

export default ListItem