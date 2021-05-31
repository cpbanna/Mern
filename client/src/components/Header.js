import React, { Fragment, useState, useEffect } from 'react'
import './Header.css';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {register} from '../actions/inning';

const Header = ({
    register
}) => {
    const [formData, setFormData] = useState({
        battingteam: '',
        bowlingteam: '',
        inningStatus: '',
        inningType: ''
    })
    const [secondInn, setSecondInn] = useState({
        battingteam: '',
        bowlingteam: '',
        inningStatus: 'Yet to Bat',
        inningType: '2nd'
    })

    const onChange = e => setFormData({...formData, inningStatus: 'Inprogress', inningType: '1st', [e.target.name]: e.target.value});

    useEffect(() => {
      setSecondInn({
        ...secondInn,    
        battingteam: formData.bowlingteam,
        bowlingteam: formData.battingteam,  
      })    
    },[formData, secondInn])
    return (
        <Fragment>  
            <h3>Add Innings Details</h3>
            <form onSubmit={e => {
                e.preventDefault();
                register(formData);    
                register(secondInn);       
            }}>
                <input className = 'text' type="text" placeholder="Batting Team" name="battingteam" 
                 onChange={e => onChange(e) }/><br></br>
                <input className = 'text' type="text" placeholder="Bowling Team" name="bowlingteam" 
                 onChange={e => onChange(e) }/><br></br>
                <input className = 'submit' type="submit" value="Submit" />
            </form>
        </Fragment> 
    )
}

Header.propTypes = {
    register: PropTypes.func.isRequired,
}

export default connect(null,{register})(Header)
