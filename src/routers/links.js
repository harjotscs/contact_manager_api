const express = require("express");
const flash = require("express-flash");
const morgan = require("morgan");
const Contact = require("../models/contact");

// const User = require("../models/user");

// const {
//   welcomeEmail,
//   verifyEmail,
//   resetEmail,
//   newsletterEmail,
// } = require("../emails/account");
// const { auth, notauth, adminAuth } = require("../middleware/auth");
// const { collection, db } = require("../models/user");

const router = express.Router();

// router.use(bodyParser.json({ limit: "50mb" }));
// router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// router.use(methodOverride("_method"));
router.use(flash());
// router.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: { maxAge: 180 * 60 * 1000 },
//   })
// );
// router.use(passport.initialize());
// router.use(passport.session());
router.use(morgan("dev"));
// router.use((req, res, next) => {
//   res.locals.session = req.session;
//   next();
// });

// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({ isExclusive: true });
//     if (!req.session.cart) {
//       return res.render("index", {
//         products,
//       });
//     }
//     const cart = new Cart(req.session.cart);
//     res.render("index", {
//       products,
//       cart: cart.generateArray(),
//     });
//   } catch (e) {
//     console.log(e);
//     res.send("Something Went Wrong");
//   }
// });

router.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome To Home Page");
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Something Went Wrong" });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ name: 1 });
    res.status(200).send(contacts);
  } catch (e) {
    res.status(500).send({ message: "Something Went Wrong" });
  }
});

router.get("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById({ _id: req.params.id });
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send({ message: "Something Went Wrong" });
  }
});

router.put("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send({ message: "Something Went Wrong" });
  }
});

router.post("/contact/add", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).send(contact);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

router.delete("/contact/delete/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(contact._id);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Something Went Wrong" });
  }
});
module.exports = router;
