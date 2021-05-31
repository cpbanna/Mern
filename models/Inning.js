const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InningSchema = new Schema({
    battingteam : {
        type: String,
        required: true 
    },
    bowlingteam : {
        type: String,
        required: true
    },
    inningStatus : {
        type: String,
        default: 'Progress'
    },
    inningType: {
        type: String,
        default: '1st'
    },
    battingCard: [
        {
            imageUrl: {
                type: String,
            },
            name: {
                type: String,
            },
            status: {
                type: Boolean,
            },
            runs : {
                type: Number,
                default: 0
            },
            balls : {
                type: Number,
                default: 0
            },
            fours: {
                type: Number,
                default: 0
            },
            sixes: {
                type: Number,
                default: 0
            }    
        }
    ],
    bowlingCard: [
        {
            imageUrl: {
                type: String,
            },
            name: {
                type: String,
            },
            status: {
                type: Boolean,
            },
            runs : {
                type: Number,
                default: 0
            },
            overs : {
                type: Number,
                default: 0.0
            },
            wides: {
                type: Number,
                default: 0
            },
            noballs: {
                type: Number,
                default: 0
            },
            wickets: {
                type: Number,
                default: 0
            }
        }
    ],
    extras : {
        type: Number,
        default: 0
    },
    totruns: {
        type: Number,
        default: 0
    },
    wickets: {
        type: Number,
        default: 0
    },
    totovers: {
        type: Number,
        default: 0.0  
    }

})

module.exports = Inning = mongoose.model('inning', InningSchema)