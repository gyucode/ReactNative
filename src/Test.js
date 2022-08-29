import React, { memo, useEffect } from 'react';
import { View, Text } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getList, getItem, postItem, putItem, deleteItem } from './slices/DepartmentSlice';

const Test = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.DepartmentSlice);

    useEffect(() => {
        dispatch(getList());
        //dispatch(getItem({id: 306}));
        //dispatch(postItem({dname: 'ReactNative', loc: '1401호'}))
        //dispatch(putItem({id: 311, dname: '리액트네이티브', loc: '이젠아카데미'}))
        //dispatch(deleteItem({id: 311}))
    }, [dispatch]);

    return (
        <View>
            {loading ? (
            <Text>loading...</Text>
            ) : (
            error ? JSON.stringify(error) : (
            <Text>{JSON.stringify(data)}</Text>
            )
            )}
        </View>
    )
}

export default Test