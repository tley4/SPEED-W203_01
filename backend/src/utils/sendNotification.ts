import sgMail from '@sendgrid/mail';
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

//To the send the email notification to the user
function sendNotificationEmail(userEmail, username) {
    const notification = {
        to: userEmail,
        from: {
            name:'SPEED',
            email: '2024tunetalk@gmail.com'
        },
        subject: '!NEW ARTICLE AWAITING!',
        text: 'There is a new article available to be viewed!',
        html: `<h2>Hello ${username}!</h2><p>It is time to post! <br><br>Click the link to post your current/recently played song for your friends to see!
        <br><br><a href="http://localhost:3000/dashboard">Post here</a></p>`
    };

    sgMail
        .send(notification)
        .then(() => {
            console.log('Notification Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

//To push a notification to the user's device 
// function pushNotification() {
//     notifier.notify({
//         appName: 'Tune Talk',
//         title: '!TIME TO TUNE IN!',
//         message: "It's time to post your current/recently played song!",
//         icon: path.join('http://localhost:3000/static/media/TuneTalkLogoBlack.16d0f5c9352a06b53052641b8fab2fac.svg'),
//         wait: true,
//         actions: ['Open']
//     }, (err, response, metadata) => {
//         if (metadata.activationType === 'actionClicked') {
//             const url = 'http://localhost:3000/feed';
//             exec(`start "" "${url}"`); // For Windows
//             // exec(`open "${url}"`); // For macOS
//         }
//     });
// }

module.exports = { sendNotificationEmail };