import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Link, TextField, Typography } from '@mui/material';
import { db } from '../Utils/firebase';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const Scrap = () => {
  const [input, setInput] = useState({
    title: '',
    url: ''
  });

  const [data, setData] = useState([]);

  const colRef = collection(db, "scrap");
  const newScrapRef = doc(colRef);

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({
        ...input,
        [name]:value
    });
  };

  const handleClick = async() => {
    if(input.title !== '' && input.url !== ''){
      await setDoc(newScrapRef, input);
      input.title = '';
      input.url = '';
    }
  };

  useEffect(() => {
    const getData = async() => {    
      const docsSnap = await getDocs(colRef);
      setData(docsSnap.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getData();
  }, [colRef]);

  return (
    <Container>
      <Card
        sx={{
          m: 2,
          p: 1,
        }}
      >
        <TextField 
          name="title" 
          label="title" 
          onChange={handleChange} 
          value={input.title}
          sx={{ m: 2 }}
        />
        <TextField 
          name="url" 
          label="url" 
          onChange={handleChange} 
          value={input.url}
          sx={{ m: 2 }}
        />
        <Button onClick={handleClick}>추가</Button>
      </Card>
      <Box>
        {data.map((news) => (
          <Card
            key={news.id}
            sx={{
              m: 2,
              p: 1
            }}
          >
            <Typography
              variant="h5"
            >
              {news.title}
            </Typography>
            <Typography
              variant="caption"
            >
              <Link href={news.url}>
                {news.url}
              </Link>
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default Scrap;