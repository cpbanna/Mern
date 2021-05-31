import React, { Fragment} from 'react';
import './Bowler.css';

export const Bowler = ({
    bowler : {runs, overs, wides, noballs, imageUrl, name, status, wickets}
}) => {
    const extra = wides + noballs
    return (
        <Fragment>
            <div className= 'flex-box'>
                <div><img className='image' src={imageUrl} alt={name}/></div>
                <div>{name}{status===true ? '*' : ''}</div>
                <div>{overs}</div>
                <div>{runs}</div>
                <div>{wickets}</div>  
                <div>{extra}</div>    
            </div>
        </Fragment>
    )
}

export default Bowler;