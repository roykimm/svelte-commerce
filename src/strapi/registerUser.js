import axios from "axios";
import url from "./URL";
import setupUser from "./setupUser"

async function registerUser({ email, password, username }) {

    // const response = await fetch(`${url}/auth/local/register`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         username: username,
    //         email: email,
    //         password: password
    //     })
    // })
    //     .catch(error => {
    //         console.error(error)
    //     })
    console.log(`${url}/auth/local/register`)
    const response = await axios
        .post(`${url}/auth/local/register`, {
            username,
            email,
            password
        })
        .catch(error => console.log(error));

    if (response) {
        setupUser(response)
    }
    return response;

    // let responseOK = response && response.ok;
    // if (responseOK) {
    //     let data = await response.json();
    //     setupUser(data)
    //     return true;
    // }
    // return false;
}

export default registerUser;