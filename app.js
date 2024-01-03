const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');


app.use(express.json());
app.use(methodOverride('_method'));
app.use('/users', router);
app.use('/blogs', blogRouter);


mongoose.connect('mongodb+srv://samilogluozancan:geparltFLJFsFGtC@socialmediacluster.ocx0alh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!")
        console.log(err)
    })


app.use('/', (req, res) => {
    res.send('Welcome')
});

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});

