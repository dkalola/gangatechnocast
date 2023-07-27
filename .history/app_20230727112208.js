const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getStorage, listAll, ref } = require("firebase/storage");
const {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} = require("firebase/firestore"); // Use full Firestore package
const {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const firebaseConfig = require("./firebase"); // Import the configuration data

const app = express();

// Initialize Firebase with the configuration data
const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);
const auth = getAuth(fapp); // Get the Auth object
const storage = getStorage(fapp);
setPersistence(auth, browserLocalPersistence);

app.use(express.json()); // Parse JSON request bodies

// Set the template engine
app.set("view engine", "ejs");
app.use("/assets", express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// firebase auth middleware
function ensureAuthenticated(req, res, next) {
  const user = auth.currentUser;

  if (user) {
    // If the user is authenticated, proceed to the next middleware or route handler
    req.user = user;
    next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect("/login");
  }
}

app.get("/", (req, res) => {
  res.render("home", { activePage: "home", logout: false });
});
app.get("/about", (req, res) => {
  res.render("about", { activePage: "about", logout: false });
});

app.get("/wws", (req, res) => {
  res.render("services", { activePage: "services", logout: false });
});

const services = [
  {
    id: "PE",
    title: "Precision Engineering",
    img: "https://cdn.thomasnet.com/insights-images/embedded-images/ba20fdcd-10da-4764-b609-7f3507d2bb60/f7cef038-a108-404f-8212-c2f82adc16ea/Medium/modern-machining-tools-min.jpg",
    body: [
      "Our Precision Engineering services combine cutting-edge technology and expert craftsmanship to deliver components with exceptional accuracy and performance. From concept to production, we ensure seamless execution and offer tailored solutions for even the most complex engineering challenges.",
      "With a focus on precision, our engineering team utilizes advanced tools and techniques to transform ideas into reality. We take pride in delivering high-quality components that meet and exceed industry standards.",
    ],
  },
  {
    id: "PS",
    title: "Prototyping Solutions",
    img: "https://www.automation.com/getmedia/f9449c59-f021-4b9d-95fe-f9940a1590f8/PAE178---Image",
    body: [
      "Embrace innovation with our Prototyping Solutions, where ideas come to life. Our rapid prototyping techniques allow quick materialization of concepts, providing functional prototypes for testing and validation.",
      "From design refinement to the final iteration, we guide you through the journey of turning ideas into reality, ensuring your products are ready to perform in the real world.",
    ],
  },
  {
    id: "CCS",
    title: "Custom Casting Solutions",
    img: "https://bernierinc.com/wp-content/uploads/2018/02/download-600x350.jpg",
    body: [
      "Our Custom Casting Solutions offer a diverse range of casting processes tailored to your specific requirements. Whether it's investment casting, sand casting, or die casting, we have the expertise to provide efficient and cost-effective solutions.",
      "With an emphasis on quality and precision, we produce castings that meet the highest industry standards. Let our experienced team bring your designs to life through our advanced casting capabilities.",
    ],
  },
  {
    id: "MA",
    title: "Material Analysis",
    img: "https://mc-68095c24-9d47-44d2-a4ee-620361-cdn-endpoint.azureedge.net/-/media/images/services/materials-testing/chemical-analysis-preparation-640x480.jpg?rev=9fd0ba28146142b890b1e070ff7cd819",
    body: [
      "Unlock the full potential of your materials with our Material Analysis services. Through rigorous testing and analysis, we help you understand the characteristics and behavior of your materials under different conditions.",
      "Our state-of-the-art laboratory and experienced team ensure accurate results and valuable insights, enabling you to make informed decisions for your projects and applications.",
    ],
  },
  {
    id: "MS",
    title: "Machining Services",
    img: "https://i.ytimg.com/vi/osqX7iQEnuI/maxresdefault.jpg",
    body: [
      "Experience precision machining with our Machining Services. From simple components to complex parts, we utilize advanced CNC machines and skilled operators to achieve tight tolerances and impeccable finishes.",
      "Our commitment to delivering excellence in machining means you can rely on us for high-quality products that meet your exact specifications, every time.",
    ],
  },
  {
    id: "QI",
    title: "Quality Inspection",
    img: "https://www.compliancequest.com/wp-content/uploads/2023/06/quality-control-inspection-video.jpg",
    body: [
      "At Ganga Technocast, we prioritize quality through our comprehensive Quality Inspection services. Our dedicated team uses advanced inspection equipment to ensure each component undergoes rigorous checks for accuracy and adherence to standards.",
      "With our commitment to quality assurance, we guarantee the utmost reliability and consistency in every casting and manufacturing process.",
    ],
  },
];

// app.get("/service-d", (req, res) => {
//   res.render("service-details", { activePage: "services" });
// });

app.get("/service-d", (req, res) => {
  const serviceID = req.query.service;
  const service = services.find((service) => service.id === serviceID);
  if (!service) {
    // If the service is not found, you can handle the error or render an error page
    // res.status(404).send("Service not found");
    res.render("services", { activePage: "services", logout: false });
  } else {
    // Render the service-details page with the corresponding service data
    res.render("service-details", {
      activePage: "services",
      data: service,
      logout: false,
    });
  }
});
app.get("/projects", (req, res) => {
  res.render("projects", { activePage: "projects", logout: false });
});

app.get("/ic", (req, res) => {
  res.render("ic", { activePage: "ic", logout: false });
});

app.get("/contact", (req, res) => {
  res.render("contact", { activePage: "contact", logout: false });
});

app.get("/admin", ensureAuthenticated, (req, res) => {
  const listRef = ref(storage, "Gallery");
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
  res.render("admin", { activePage: "admin", logout: true, pg: "Gallery" });
});

app.get("/login", (req, res) => {
  res.render("login", { activePage: "login", logout: false });
});

// Handle login form submission
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Authenticate the user using Firebase Authentication
  // Implement the appropriate authentication method (e.g., email/password, Google login, etc.)

  // For example, using Firebase email/password authentication:
  signInWithEmailAndPassword(auth, email, password) // Use the auth object
    .then((userCredential) => {
      // User login successful
      const user = userCredential.user;
      console.log("User logged in:", user.email);
      // Redirect the user to the dashboard or any other page
      res.redirect("/admin");
    })
    .catch((error) => {
      // Handle login errors here
      console.error("Login error:", error.message);
      // Redirect the user back to the login page with an error message (if needed)
      res.redirect("/login?error=" + encodeURIComponent(error.message));
    });
});

