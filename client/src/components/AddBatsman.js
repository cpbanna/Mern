import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import './AddBatsman.css';
import {ADD_BAT_FLAG} from '../actions/types';
import {addBatsman, scoreCard} from'../actions/inning';

class AddBatsman extends PureComponent {
    state= {
        selectedFile: null,
        name: null,
        status: null,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
    }

    batFlagHandler() {
        this.props.batFlag();
    }

    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    } 

    render() {
        return (
         <Fragment >
             <form className={this.props.addbatFlag ? 'modal show' : 'modal'} onSubmit={e => {
                e.preventDefault();
                this.props.addbat(this.props.id, this.state)
                setTimeout(() => {
                    this.props.updateScore(this.props.id)
                }, 2000);
                setTimeout(() => {
                    this.props.batFlag();
                }, 4000);
            }}>   
                 <label className='label'>Batsman Pic </label>
                 <input className='img' type="file"  name="image" required='true'
                 onChange={this.fileSelectHandler }/><br></br>
                 <label className='label'>Name </label>
                 <input className='text' type="text" name="name" required='true'
                 onChange={this.onChange }/><br></br>
                 <label className='label'>Status </label>
                 <select className='text' name="status" onChange={this.onChange } required='true'>
                    <option></option>
                    <option value="Out">Out</option>
                    <option value="Not Out">Not Out</option>
                </select><br></br>
                <label className='label'>Runs </label>
                <input className='text' type="text"  name="runs" required='true'
                     onChange={this.onChange }/><br></br>
                <label className='label'>Balls </label>
                <input className='text' type="text"  name="balls" required='true'
                 onChange={this.onChange }/><br></br>
                <label className='label'>Fours </label> 
                <input className='text' type="text" name="fours" required='true'
                 onChange={this.onChange }/><br></br>
                <label className='label'>Sixes </label>
                <input className='text' type="text" name="sixes" required='true'
                 onChange={this.onChange }/><br></br>  
                <div className='flex-box-bat' > 
                  <input className='button' type="submit" value="Submit" />
                  <button className= 'button' onClick={this.batFlagHandler.bind(this)}>Close</button>
                </div>
             </form>
         </Fragment>   
        )
    }
}

const mapStateToProps = state => {
    return {
    addbatFlag : state.inning.addbatFlag  
 };
}

const mapDispatchToProps = dispatch => {
    return {
        batFlag : () => dispatch({type: ADD_BAT_FLAG, payload: false}),
        addbat: (id, formData) => dispatch(addBatsman(id,formData)),
        updateScore: (id) => dispatch(scoreCard(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBatsman);