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

app.set('port',(process.env.PORT || 3000));


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
        <li>Phone: ${req.body.Phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.Message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        secure : true,
        port: 465,

        auth: {
           type: "OAuth2",
            user: 'ayush007saini@gmail.com',
            clientId:"695358730166-ffimglg69q21coc5u9md2beqe3563k8e.apps.googleusercontent.com",            
            clientSecret:"jfL1hRIQCyWr9SRvVJBk9u8X",
            refreshToken: "1/lxoAA5hPB9I9JTPfI4ffPqccNp7y2qWzESCNUWMgydGqLe4V-PaWlk85NwzYUX0i",
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
    res.redirect("/");
    });
  

app.listen(app.get('port'), () => console.log('server started'));




