const nodemailer = require('nodemailer');
const credentials = require('./credentials.json')

module.exports = {
  sendGmail(req, res, callback) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: credentials.gmailUser,
        pass: credentials.gmailPass
      }
    })

    let mailOpts = {
      to: 'stephlarue27@gmail.com',
      subject: 'StephLaRue.tk: ' + req.body.email,
      text: req.body.name + ' ' + req.body.message
    }

    transporter.sendMail(mailOpts, (err, result) => {
      if (err) throw err;
      console.log('Message Sent');
      result = "Your message was sent!"
      callback(null, result)
      transporter.close();
    })
  }
}


if (!module.parent) {
  module.exports.sendGmail({}, {})
}
