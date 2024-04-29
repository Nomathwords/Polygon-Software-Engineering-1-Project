const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Invoice = require("./models/invoice.model");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./sendEmail.js");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Log a user in
app.post("/api/login", async (req, res) => {
  // Find the user in the database
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  // If valid user then sign a jwt token to the user and that will expire in 1 hour
  if (user) {
    const token = jwt.sign(
      {
        firstName: user.firstName,
        email: user.email,
      },
      "secret123",
      { expiresIn: "1h" }
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

// Create a new user
app.post("/api/register", async (req, res) => {
  // Attempt to create the user in the database
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    console.log(user);
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: "Duplicate email" });
  }
});

// Log the user out
app.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    console.log("logout successful");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.json({ status: "error", user: false });
  }
});

// Create an invoice
app.post("/api/invoice", async (req, res) => {
  // Get user information and find them in the database
  const temp = req.body.user;
  const email = temp.email;
  const user = await User.findOne({
    email: email,
  });
  const customerEmail = req.body.customerEmail;

  // Get the user id
  const id = user.id;

  // Find the user by their id and push the new invoice number into their list
  if (user) {
    await User.findByIdAndUpdate(id, {
      $push: { invoices: req.body.ponumber },
    });
  } else {
    return res.json({ status: "error", user: false });
  }

  // Try to create the invoice in the database
  try {
    const invoice = await Invoice.create({
      ponumber: req.body.ponumber,
      date: req.body.date,
      billto: req.body.billto,
      billfrom: user.firstName + " " + user.lastName,
      service: req.body.service,
      charges: req.body.charges,
      taxrate: req.body.taxrate,
      totalcharge: req.body.totalcharge,
      notes: req.body.notes,
    });

    // Call sendEmail which will generate the Invoice PDF and email it if an email was provided
    await sendEmail(customerEmail, invoice);

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "Not Created" });
  }
});

// Returns all the invoices of the specified user
app.post("/api/getInvoices", async (req, res) => {
  try {
    // Get the user
    const temp = req.body.user;
    const tuser = jwt.decode(temp);
    const email = tuser.email;
    const user = await User.findOne({
      email: email,
    });

    // Get the list of invoices associated with the user
    const invoices = user.invoices;

    // find the invoices
    const invoiceList = await Invoice.find({ ponumber: invoices });

    //return the invoices
    return res.json({ status: "ok", invoiceList: invoiceList });
  } catch (error) {
    return res.json({ status: "error", user: false });
  }
});

// Connect to DBMS and Listen
try {
  mongoose.connect(
    "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  app.listen(PORT, () => {
    console.log(`Mongoose Connected and Server started on Port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
