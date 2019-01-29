const express =require('express');
const bodyParser= require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app= express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }))


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);



app.get('/',(req,res) => {
    res.render('index.html');
});

app.post('/send', (req, res) => {
    
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.Name}</li>
        <li>Email: ${req.body.Email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.Message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            // enter your gmail account
            user: 'rahulaws564@gmail.com',
            // enter your gmail password
            pass: 'Rahul@564'
        }
    });
      
    // setup email data with unicode symbols
    const mailOptions = {
        from:'Website <rahulaws564@gmail.com>', // sender address
        to: 'ezilonemarketingsolutions@gmail.com, ayush007saini@gmail.com', // list of receivers
        subject: 'Enquiry from Website', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        // res.render('contact', {msg:'Email has been sent'});
    });
    });
  

app.listen(3000, () => console.log('server started'));