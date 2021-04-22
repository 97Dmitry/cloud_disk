import axios from "axios";

export const registration = async (email, password) => {
  try {
    await axios
      .post("http://127.0.0.1:8001/api/auth/registration", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((e) => {
        e.data.message;
      });
  } catch (e) {
    console.log(e);
  }
};
