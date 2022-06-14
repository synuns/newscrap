import React, { useState, useEffect } from 'react';
import { db } from '../../Utils/firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import ScrapTemplateCard from './ScrapTemplateCard';
import { changeFormat } from '../../Utils/time';
import { Grid } from '@mui/material';

const ScrapList = () => {
  const [scrapData, setScrapData] = useState([]);
  const scrapCollectionRef = collection(db, "scrap");

  // onSnapshot(scrapCollectionRef, async(docSnap) => {
  //   // console.log(`on snap shot...`);
  //   const promises = docSnap.docs.map(async(_doc) => {
  //     const templateNewsRef = collection(scrapCollectionRef, _doc.id, "news");
  //     const newsList = await getDocs(templateNewsRef);
  //     const docData = _doc.data();

  //     const createdBy = changeFormat(docData.createdBy.toDate(), 'LL');
  //     const newsCount = newsList.docs.length;
  //     const images = newsList.docs.map((doc) => (doc.data().image));

  //     const template = {
  //       title : _doc.id,
  //       createdBy : createdBy,
  //       newsCount : newsCount,
  //       images: images,
  //     };

  //     return template;
  //   });

  //   setScrapData(await Promise.all(promises));
  // });

  const getScrapData = async () => {
    const docSnap = await getDocs(scrapCollectionRef);
  
    const promises = docSnap.docs.map(async(_doc) => {
      const templateNewsRef = collection(scrapCollectionRef, _doc.id, "news");
      const newsList = await getDocs(templateNewsRef);
      const docData = _doc.data();

      const createdBy = changeFormat(docData.createdBy.toDate(), 'LL');
      const newsCount = newsList.docs.length;
      const images = newsList.docs.map((doc) => (doc.data().image));

      const template = {
        title : _doc.id,
        createdBy : createdBy,
        newsCount : newsCount,
        images: images,
      };

      return template;
    });

    setScrapData(await Promise.all(promises));
  };

  useEffect(() => {
    getScrapData();
  }, []);
  
  return (
    <Grid 
      container
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {scrapData.map((template, idx) => (
        <Grid item xs={4} sm={4} md={4} key={idx} >
          <ScrapTemplateCard 
            key={idx}
            title={template.title}
            createdBy={template.createdBy}
            newsCount={template.newsCount}
            images={template.images}
          />
        </Grid>
      ))}
    </Grid>
  );
}


export default ScrapList;