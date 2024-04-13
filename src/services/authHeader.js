export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.token);
    if (user && user.token) {
        return { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", Authorization: 'Bearer ' + user.token };

    } else {
        return {};
    }
}