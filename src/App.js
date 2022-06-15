import './App.css';
import Banner from './Components/Banner';
import Explore from './Components/Explore';
import Nav from './Components/Nav';
import { MovieContext } from './Context/MovieContext';
import './Global.css';
import React, { useState } from 'react';

function App() {

  //default category selection
  const [exploreTitle, setExploreTitle] = useState({name: 'Action', id: 13});

  // default banner display
  const [bannerMovie, setBannerMovie] = useState({});

  return (
    <div className='Container'>
      <MovieContext.Provider value={{bannerMovie, setBannerMovie}}>
        <Nav setExploreTitle={setExploreTitle}/>
        <Banner />
        <Explore exploreTitle={exploreTitle}/>
      </MovieContext.Provider>
    </div>
  );
}

export default App;
