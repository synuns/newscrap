import { Autocomplete, Button, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { db } from '../../Utils/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const filter = createFilterOptions();

const ScrapModal = ({ onClose, data, url }) => {
  const [value, setValue] = useState(null);
  const [scrapTemplateList, setScrapFolderList] = useState([]);
  const scrapCollectionRef = collection(db, "scrap");

  const getScrapData = async () => {
    const docSnap = await getDocs(scrapCollectionRef);
    setScrapFolderList(docSnap.docs.map((doc) => ({title : doc.id})));
  };

  useEffect(() => {
    getScrapData();
  }, []);

  const onSubmit = async () => {
    const newscrapDocSnap = await getDoc(doc(db, "scrap", value.title));
    const time = Timestamp.now();
    if(!newscrapDocSnap.exists()) {
      await setDoc(doc(db, "scrap", value.title), {
        createdBy: time,
      });
    }

    const newScrapDoc = doc(scrapCollectionRef, value.title);

    const newCollectionRef = collection(newScrapDoc, "news");
    const scrapData = {
      title: data.title,
      url: url,
      image: data.image,
      content: data.content,
      published: data.published,
      createdBy: time,
    }

    await addDoc(newCollectionRef, scrapData);
  }
  
  const handleClickSubmit = () => {
    onSubmit();
    onClose();
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>스크랩하기</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ mb: 2 }}
        >
          스크랩할 템플릿을 선택하세요.
        </DialogContentText>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="scrap-list"
          options={scrapTemplateList}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(props, option) => <li {...props}>{option.title}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => ( 
            <TextField {...params} label="스크랩 템플릿" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClickSubmit}>스크랩</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScrapModal;