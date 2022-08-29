import React, { memo, useState, useEffect, useRef } from 'react';
import {cloneDeep} from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { putItem } from '../slices/DepartmentSlice';

import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { MyContainer, MyTitle, MyInput } from '../globalStyle';
import { alertDialog } from '../Utils';
import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';

const Edit = memo(( {navigation, route} ) => {
    // 전 페이지에서 넘어온 파라미터 추출 --> 수정할 대상의 id값
    const { params: {id} } = route;

    // 리덕스가 관리하는 상태값을 얻는다. --> data에는 전체 목록이 저장되어 있는 상태
    const { data, loading, error } = useSelector((state) => state.DepartmentSlice);

    // 수정할 대상을 의미하는 상태값
    const [ origin, setOrigin ] = useState(null);

    const dispatch = useDispatch();

    /** 페이지가 열림과 동시에 전체 목록에서 id값을 기준으로 수정할 대상을 찾아 상태값에 복사 */
    useEffect(() => {
        const index = data.findIndex(i => i.id === parseInt(id));
        // 선택한 항목을 복사
        setOrigin(cloneDeep(data[index]));
    }, [data, id]);


    /** 컴포넌트의 입력값을 저장할 참조변수 생성 */
    const dnameRef = useRef(null);
    const locRef = useRef(null);

    /** 저장 버튼에 대한 이벤트 */
    const onSavePress = () => {
        if (!dnameRef.current || !locRef.current) {
            alertDialog('입력값 부족', '학과 이름과 위치를 모두 입력하셔야 합니다.');
            return;
        }

        dispatch(putItem({
            id: id,
            dname: dnameRef.current,
            loc: locRef.current
        })).then(() => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        });
    }

    return (
        <MyContainer>
            <MyTitle>학과정보 수정</MyTitle>

            <Spinner visible={loading} />
            <ErrorView error={error} />

            {origin && (
                <>
                    <MyInput autoFocus={true} placeholder="학과이름(dname)을 입력하세요." 
                        defaultValue={origin.dname}
                        onChangeText={text => dnameRef.current = text}/>
                    <MyInput placeholder="학과위치(loc)를 입력하세요." defaultValue={origin.loc}
                        onChangeText={text => locRef.current = text}/>
                    <Button title='저장하기' onPress={onSavePress} />
                </>
            )}
        </MyContainer>
    );
});

export default Edit;