import axios from "axios";
import url from "./URL";
import setupUser from "./setupUser"

async function registerUser({ email, password, username }) {

    const response = await fetch(`${url}/auth/local/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .catch(error => {
            console.error(error)
        })
    // const response = await fetch
    //     .post(`${url}/auth/local/register`, {
    //         username,
    //         email,
    //         password
    //     })
    //    .catch(error => console.log(error));

    let responseOK = response && response.ok;
    if (responseOK) {
        let data = await response.json();
        setupUser(data)
        return true;
    }
    return false;
}

export default registerUser;