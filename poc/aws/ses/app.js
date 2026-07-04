import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
});

async function sendEmail() {
  const params = {
    Source: "anilkharabe1@gmail.com",
    Destination: {
      ToAddresses: ["anilkharabe1@gmail.com"],
    },
    Message: {
      Subject: {
        Data: "Hello from AWS SES",
      },
      Body: {
      Html: {
        Data: `
          <h1>Welcome</h1>
          <p>This is an HTML email sent using <b>AWS SES</b>.</p>
        `,
      },
    },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log("Email sent!");
    console.log(response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

sendEmail();