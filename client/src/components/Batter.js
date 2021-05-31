import React, { Fragment} from 'react';
import './Batter.css';

export const Batter = ({
    batsman : {runs, balls, fours, sixes, imageUrl, name, status}
}) => {
    return (
        <Fragment>
            <div className= 'flex-box'>
                <div><img className='image' src={imageUrl} alt={name}/></div>
                <div>{name}{status===true ? '*' : ''}</div>
                <div>{runs}</div>
                <div>{balls}</div>
                <div>{fours}</div>  
                <div>{sixes}</div>    
            </div>
        </Fragment>
    )
}

export default Batter;