import { Grid } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Utils/firebase';
import ScrapNewsCard from './ScrapNewsCard';

const ScrapNewsList = ({ id }) => {
  const [newsData, setNewsData] = useState([]);
  const templateDocRef = doc(db, "scrap", id);

  const getNewsData = async() => {
    const newsCollectionRef = collection(templateDocRef, "news");
    const docsnap = await getDocs(newsCollectionRef);
    setNewsData(docsnap.docs.map((_doc) => (Object.assign(_doc.data(), {id : _doc.id}) )));
  }
  
  useEffect(() => {
    getNewsData();
  }, []);

  console.log(newsData);

  return (
    <Grid 
      container
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {newsData.map((data, idx) => (
        <Grid item xs={4} sm={4} md={4} key={idx} >
          <ScrapNewsCard 
            key={data.id}
            data={data}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ScrapNewsList;