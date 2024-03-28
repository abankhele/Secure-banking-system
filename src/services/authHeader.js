export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.token);
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };

    } else {
        return {};
    }
}