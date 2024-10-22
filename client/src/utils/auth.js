import decode from "jwt-decode";

class AuthService {
    getUser() {
        const token = this.getToken();
        if (token && !this.isTokenExpired(token)) {
            try {
                const decoded = decode(token);
                return decoded;
            } catch (err) {
                console.error("Failed to decode token", err);
                return null;
            }
        }
        return null;
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            const gracePeriod = 5 * 60; 
            return decoded.exp < (Date.now() / 1000) + gracePeriod;
        } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("id_token"); 
            return true;
        }
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
