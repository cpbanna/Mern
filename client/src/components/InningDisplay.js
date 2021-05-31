import React, {Fragment, useEffect} from 'react'
import './InningDisplay.css';
import Batter from './Batter';
import Bowler from './Bowler';
import AddBatsman from  './AddBatsman';
import AddBowler from './AddBowler';
import {connect, useDispatch, useSelector } from 'react-redux';
import {ADD_BAT_FLAG, ADD_BOWL_FLAG} from '../actions/types'; 
import {updateStatus} from '../actions/inning';

const InningDisplay = ({updateStatus,
    inning : {
    _id,    
    inningStatus,  
    inningType,
    extras, 
    totruns, 
    wickets, 
    battingteam, 
    bowlingteam,
    battingCard,
    bowlingCard,
    totovers}}) => {  
    
    const dispatch = useDispatch();
    const addbatFlag = useSelector(state => state.inning.addbatFlag)
    const addbowlFlag = useSelector(state => state.inning.addbowlFlag)
    const batFlagHandler = () => {
        dispatch({type: ADD_BAT_FLAG, payload: true});
    };  
    const bowlFlagHandler = () => {
        dispatch({type: ADD_BOWL_FLAG, payload: true});
    };  
    

        
    return (
        <Fragment>
        <div className= 'flex-box'>
            <div>
                <p className='card'>
                    <span className='span'>Batting Card :- {battingteam}</span>  
                    <span className='span'>{totruns}/{wickets}</span>
                </p>
                <div className='flex-box-inside'>
                     <div>Pic</div>
                     <div>Name</div>
                     <div>Runs</div>
                     <div>Balls</div>
                     <div>4s</div>  
                     <div>6s</div>
                </div>
                {battingCard.map(bat => (
                        <Batter key={bat._id} batsman={bat}/>
                ))}
                {battingCard.length < 11 &&  inningStatus === 'Inprogress'?
                <button className = 'btn' onClick={batFlagHandler}>Add Batsman</button> :
                inningStatus === 'Yet to Bat' ? <h2>Yet to bat</h2> : 
                <h2>Inning Completed</h2> }
                {addbatFlag ?<AddBatsman id={_id} /> :<h1></h1>}
            </div> 
            <div>
                <p className='card'>
                    <span className='span'>Bowling Card :- {bowlingteam}</span> 
                    <span className='span'>Overs:-{totovers}</span> 
                    <span className='span'>Extras:-{extras}</span>
                </p>
                <div className='flex-box-inside'>
                     <div>Pic</div>
                     <div>Name</div>
                     <div>Overs</div>
                     <div>Runs</div>
                     <div>Wkts</div>        
                     <div>Ext</div>
                </div>
                {bowlingCard.map(bowl => (
                    <Bowler key={bowl._id} bowler={bowl}/>
                ))}
                {bowlingCard.length < 11 && inningStatus === 'Inprogress'?
                <button className = 'btn' onClick={bowlFlagHandler}>Add Bowler</button> :
                inningStatus === 'Yet to Bat' ? <h2>Yet to Bowl</h2>: <h2>Inning Completed</h2>}
                {addbowlFlag ? <AddBowler id={_id} />:<h1></h1>}
            </div>    
        </div>
        {inningStatus === 'Inprogress' ? <button className = 'mat' onClick={() => updateStatus(_id)}>Complete Inning</button> :
        inningType === '2nd' ? inningStatus === 'Yet to Bat'  ? 'Inning not started' : 
        'Match Completed' : 'Inning Completed'} 
        </Fragment>
    )
}  



export default connect(null,{updateStatus})(InningDisplay);

