const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');;
const Inning = require('../../models/Inning');
const fs = require('fs');
const path = require('path');
const { db } = require('../../models/Inning');


//Get All Innings
router.get('/', async(req, res) => {
    try {
        const innings = await Inning.find()
        
        res.json(innings)
    } catch (err) {
        console.error(err.message); 
    }
})

// Post a inning
router.post('/',
    [
            check('battingteam', 'battingteam is required').not().isEmpty(),
            check('bowlingteam', 'bowlingteam is required').not().isEmpty(),
            check('inningStatus', 'inningStatus is required').not().isEmpty(),
            check('inningType', 'inningType is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const newInning = new Inning({
                battingteam : req.body.battingteam,
                bowlingteam : req.body.bowlingteam,
                inningStatus : req.body.inningStatus,
                inningType : req.body.inningType
            })

            const inning = await newInning.save()
            res.json(inning)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
})

// add a batsman
router.put('/bat/:id', 
        [
            check('name', 'Name is required').not().isEmpty(),
            check('status', 'Status is required').not().isEmpty()
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
    
            try {
                const inning = await Inning.findById(req.params.id)
                const newBatsman = {
                    imageUrl : req.file.path,
                    name: req.body.name,
                    status: req.body.status,
                    runs: req.body.runs,
                    balls: req.body.balls,
                    fours: req.body.fours,
                    sixes:  req.body.sixes
                }
    
                inning.battingCard.push(newBatsman);
                const innings = await inning.save()
                res.json(innings);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
)

// add a bowler
router.put('/bowler/:id', 
        [
            check('name', 'Name is required').not().isEmpty(),
            check('status', 'Status is required').not().isEmpty()
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
    
            try {
                const inning = await Inning.findById(req.params.id)
                const newBowler = {
                    imageUrl : req.file.path,
                    name: req.body.name,
                    status: req.body.status,
                    runs: req.body.runs,
                    overs: req.body.overs,
                    wides: req.body.wides,
                    noballs:  req.body.noballs,
                    wickets: req.body.wickets
                }
    
                inning.bowlingCard.push(newBowler);
                const innings = await inning.save()
                res.json(innings);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
)


// Score Card
router.post('/:id', async(req, res) => {
    try {
        const inning = await Inning.findById(req.params.id);
        if(!inning) {
            return res.status(404).json({msg: 'There is no match'});
        }

        const wides = inning.bowlingCard.reduce((sum, bowl) => {
            return  bowl.wides + sum
        },0)

        const noBalls = inning.bowlingCard.reduce((sum, bowl) => {
            return  bowl.noballs + sum
        },0)

        const overs = inning.bowlingCard.reduce((sum, bowl) => {
            return bowl.overs + sum
        },0.0)

        const wickets = inning.battingCard.filter((bat) => {
            return bat.status === false
        })

        const runs = inning.battingCard.reduce((sum, bat) => {
            return bat.runs + sum
        },0)

        // console.log(overs)

        inning.extras = wides + noBalls
        inning.totruns = wides + noBalls + runs
        inning.totovers = overs
        inning.wickets = wickets.length

        // console.log(req)
        // inning.inningStatus = req.body.inningStatus
        await inning.save()
        res.json(inning)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// Delete innings
router.delete('/', async(req, res) => {
    const directory = 'images';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            });
        }
    });

    try {
        db.collection('innings').deleteMany({})
        const innings = await Inning.find()
        
        res.json(innings)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//Update status
router.put('/:id', async(req, res) => {
    try {
        const innings = await Inning.find()

        if(innings[0]._id == req.params.id) {
            const innings1 = await Inning.findById(innings[0]._id) 
            innings1.inningStatus = 'Completed'
            await innings1.save()

            const innings2 = await Inning.findById(innings[1]._id) 
            innings2.inningStatus = 'Inprogress'
            await innings2.save()
        } 

        if(innings[1]._id == req.params.id) {

            const innings2 = await Inning.findById(innings[1]._id) 
            innings2.inningStatus = 'Completed'
            await innings2.save()
        }

        const inningss = await Inning.find()
        res.json(inningss)       
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    } 
})


module.exports = router;