app.get("/logout", (req, res) => {
  auth
    .signOut()
    .then(() => {
      // User logged out successfully
      console.log("User logged out.");
      res.redirect("/login");
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      res.redirect("/admin"); // Redirect to dashboard or any other page with an error message
    });
});

app.post("/submit-quote", async (req, res) => {
  const data = req.body;

  const edata = {
    service_id: "service_hymuzw5",
    template_id: "template_fowxi8q",
    user_id: "vt2reVETMnWQQXHcY",
    template_params: {
      reply_to: "divyanshukalola88@gmail.com",
      to_name: "Divyanshu Kalola",
      message:
        "We hope this email finds you well. Thank you for reaching out to us. We are thrilled that you have chosen to connect with Ganga Technocast.\n\nAt Ganga Technocast, we take immense pride in delivering precision-engineered casting solutions to meet our clients' unique requirements. Your interest in our services means a lot to us, and we are committed to providing you with the best possible assistance throughout your casting journey.\n\nWe have received your inquiry, and our dedicated team is already working to address your specific needs. Rest assured, we will spare no effort to offer tailored solutions and ensure your experience with us is seamless and productive.\n\nAs a leading investment casting firm, we combine cutting-edge technology and expert craftsmanship to deliver components of exceptional quality and accuracy. Whether you require custom casting solutions or material analysis, we have the expertise to meet your demands.\n\nOne of our casting specialists will be in touch with you shortly to discuss your project in detail and provide further information. If you have any immediate questions or concerns, feel free to contact us at [Your Contact Number] during our business hours.\n\nThank you once again for considering Ganga Technocast as your investment casting partner. We value your trust and look forward to forging a successful collaboration with you.\n\nWarm regards,",
    },
    accessToken: "gi7F2ZTOumVptVWajQ28Q",
  };

  const edata2 = {
    service_id: "service_hymuzw5",
    template_id: "template_z6kej7j",
    user_id: "vt2reVETMnWQQXHcY",
    template_params: {
      reply_to: "gangatechnocastllp@gmail.com",
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      from_subject: `Quote from ${data.name}`,
      from_message: `Material: ${data.material}\n${data.message}`,
      from_tag: "Received - Quote",
    },
    accessToken: "gi7F2ZTOumVptVWajQ28Q",
  };

  data.timestamp = Timestamp.now();
  try {
    // Reference to the Firestore collection where you want to store the data
    const quotesCollection = collection(db, "quotes");

    // Write the data to Firestore using the `add` method, which returns a promise
    const docRef = await addDoc(quotesCollection, data);
    console.log("Document written with ID: ", docRef.id);

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", edata2)
      .then((response) => {
        console.log("Email sent successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error.response.data);
        res.status(500).json({
          success: false,
          message: "Data is recoded but email was not able to sent.",
        });
      });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, message: "Error adding document" });
  }
});

