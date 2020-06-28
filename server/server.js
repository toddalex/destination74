const express = require('express');
const request = require('request')
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()

const app = express();

const PORT = 3000;

// Body Parser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Static folder
app.use(express.static(path.join(__dirname, '../public'))) 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/send', (req, res) => {
  console.log(req.body)
  const { name, email, subject, message, submit, js } = req.body

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
    url: process.env.MC_URL ,
    method: 'POST',
    headers: {
      Authorization: process.env.MC_API
    },
    body: mcDataPost
  }

  if (email) {
    request(options, (err, response, body) => {
      if (err) {
        res.json({error: err})
      } else {
        if (js) {
          res.sendStatus(200);
        } else {
          console.log('get javascript')
          // res.redirect('/success.html')
        }
      }
    })
  } else {
    res.status(404).send({message: 'Failed'})
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


app.listen(PORT, ()=> console.log(`Server listening at Port ${PORT}...`))
