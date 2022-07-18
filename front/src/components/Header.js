import { Fragment } from 'react';

import React from 'react'
import classes from './Header.module.css';


export default function Header() {
  return (
    <Fragment>
        <header className={classes.header}>
           <h1> Transaction App</h1>
           <h1>created by Eyal</h1>
           </header> 
    </Fragment>
   
  )
}
