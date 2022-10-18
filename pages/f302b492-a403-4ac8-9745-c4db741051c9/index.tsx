import { NextPage } from 'next'
import React from 'react'
import PrivateUploadComponent from './PrivateUploadComponent'
import Cookies from 'js-cookie';
import { object } from 'yup';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';




const index = (LOGIN_DATA:Object) => {

  
  if (LOGIN_DATA === undefined || Object.values(LOGIN_DATA).toString() !== 'St1wYqtz7Hao1t3cDXwOCzzcc8m1'){
    return (
      <div></div>
    )
  }
  else{

    return (
      <PrivateUploadComponent />
    )
  }
  


}

export default index

export function getServerSideProps({ req, res }){
  
  if('LOGIN_DATA' in req.cookies){
    
    const jwt =  req.cookies.LOGIN_DATA;
    const decoded = verify(jwt, process.env.JWT_SECRET);
    
    return { props: { LOGIN_DATA : decoded.LOGIN_DATA}};
  }
   else {
    return { props: { LOGIN_DATA : '' }};
  }
}