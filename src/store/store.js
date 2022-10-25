import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlices } from './journal/journalSlices';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlices.reducer
    },
});