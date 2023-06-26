import { api } from ".";
import axios from "axios";

export async function SignIn(email: string, password: string) {
  axios
    .post('')
    .then(async (res) => {
      console.log("response -- ", res.data);
      if (res.data?.status === 0) {
        return;
      }
    })
    .catch((err) => {
      console.log("error --- ", err);
    });
}
