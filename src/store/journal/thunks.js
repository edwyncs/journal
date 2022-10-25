import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { imageDestroy } from "../../helpers/imageDestroy";
import { addNewEmptyNote, deleteNoteById, deletePhotosToActiveNote, errorSavingNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlices";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        // uid
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body:'',
            imageUrls:[],
            date:new Date().getTime()
        };
        
        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`));
        const resp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        // dipatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());
        
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const noteToFirestore = {...activeNote};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

        await setDoc(docRef,noteToFirestore,{merge: true});

        dispatch(updateNote());
    };
};

export const startUploadingFiles = (files = []) => {
    return async(dispatch,getState) => {
        try {
            dispatch(setSaving());
            const fileUploadPromises = [];
            for (const file of files) {
                fileUploadPromises.push(fileUpload(file));
            }
    
            const photosUrls = await Promise.all(fileUploadPromises);
            dispatch(setPhotosToActiveNote(photosUrls));
        } catch (error) {
            dispatch(errorSavingNote());
        }
    };
};

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));
    }
}

export const startDeletingImage = (images = []) => {
    return async(dispatch) => {
        try {
            dispatch(setSaving());
            const imageDeletePromises = [];
            for (const image of images) {
                imageDeletePromises.push(imageDestroy(image));
            }
            const imagenesElim = await Promise.all(imageDeletePromises);
            dispatch(deletePhotosToActiveNote(images))
        } catch (error) {
            dispatch(errorSavingNote());
        }
    }
}