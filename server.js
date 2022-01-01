require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/name', (req, res) => {
    if(req.body.name) {
        return res.json({name: req.body.name});
    } else {
        return res.status(400).json({error: 'No name provided'});
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})