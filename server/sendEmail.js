const { createInvoice } = require("./PDFInvoice/createInvoice.js");

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sendEmail = async (customerEmail, invoice) => {
  // Generate the pdf
  createInvoice(invoice, `tempInvoice/invoice${invoice.ponumber}.pdf`);

  // If an email was provided then email the new invoice
  if (customerEmail !== "") {
    setTimeout(() => {
      emailSend(customerEmail, invoice);
    }, 5000);
  } else {
    console.log("No email provided");
  }
};

module.exports = {
  sendEmail,
};

const emailSend = (customerEmail, invoice) => {
  pathToAttachment = "./tempInvoice/invoice" + invoice.ponumber + ".pdf";
  const fs = require("fs");
  attachment = fs.readFileSync(pathToAttachment);
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    ""
  );
  const msg = {
    to: customerEmail, // Change to your recipient
    from: "", // Change to your verified sender
    subject: "Polygon Invoice",
    text: "Please see the attached pdf invoice. Payment is due in 15 days.",
    html: "<strong>Please see the attached pdf invoice. Payment is due in 15 days.</strong>",
    attachments: [
      {
        content: attachment.toString("base64"),
        filename: "attachment.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
