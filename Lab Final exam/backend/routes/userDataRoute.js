const express = require("express");
const router = express.Router();
const userData = require("../models/userDataModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, age } = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
// REGISTER LOGIN
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // check if email exists
    userData
      .findOne({ email: email })

      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(password, user.password)

          // if the passwords match
          .then((passwordCheck) => {
            // check if password matches
            if (!passwordCheck) {
              return res.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }

            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              process.env.JWT_KEY,
              { expiresIn: "24h" }
            );

            //   return success res
            res.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        res.status(404).send({
          message: "Email not found",
          e,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// REGISTER USER
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, age } = req.body;
  try {
    // hash the password
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        // save the new user
        userData
          .create({
            name: name,
            email: email,
            age: age,
            password: hashedPassword,
          })
          .then((result) => {
            // return success if the new user is added to the database successfully
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            res.status(500).send({
              message: error.errorResponse.errmsg,
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/", auth, async (req, res) => {
  try {
    const allUsers = await userData.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET the current logged in user
router.get("/me", auth, async (req, res) => {
  const userId = req?.user.userId;
  try {
    const singleUser = await userData.findById(userId);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;
  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
