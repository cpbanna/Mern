import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import './AddBatsman.css';
import {ADD_BOWL_FLAG} from '../actions/types';
import {addBowler, scoreCard} from'../actions/inning';

class AddBowler extends PureComponent {
    state= {
        selectedFile: null,
        name: null,
        status: null,
        runs: 0,
        overs: 0,
        wickets: 0,
        noballa: 0,
        wides:0
    }

    bowlFlagHandler() {
        this.props.bowlFlag();
    }

    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});
    render() {
        return (
         <Fragment >
             <form className={this.props.addbowlFlag ? 'modal show' : 'modal'} onSubmit={e => {
                e.preventDefault();
                this.props.addbowl(this.props.id, this.state)
                setTimeout(() => {
                    this.props.updateScore(this.props.id)
                }, 2000)
                setTimeout(() => {
                    this.props.bowlFlag();
                }, 3000)
            }}>   
                 <label className='label'>Bowler Pic </label>
                 <input className='img' type="file"  name="image" required='true'
                 onChange={this.fileSelectHandler }/><br></br>
                 <label className='label'>Name </label>
                 <input className='text' type="text" name="name" required='true'
                 onChange={this.onChange }/><br></br>
                 <label className='label'>Status </label>
                 <select className='text' id="status" name="status" onChange={this.onChange } required='true'>
                    <option></option>
                    <option value="Bowling">Bowling</option>
                    <option value="Not Bowling">Not Bowling</option>
                </select><br></br>
                <label className='label'>Runs </label>
                <input className='text' type="text"  name="runs" required='true'
                 onChange={this.onChange }/><br></br>
                <label className='label'>Overs </label>
                <input className='text' type="text"  name="overs" required='true'
                 onChange={this.onChange }/><br></br>
                <label className='label'>Wickets</label> 
                <input className='text' type="text" name="wickets" required='true'
                 onChange={this.onChange }/><br></br>
                <label className='label'>No Balls</label>
                <input className='text' type="text" name="noballs" required='true'
                 onChange={this.onChange }/><br></br>  
                <label className='label'>Wides</label>
                <input className='text' type="text" name="wides" required='true'
                 onChange={this.onChange }/><br></br> 
                <div className='flex-box' > 
                  <input className='button' type="submit" value="Submit" />
                  <button className= 'button' onClick={this.bowlFlagHandler.bind(this)}>Close</button>
                </div>
             </form>
         </Fragment>   
        )
    }
}

const mapStateToProps = state => {
    return {
    addbowlFlag : state.inning.addbowlFlag  
 };
}

const mapDispatchToProps = dispatch => {
    return {
        bowlFlag : () => dispatch({type: ADD_BOWL_FLAG, payload: false}),
        addbowl: (id, formData) => dispatch(addBowler(id,formData)),
        updateScore : (id) => dispatch(scoreCard(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBowler);