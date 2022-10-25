import { AddPhotoAlternateOutlined, DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { startDeletingImage, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal";
import { setActiveNote, updateNote } from "../../store/journal/journalSlices";
import { ImageGallery } from "../components";
import 'sweetalert2/dist/sweetalert2.css';
import Swal from "sweetalert2";

export const NoteView = () => {
    
    const dispatch = useDispatch();
    const {activeNote, messageSaved, isSaving} = useSelector(state => state.journal);
    const {title, body, date, onInputChange, formState} = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date).toUTCString();
        return newDate;
    }, [date])

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState])
    
    useEffect(() => {
        if(messageSaved.length > 0 && !messageSaved.includes('error')){
            Swal.fire('Updated Note', messageSaved, 'success');
        }
    }, [messageSaved])

    useEffect(() => {
        if(messageSaved.length > 0 && messageSaved.includes('error')){
            Swal.fire('Upload Image(s)', messageSaved, 'error');
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
        // console.log('subiendo imagenes');
        dispatch(startUploadingFiles(target.files));
    } 

    const onDeleteNote = () => {
        dispatch(startDeletingImage(activeNote.imageUrls));
        dispatch(startDeletingNote());
    }

  return (
    <Grid container direction='row' justifyContent='space-between' sx = {{mb: 1}}
      className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='ligth'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button component='label' disabled={isSaving}>
                <AddPhotoAlternateOutlined sx={{fontSize: 20, mr:1}}/>
                Upload
                <input 
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={onFileInputChange}
                />
            </Button>
            <Button 
                disabled={isSaving}
                color="primary"
                sx={{padding:2}} 
                onClick={onSaveNote}
            >
                <SaveOutlined sx={{fontSize: 20, mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingresa un titulo"
                label="Titulo"
                sx={{border: 'none', mb: 1}}
                name='title'
                onChange={onInputChange}
                value={title}
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio el dia de hoy?"
                sx={{border: 'none', mb: 1}}
                minRows={3}
                name='body'
                onChange={onInputChange}
                value={body}
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={onDeleteNote}
                sx={{mt: 2}}
                color='error'
            >
                <DeleteOutline/>
                Delete
            </Button>
        </Grid>
        {/* Galeria de imagenes */}
        <ImageGallery images={activeNote.imageUrls}/>
    </Grid>
  )
};