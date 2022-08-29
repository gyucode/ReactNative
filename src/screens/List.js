import React, { memo, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getList } from '../slices/DepartmentSlice';

import ErrorView from '../components/ErrorView';
import Spinner from '../components/Spinner';
import DepartmentListItem from '../components/DepartmentListItem';

const List = memo(( {navigation} ) => {

    // 리덕스의 Reducer함수들을 호출하기 위한 dispatch함수
    const dispatch = useDispatch();

    // 리덕스가 관리하는 상태값을 얻는다.
    const { data, loading, error } = useSelector((state) => state.DepartmentSlice);

    // 화면이 처음 등장함과 동시에 데이터를 로드한다.
    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    const onItemLongPress = (id) => {
        dispatch(deleteItem({
            id:id
        }));
    };

    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={loading} />
            <ErrorView error={error} />

            <Button title='데이터 추가' onPress={() => {
                navigation.navigate('Add');
            }} />

            {/* 로드한 데이터를 목록으로 출력 */}
            <FlatList
                data={data}
                renderItem={( {item: {id, dname, loc}, index} ) => {
                    return (
                        <DepartmentListItem key={index} index={index} 
                            id={id} dname={dname} loc={loc}
                            onMyPressHandler={ () => {
                                const param = {id: id};
                                navigation.navigate('Edit', param);
                            } } />
                    )
                }}
            />
        </View>
    );
});

export default List;