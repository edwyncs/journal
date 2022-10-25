import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
    // activeNote: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 12345,
    //     imagesUrls: []
    // }
}

export const journalSlices = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    savingNewNote: (state) => {
        state.isSaving = true;
    },
    setActiveNote: (state, action) => {
        state.activeNote = action.payload;
        state.messageSaved = '';
    },
    setNotes: (state, {payload}) => {
        state.notes = payload;
    },
    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
        //TODO: mensaje de error
    },
    updateNote: (state) => {
        state.isSaving = false;
        state.notes = state.notes.map(note => {
            if(note.id === state.activeNote.id) return state.activeNote
            return note
        });

        state.messageSaved = `${state.activeNote.title}, has been saved!`;
    },
    setPhotosToActiveNote: (state, {payload}) => {
        state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
        state.isSaving = false;
    },
    errorSavingNote: (state) => {
        state.isSaving = false;
        state.messageSaved = `error to upload image(s)!`;
    },
    deleteNoteById: (state, {payload}) => {
        state.activeNote = null;
        state.notes = state.notes.filter(note => note.id !== payload);

    },
    deletePhotosToActiveNote: (state, {payload}) => {
        state.activeNote.imageUrls = state.activeNote.imageUrls.filter(
            image => !payload.includes(image)
            )
        state.isSaving = false;
    }
  }
});

export const {
    addNewEmptyNote,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNoteById,
    errorSavingNote,
    deletePhotosToActiveNote
} = journalSlices.actions