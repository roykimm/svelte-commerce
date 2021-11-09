import axios from "axios";
import url from "./URL";

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
    // code goes here
    console.log(name, total, items, stripeTokenId, userToken)
    // const response = await fetch(`${url}/orders`, {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Bearer ${userToken}`
    //     },
    //     body: {
    //         name,
    //         total,
    //         items,
    //         stripeTokenId
    //     }
    // })
    //     .catch(error => console.log(error));

    const response = await axios.post(`${url}/orders`, {
        name, total, items, stripeTokenId
    },
        {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
    )
        .catch(error => console.log(error));

    return response;
}

export default submitOrder;