import { setStorageUser, setUser } from "../stores/user";

function setupUser(response) {

    const { jwt } = response;
    const { username } = response.user;
    const user = { username, jwt }

    setStorageUser(user);
    setUser(user);
}

export default setupUser;