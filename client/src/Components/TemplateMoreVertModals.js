import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

export const EditTemplateModal = ({ id, onClose, onSubmit }) => {
  const [value, setValue] = useState(id);

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = () => {
    onSubmit(value);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>수정하기</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {id} 템플릿의 이름을 수정하시겠습니까?
        </DialogContentText>
        <TextField 
          defaultValue={id}
          onChange={onChange}
          sx={{
            mt: 2,
            width: '100%',
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
        >
          확인
        </Button>
        <Button 
          variant="outlined"
          onClick={handleClose}
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export const DuplicateTemplateModal = ({ id, onClose, onSubmit }) => {
  const [value, setValue] = useState(id);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>복사하기</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {id} 템플릿 복사본의 이름을 입력하세요.
        </DialogContentText>
        <TextField 
          defaultValue={id}
          onChange={onChange}
          sx={{
            mt: 2,
            width: '100%',
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
        >
          확인
        </Button>
        <Button 
          variant="outlined"
          onClick={handleClose}
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export const DeleteTemplateModal = ({ id, onClose, onSubmit }) => {

  const handleSubmit = () => {
    onSubmit();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>삭제하기</DialogTitle>
      <DialogContent>
        <DialogContentText>
          정말로 {id} 템플릿을 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          color="error"
          onClick={handleSubmit}
        >
          확인
        </Button>
        <Button 
          variant="outlined"
          onClick={handleClose}
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
};