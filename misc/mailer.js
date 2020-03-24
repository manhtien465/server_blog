const nodemailer=require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

const key=require('../config/key')
const config =require('../config/mailer')
signToken = users => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: users._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, key.jwt.JWT_SECRET);
}
const tranport=nodemailer.createTransport(smtpTransport(
  
{

        service:"gmail",
        host: 'smtp.gmail.com',
        
        auth: {
            user: key.gmail.username, //Tài khoản gmail vừa tạo
            pass: key.gmail.pass //Mật khẩu tài khoản gmail vừa tạo
        },
      tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})
)

const sendConfirmationEmail= async(users)=>{
    const token=signToken(users)
    const url=`http://localhost:3402/login/${token}`
   tranport.sendMail({
       from:"xoaycodeeasy@gmail.com",
       to:`${users.email}`,
       subject:"Confirmation Email",
       html:`Confirmation email <a href=${url}>${url}</a>`
   }).then(()=>{
       console.log("email sent");
       
   })
   

}
const sendConfirmationEmailToChangepassword= async(users)=>{
    const token=signToken(users)
    const url=`http://localhost:3402/login/forgotpassword/verify/${token}`
   tranport.sendMail({
       from:"xoaycodeeasy@gmail.com",
       to:`${users.email}`,
       subject:"Confirmation Email",
       html:`Confirmation email <a href=${url}>${url}</a>`
   }).then(()=>{
       console.log("email sent");
       
   })
   

}
exports.sendConfirmationEmailToChangepassword=sendConfirmationEmailToChangepassword
exports.sendConfirmationEmail=sendConfirmationEmail