const nodemailer = require('nodemailer');

let auth = {
    user: 'emailid',//add the your email id 
    pass: 'add here', // create 16digit password,from here (https://myaccount.google.com/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4OxfCvLI8b0_qM7UslhHF-J-mPs4dq6LDXTAYUdRLD5lW4kHUNqe-0piddId5b1SD46GbY2nGcSXh3IIeZGJe_68xzJwx5G66dkYkgLSjHvlPw2aOM)
  }


function mailSender(to,from,joinUrl,topic,teacherName, date,time){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth
    });
    
    console.log("mail sender ---------")

    const mailOptions = {
      from: from,
      to: to,
      subject: `Invetation for Online ${topic} class at ${time} on ${date}` ,
      text: `Hi
                Inviting for online class of topic: ${topic}. Todays topic will be coverted by ${teacherName}, 
                Date: ${date},
                joining time : ${time}, 
                joining link : ${joinUrl}  
                
            Regards
            ${teacherName}`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
}


module.exports = mailSender;
