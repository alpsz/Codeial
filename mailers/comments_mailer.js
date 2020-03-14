const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) =>{
    let htmlString = nodeMailer.renderTemplate({
        comment:comment,
        
    },'/comments/new_comment.ejs');
    console.log("inside new comment mailer");

    nodeMailer.transporter.sendMail({
        from:'codeial.com',
        to:comment.user.email,
        subject:"New comment published",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log("Error in sending the mail",err);
        }
        console.log("Message sent",info);
        return;
    });
}