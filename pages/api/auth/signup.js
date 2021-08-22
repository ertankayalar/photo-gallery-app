import axios from "axios";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  console.clear();
  // is authenticated
  const session = await getSession({ req: req });

  if (session) {
    res.status(401).json({ message: "Already authenticated!" });
    return;
  }

  const data = req.body;
  const { email, password, subscribe } = data;
  console.log("email", email);
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "invalid input - password should also be least 7 characters long",
    });
    return;
  }

  // check email is exist ?
  const existingUser = await axios.get(
    `${process.env.API_URL}/users/?email=${email}`
  );
  console.log(`existingUser`, existingUser);

  if (existingUser.error) {
    res.status(422).json({ message: "user exists already" });
    console.log("user exist");
    return;
  }

  // create user

  const result = await axios
    .post(`${process.env.API_URL}/users`, {
      username: email,
      email: email,
      password: password,
      subscribe: subscribe,
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  console.log(`result`, result);

  if (result.status == 201) {
    res.status(201).json({ message: "User created!", ...result.data });
  } else {
    res.status(result.status).json({ message: result.error });
  }
}

export default handler;
