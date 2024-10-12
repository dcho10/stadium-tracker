import decode from "jwt-decode";

class AuthService {
    getUser() {
        const token = this.getToken();
        const decoded = token ? decode(token) : null;
        return decoded;
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true: false;
    }

    isTokenExpired(token) {
        const decoded = decode(token);

        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem("id_token");
            return true;
        }

        return false;
    }

    getToken() {
        return localStorage.getItem("id_token");
    }

    login(idToken) {
        localStorage.setItem("id_token", idToken);
        window.dispatchEvent(new Event("authChange"));
    }

    logout() {
        localStorage.removeItem("id_token");
        window.dispatchEvent(new Event("authChange"));
    }
}

export default new AuthService();