app.post("/contact-us", async (req, res) => {
  const data = req.body;
  console.log(data);

  const edata = {
    service_id: "service_hymuzw5",
    template_id: "template_z6kej7j",
    user_id: "vt2reVETMnWQQXHcY",
    template_params: {
      reply_to: "gangatechnocastllp@gmail.com",
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      from_subject: data.subject,
      from_message: data.message,
      from_tag: "Received - Contact US",
    },
    accessToken: "gi7F2ZTOumVptVWajQ28Q",
  };

  data.timestamp = Timestamp.now();
  try {
    // Reference to the Firestore collection where you want to store the data
    const quotesCollection = collection(db, "contact_us");

    // Write the data to Firestore using the `add` method, which returns a promise
    const docRef = await addDoc(quotesCollection, data);
    console.log("Document written with ID: ", docRef.id);

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", edata)
      .then((response) => {
        console.log("Email sent successfully!", response.data);
        res
          .status(201)
          .json({ success: true, message: "Quote submitted successfully!" });
      })
      .catch((error) => {
        console.error("Error sending email:", error.response.data);
        res.status(500).json({
          success: false,
          message: "Data is recoded but email was not able to sent.",
        });
      });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, message: "Error adding document" });
  }
});

app.get("/test", async (req, res) => {
  const data = {
    service_id: "service_hymuzw5",
    template_id: "template_fowxi8q",
    user_id: "vt2reVETMnWQQXHcY",
    template_params: {
      reply_to: "divyanshukalola88@gmail.com",
      to_name: "Divyanshu Kalola",
      message:
        "We hope this email finds you well. Thank you for reaching out to us. We are thrilled that you have chosen to connect with Ganga Technocast.\n\nAt Ganga Technocast, we take immense pride in delivering precision-engineered casting solutions to meet our clients' unique requirements. Your interest in our services means a lot to us, and we are committed to providing you with the best possible assistance throughout your casting journey.\n\nWe have received your inquiry, and our dedicated team is already working to address your specific needs. Rest assured, we will spare no effort to offer tailored solutions and ensure your experience with us is seamless and productive.\n\nAs a leading investment casting firm, we combine cutting-edge technology and expert craftsmanship to deliver components of exceptional quality and accuracy. Whether you require custom casting solutions or material analysis, we have the expertise to meet your demands.\n\nOne of our casting specialists will be in touch with you shortly to discuss your project in detail and provide further information. If you have any immediate questions or concerns, feel free to contact us at [Your Contact Number] during our business hours.\n\nThank you once again for considering Ganga Technocast as your investment casting partner. We value your trust and look forward to forging a successful collaboration with you.\n\nWarm regards,",
    },
    accessToken: "gi7F2ZTOumVptVWajQ28Q",
  };
  try {
    // Make a POST request to the emailjs API
    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then((response) => {
        console.log("Email sent successfully!", response.data);
        res.json({ message: "Your mail is sent!" });
      })
      .catch((error) => {
        console.error("Error sending email:", error.response.data);
        res.status(500).json({ error: "Oops, something went wrong!" });
      });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ success: false, message: "Error adding document" });
  }
});







const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});