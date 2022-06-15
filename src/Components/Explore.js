import React, { useState, useEffect } from 'react';
import Card from './Card';

function Explore ({exploreTitle}) {

  const [title, setTitle] = useState({name: 'Action', id: 13});

  // Listening on exploreTitle to set title

  useEffect( () => {
    setTitle(prevTitle => ({...prevTitle, name: exploreTitle.title, id: exploreTitle.id}) );
  }, [exploreTitle] );

  return(
    <div className="exploreContainer">
      <span className="exploreTitle">{title.name}</span>
      <input type="text" className="search" placeholder="Start exploring..."/>
      <Card categoryId={title.id}/>
    </div>
    )
};

export default Explore;
