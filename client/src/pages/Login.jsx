import "./Signup.css";

export default function Login() {
    return (
        <form className="login-form">
        <h3> Login </h3>
        <section>
            <h4> Email </h4>
            <input type="text" placeholder="Email"></input>
        </section>
        <section>
            <h4> Password </h4>
            <input type="password" placeholder="Password"></input>
        </section>
        <section className="account-btns">
            <button type="submit"><a href="/signup"> Sign Up </a></button>
            <button type="button"><a href="/login"> Login </a></button>
        </section>
    </form>
    )
}