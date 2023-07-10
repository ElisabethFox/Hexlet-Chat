import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
    }
});

export const { addMessage } = messageSlice.actions;
export { messagesAdapter };
export default messageSlice.reducer;
