import React, { memo, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { postItem } from '../slices/DepartmentSlice';

import { Text, Button } from 'react-native';
import { MyContainer, MyTitle, MyInput } from '../globalStyle';
import { alertDialog } from '../Utils';
import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';

const Add = memo(({navigation}) => {

    // 리덕스의 Reducer함수들을 호출하기 위한 dispatch함수
    const dispatch = useDispatch();

    // 리덕스가 관리하는 상태값을 얻는다.
    const { data, loading, error } = useSelector((state) => state.DepartmentSlice);

    /** 컴포넌트를 연결할 수 있는 참조변수 생성 */
    const dnameRef = useRef(null);
    const locRef = useRef(null);

    const onSavePress = () => {
        if (!dnameRef.current || !locRef.current) {
            alertDialog('입력값 부족', '학과 이름과 위치를 모두 입력하셔야 합니다.');
            return;
        }

        dispatch(postItem({
            dname: dnameRef.current,
            loc: locRef.current
        })).then(() => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        });
    };

    return (
        <MyContainer>
            <MyTitle>새로운 학과 추가</MyTitle>

            <Spinner visible={loading} />
            <ErrorView error={error} />

            <MyInput autoFocus={true} placeholder="학과이름(dname)을 입력하세요." 
                onChangeText={text => dnameRef.current = text}/>
            <MyInput placeholder="학과위치(loc)를 입력하세요."
                onChangeText={text => locRef.current = text}/>
            <Button title='저장하기' onPress={onSavePress} />

            <Text>{JSON.stringify(data)}</Text>
        </MyContainer>
    )
});

export default Add;