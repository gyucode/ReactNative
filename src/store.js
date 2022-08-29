import { configureStore } from '@reduxjs/toolkit';
import DepartmentSlice from './slices/DepartmentSlice';

const store = configureStore({
    reducer: {
        DepartmentSlice: DepartmentSlice
    },
    // 미들웨어를 사용하지 않을 경우 이 라인 생략 가능 (redux-thunk사용시 필수)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    // redux-devtools-extension을 사용하지 않을 경우 false 혹은 이 라인 명시 안함
    devTools: true
});

export default store;