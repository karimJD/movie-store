import React, { useEffect } from "react";
import '../Global.css';

function Nav ({setExploreTitle}) {

    const HandleClick = (title, id) => {
        window.scrollTo({left: 0, top: document.body.scrollHeight,  behavior: 'smooth'});
        setExploreTitle({title, id});
    };
   
    return (
        <div className="nav">
            <button className='buttons' onClick={ () => HandleClick("Action", 13) }> <span className='itemText'>Action</span></button>
            <button className='buttons' onClick={ () => HandleClick("Drama", 11) }><span className='itemText'>Drama</span></button>
            <button className='buttons' onClick={ () => HandleClick("Horror", 15) }><span className='itemText'>Horror</span></button>
            <button className='buttons' onClick={ () => HandleClick("Sifi", 16) }><span className='itemText'>SiFi</span></button>
            <button className='buttons' onClick={ () => HandleClick("Romance", 17) }><span className='itemText'>Romance</span></button>
            <button className='buttons' onClick={ () => HandleClick("Comedy", 12) }><span className='itemText'>Comedy</span></button>
        </div>
      );
}

export default Nav;