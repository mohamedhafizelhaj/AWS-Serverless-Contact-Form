const AWS = require('aws-sdk')
const sesService = new AWS.SES()

exports.handler = async (event) => {

    const {name, email, message} = JSON.parse(event.body)

    const params = {
        Destination: {
            ToAddresses: ['our@email.com'],
        },
        Message: {
            Body: {
                Text: {
                    Data: message,
                },
            },
            Subject: {
                Data: `New email from ${name} at ${email}`,
            },
        },
        Source: 'mohhafiz001@gmail.com',
    };

    try {
        await sesService.sendEmail(params).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4566',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': '*',
            },
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (err) {
        console.error('Error sending email:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email', error: err.message }),
        };
    }
};