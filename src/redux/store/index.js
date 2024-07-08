import { configureStore } from '@reduxjs/toolkit';
import { getTypingInfo } from '../reducers/typingReducer';

export const store = configureStore({
    reducer: {
        [getTypingInfo.name]: getTypingInfo.reducer
    }
})