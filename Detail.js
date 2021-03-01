import React from 'react';
import "./Detail.css";
const Detail = ({album, artists, name}) => {

    return (
        <div className="Detail" >
            <div className="img">
                <img 
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div className="Name">
                <label htmlFor={name} className="name">
                   Name: {name}
                </label>
            </div>
            <div className="Name1">
                <label htmlFor={artists[0].name} className="nameArtists">
                  Artists:  {artists[0].name}

                </label>
            </div>
        </div>
    );
}
export default Detail;