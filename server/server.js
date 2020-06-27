const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/send', (req, res) => {
  console.log(req.body)

  const email = req.body.email

  const mcData = {
    members: [
      {
        email_address: email,
        status: 'subscribed'
      }
    ]
  }

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: process.env.MC_URL,
    method: 'POST',
    headers: {
      Authorization: process.env.MC_AUTH
    },
    body: mcDataPost
  }

  if (email) {
    request(options, (err, response, body) => {
      if (err) {
         res.json({error: err})
      } else {
        if (req.body.js) {
          res.sendStatus(200);
        } else {
          console.log('success!!!!')
          // res.redirect('/success.html')
        }
      }
    })
  } else {
    res.status(404).send({mesage: 'Failed'})
  }
})

// unkown route handler
app.use('*', (req, res)=> {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, console.log(`Server listening at Port ${PORT}...`));