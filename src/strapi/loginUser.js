import axios from "axios";
import url from "./URL";
import setupUser from "./setupUser"

async function loginUser({ email, password }) {

    console.log(JSON.stringify({
        identifiier: email,
        password: password
    }))

    const response = await fetch(`${url}/auth/local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier: email,
            password: password
        })
    }).catch(error => {
        console.error(error)
    })

    // const response = await axios
    //     .post(`${url}/auth/local`, {
    //         identifier: email,
    //         password: password
    //     })
    //     .catch(error => console.log(error));

    console.log(response)
    let responseOK = response && response.ok;
    console.log(responseOK)
    if (responseOK) {
        let data = await response.json();
        setupUser(data)
        return true;
    }
    return false;

}

export default loginUser;