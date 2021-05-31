const express =  require('express');
const connectDB = require('./config/db');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, true)
    }
};

// Connect Database
connectDB();

app.use(express.json({extended: false}));
app.use('/images', express.static('images'));

app.use(
    multer({ storage: fileStorage, fileFilter: filefilter}).single('image')
);


app.get('/', (req, res) => res.send('API Running'));

//routes
app.use('/api/inning', require('./routes/api/inning'))
//app.use('/match', require('./routes/match'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))