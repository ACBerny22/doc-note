'use client'
import React from 'react';

function EmptyComponent({params} : any){

    // Get the postId from the router object's query
    

  return (
    <>
        {params.id}
    </>
  );
};

export default EmptyComponent;


