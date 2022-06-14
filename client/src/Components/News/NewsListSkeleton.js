import React from 'react'
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsListSkeleton = ({ num }) => {
  return (
    <>
      {[...Array(num)].map((n, idx) => (
        <NewsCardSkeleton />
      ))}
    </>
  );
}

export default NewsListSkeleton;