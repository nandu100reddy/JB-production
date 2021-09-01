import React, { useState } from 'react';
import List from './common/List';


const Records = props => {
  const { activeApplication, currentObject } = props;

  return <>
    <div className="recordsWrapper">
      <List activeApplication={activeApplication} currentObject={currentObject} />
    </div>
  </>
}


export default Records;
