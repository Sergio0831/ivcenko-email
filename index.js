const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
// app.use(cors());

// Parse incoming JSON and form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML form)
app.use(express.static('public'));

// Create a transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
	service: 'Gmail', // You can change this to your email service provider
	auth: {
		user: 'sergejs.ivcenko@gmail.com', // Your email address
		pass: 'frdexrhplvdbpkvl', // Your email password or app-specific password
	},
});

// Handle form submissions
app.post('/send', async (req, res) => {
	const { name, email, message } = await req.body;

	// Email content
	const mailOptions = {
		from: email, // Sender's email address
		to: 'sergejs.ivcenko@gmail.com', // Receiver's email address
		subject: 'Message from my new portfolio',
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	};

	try {
		// Send the email using async/await
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent: ', info.response);
		res.json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Error sending email: ', error);
		res.status(500).json({ success: false, message: 'Error sending email' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
