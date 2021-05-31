import React, { Fragment, useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getInnings, deleteMatch} from '../actions/inning';
import InningDisplay from './InningDisplay';
import './inning.css';
import Header from './Header'

const Inning = ({getInnings, deleteMatch, inning:{innings, addbatFlag, addbowlFlag}}) => {
    useEffect(() =>{    
        getInnings()
    },[getInnings, addbatFlag, addbowlFlag])

    const [showFlag, setShowFlag] = useState(true);

    const display = <div>
                        {showFlag? <InningDisplay  inning={innings[0]}/>
                        :<InningDisplay  inning={innings[1]}/>}
                    </div>


    return <Fragment>
                    {innings.length !== 0? 
                    <div>
                        <button className='mat' onClick={()=> deleteMatch()}>Start a New Match</button>
                        <button onClick={() => setShowFlag(true)} className={showFlag ? 'true': 'false'}>Inning 1</button>
                        <button onClick={() => setShowFlag(false)} className={showFlag ? 'false': 'true'}>Inning 2</button>
                        {display}
                    </div> 
                    : <Header />} 
        </Fragment>
}

Inning.propTypes = {
    getInnings: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    inning: state.inning
})

export default connect(mapStateToProps, {getInnings, deleteMatch})(Inning)
