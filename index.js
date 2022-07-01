const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080;
const Contact = require('./models/contact');
const Mail = require('./mailer');

//Listen app on 8080 port
app.listen(
    PORT,
    () => console.log(`Server is alive on http://localhost:${PORT}`)
);

//Connect to mongodb
const dbURI = 'mongodb+srv://innov:Innov237@cluster0.atjgx.mongodb.net/contact-us?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log('connection mongodb ok');
}).catch((error) => {
    console.log(error);
});


app.use(express.json());

//Save contact to database and send mail to user
app.post('/contact', (req, res) => {

    const contact = new Contact({
        firstName: req.body['firstName'],
        lastName: req.body['firstName'],
        email: req.body['email'],
        message: req.body['message']
    });
    
    //Save contact to database
    contact.save().then((result) => {

        //Send mail to user
        Mail.sendMail(req.body);

        //Return success response
        res.status(200).send(result);

    }).catch((err) => {
        console.log(err);
    });
});

//Get list of saved contact
app.get('/contact', (req, res) => {
    Contact.find().then((result) => {
        res.status(200).send({ result })
    }).catch((err) => {
        console.log(err);
    })
});

//Delete contact by id
app.delete('/contact/:id', (req, res) => {
    Contact.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
    })
})

