import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {cloneDeep} from 'lodash';
import {pending, fulfilled, rejected} from '../Utils';

// axios의 경우 확장자로 끝나지 않는 이상 URL은 "/"로 끝나야 한다.
const API_URL = 'http://localhost:3001/department/';

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getList = createAsyncThunk('DepartmentSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(API_URL);
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
// http://localhost:3001/department/306/
// getItem({id: 306}) --> payload.id
export const getItem = createAsyncThunk('DepartmentSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get(`${API_URL}${payload.id}/`);
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
// id값을 제외한 나머지 항목들을 payload로 받아서 백엔드에 전송
// 백엔드는 전송받은 값을 저장하고 생성된 신규 데이터를 JSON으로 내려줌
export const postItem = createAsyncThunk('DepartmentSlice/postItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.post(API_URL, {
            dname: payload.dname,
            loc: payload.loc
        });
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 수정을 위한 비동기 함수 */
// id값을 제외한 나머지 항목들은 put방식으로 백엔드에 전송하고,
// 수정할 대상을 식별하기 위한 id값은 URL에 path 파라미터 형식으로 포함시킨다.
export const putItem = createAsyncThunk('DepartmentSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.put(`${API_URL}${payload.id}/`, {
            dname: payload.dname,
            loc: payload.loc
        });
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
// 삭제할 대상을 식별하기 위한 id값만 URL에 path 파라미터 형식으로 포함시킨다.
export const deleteItem = createAsyncThunk('DepartmentSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.delete(`${API_URL}${payload.id}/`);
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const DepartmentSlice = createSlice({
    name: 'DepartmentSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getList.pending]: pending,
        [getList.fulfilled]: fulfilled,
        [getList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getItem.pending]: pending,
        [getItem.fulfilled]: fulfilled,
        [getItem.rejected]: rejected,

        /** 데이터 저장을 위한 액션 함수 */
        [postItem.pending]: pending,
        [postItem.fulfilled]: (state, {payload}) => {
            // 기존의 상태값을 복사한다.(원본이 JSON이므로 깊은 복사를 수행해야 한다)
            const data = cloneDeep(state.data);
            // 새로 작성된 데이터가 화면상에서 맨 아래에 표시되어야 하는 경우(순차정렬)
            data.push(payload.data);
            // 새로 작성된 데이터가 화면상에서 맨 위에 표시되어야 하는 경우(역순정렬)
            //data.unshift(payload.data);
            return {...state,  loading:false, data: data};
        },
        [postItem.rejected]: rejected,

        /** 데이터 수정을 위한 액션 함수 */
        [putItem.pending]: pending,
        [putItem.fulfilled]: (state, {meta, payload}) => {
            // 기존의 상태값을 복사한다.(원본이 JSON이므로 깊은 복사를 수행해야 한다)
            const data = cloneDeep(state.data);

            // 기존의 데이터에서 수정이 요청된 항목의 위치를 검색한다.
            const index = data.findIndex(item => item.id === parseInt(meta.arg.id));

            // index 위치의 데이터를 백엔드로부터 받아온 항목으로 교체한다.
            data.splice(index, 1, payload.data);

            return {
                data: data,
                loading: false,
                error: null
            }
        },
        [putItem.rejected]: rejected,

        /** 데이터 삭제를 위한 액션 함수 */
        [deleteItem.pending]: pending,
        [deleteItem.fulfilled]: fulfilled,
        [deleteItem.rejected]: rejected,
    },
});

export default DepartmentSlice.reducer;