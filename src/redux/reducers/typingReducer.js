import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cardTypingTestInfo: {
        typedLetters: 0,
        correctLetters: 0,
        accuracy: 0
    },
    showCard: false
};



export const getTypingInfo = createSlice({
    name: "typingInfo",
    initialState,

})

export const { wordsG } = getTypingInfo.actions
export default getTypingInfo.reducer