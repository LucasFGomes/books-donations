import React, {useState} from 'react';

import Book from './Book'
import Donation from './Donation'

import { 
  ContainerNewDonate,
  ScrollViewNewDonate,
} from './style'

export default function NewDonate() {
  const [item, setItem] = useState(null) 

  function handleDonate(item) {
    setItem(item)
  }
  
  return (
    <ScrollViewNewDonate>
      <ContainerNewDonate>
        {item ? <Book item={item} handleDonate={handleDonate}/> : <Donation handleDonate={handleDonate}/>}
      </ContainerNewDonate>
    </ScrollViewNewDonate>
  );
}
