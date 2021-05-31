import axios from 'axios';
import {
    ADD_INNING,
    GET_INNING,
    ADD_BAT,
    ADD_BOWL,
    UPDATE_SCORE
} from './types'

export const register = (formData) => async dispatch => {
    const config = {
        header: {
            'Config-Type': 'application/json'
        }
    }

    try {
        const res =  await axios.post('/api/inning',formData, config)
        
        dispatch({
            type: ADD_INNING,   
            payload: res.data
        });
    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
    }
}

export const getInnings = () => async dispatch => {
    try {
        const res = await axios.get('/api/inning')
        dispatch({
            type: GET_INNING,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }       
    }
}

export const addBatsman = (id,formData) => async dispatch => {
    const fd = new FormData();
    fd.append('image', formData.selectedFile, formData.selectedFile.name)
    fd.append('runs', formData.runs)
    fd.append('name', formData.name)
    fd.append('status', formData.status ===  'Out' ? false: true )
    fd.append('balls', formData.balls)
    fd.append('fours', formData.fours)
    fd.append('sixes', formData.sixes)

    try {
        const res =  await axios.put(`/api/inning/bat/${id}`,fd) 

        dispatch({
           type: ADD_BAT,
           payload:res.data 
        })
        //dispatch(scoreCard(id))
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
    }
}


export const addBowler = (id,formData) => async dispatch => {
    const fd = new FormData();
    fd.append('image', formData.selectedFile, formData.selectedFile.name)
    fd.append('runs', formData.runs)
    fd.append('name', formData.name)
    fd.append('status', formData.status === 'Bowling' ? true: false)
    fd.append('overs', formData.overs)
    fd.append('wickets', formData.wickets)
    fd.append('noballs', formData.noballs)
    fd.append('wides', formData.wides)

    try {
        const res =  await axios.put(`/api/inning/bowler/${id}`,fd) 

        dispatch({
           type: ADD_BOWL,
           payload:res.data 
        })
        //dispatch(scoreCard(id))
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
    }
}

export const scoreCard = (id) => async dispatch => {
    try {
        const res = await axios.post(`/api/inning/${id}`)
        dispatch ({
            type: UPDATE_SCORE,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
    }
}

export const deleteMatch = () => async dispatch => {
    try {
        const res = await axios.delete('/api/inning')
        dispatch({
            type: GET_INNING,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }       
    }    
}

export const updateStatus = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/inning/${id}`)
        dispatch({
            type: GET_INNING,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            console.log(errors)
        }
    }
}




