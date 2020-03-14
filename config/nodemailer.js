const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure:false,
     auth:{
        user:'alpesh200720@gmail.com',
        pass:'@*alpeshgm@123'
    }
});

let renderTemplate = (data, relativePath)=>{
        let mailHTML;
        ejs.renderFile(
            path.join(__dirname,'../views/mailer',relativePath),
            data,
            function(err, template){
                if(err){
                    console.log("Error in rendering the template");
                    return;
                }

                mailHTML = template;

            }
        )

        return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate,
}