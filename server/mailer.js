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
      from: '"Stephanie LaRue" <stephlarue26@gmail.com>',
      to: 'stephlarue26@gmail.com',
      subject: 'Message from StephLaRue.tk',
      text: req.body.message
    }

    transporter.sendMail(mailOpts, (err, result) => {
      if (err) throw err;
      console.log('Message Sent');
      callback(null, result)
      transporter.close();
    })
  }
}


if (!module.parent) {
  module.exports.sendGmail({}, {})
}
