require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//import routes

const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.send('API is running');
})



app.use('/api/auth', authRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch(err => {
    console.log(err);
});

