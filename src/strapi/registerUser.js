import axios from "axios";
import url from "./URL";

async function registerUser({ email, password, username }) {

    console.log(email, password, username)
    console.log(`${url}/auth/local/register`)
    console.log(JSON.stringify({
        username, email, password
    }))
    const response = await axios.post(`${url}/auth/local/register`, {
        username: username, email: email, password: password
    })
        .catch(error => console.log(error))

    console.log("hello")
    // if (response) {
    //     // setup user
    // }
    return response;
}

export default registerUser;