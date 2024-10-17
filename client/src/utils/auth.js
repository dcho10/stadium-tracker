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
        // Check if token exists and is not expired
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            // Check if the token has expired
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("id_token");
                return true;
            }
            return false;
        } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("id_token"); // Clear invalid token
            return true;
        }
    }

    getToken() {
        // Retrieve the token from localStorage
        return localStorage.getItem("id_token");
    }

    login(idToken) {
        // Save the token to localStorage
        localStorage.setItem("id_token", idToken);
        window.dispatchEvent(new Event("authChange")); // Notify other parts of the app
    }

    logout() {
        // Remove the token from localStorage
        localStorage.removeItem("id_token");
        window.dispatchEvent(new Event("authChange")); // Notify other parts of the app
    }
}

export default new AuthService();
