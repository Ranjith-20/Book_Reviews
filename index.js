require('dotenv').config()
const express = require('express');
const app = express();


//Database destructure / Connect //
const { connectToDB, Review } = require("./mongodb");
connectToDB();


const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');


// Enabling EJS, setting an absolute route //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


//Serving static style files//
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));     


//In construction//
const passport = require('passport');
const localStrategy = require('passport-local');


//        //        ROUTES    //        //        // 

app.get('/', (req, res) => {
          res.render('homepage')
})

app.get('/about', (req, res) => {
          res.render('about')
})


app.get('/reviews', async (req, res) => {
          const results = await Review.find({});
          res.render('reviews', { results })
});

app.get('/reviews/:id', async (req, res) => {
          const { id } = req.params;
          const review = await Review.findById(id);
          res.render('show', { review })
});


app.get('/addreview', (req, res) => {
          res.render('addreview')
})



app.post('/reviews', async (req, res) => {
          const newRev = new Review(req.body);
          await newRev.save();
          res.redirect(`/reviews/${newRev._id}`);
})

app.get('/reviews/:id/edit', async (req, res) => {
          const { id } = req.params;
          const review = await Review.findById(id);
          res.render('edit', { review })
});

app.put('/reviews/:id', async (req, res) => {
          const { id } = req.params;
          const review = await Review.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
          res.redirect(`/reviews/${review._id}`)
});

app.delete('/reviews/:id', async (req, res) => {
          const { id } = req.params;
          const deletedRev = await Review.findByIdAndDelete(id);
          res.redirect('/reviews')
});


//Any other route//

app.use((req, res) => {
          res.render('404')
})

app.listen(process.env.PORT, () => {
          console.log(`Listening on: ${process.env.PORT}!`)
})