import { Close, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startDeletingImage, startSavingNote } from "../../store/journal";

export const ImageGallery = ({images}) => {

  const {isSaving,} = useSelector(state => state.journal)
  const dispatch = useDispatch();

  const onDeleteImage = (image) => {
    dispatch(startDeletingImage([image]));
    dispatch(startSavingNote());
  }
  
  return (
    <Box sx={{ width: '100%', height: '100'}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem 
            key={image} 
            
          >
            <ImageListItemBar
            className="hidden-button"
              sx = {{background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',}}
              position='top'
              actionIcon={
                <IconButton
                  disabled={isSaving}
                  sx={{color: 'white'}}
                  onClick={() => onDeleteImage(image)}
                  title="delete image"
                >
                  <Close />
                </IconButton>
              }
            >
            </ImageListItemBar>
            <img
              src={`${image}?w=248&fit=crop&auto=format`}
              srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt='notas img'
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};