import "./Home.css"

export default function Home() {
    return (
        <>
        <section className="welcome">
            <h1> Welcome </h1>
            <section className="login-signup">
                <button type="button"><a href="/signup"> Sign Up </a></button>
                <button type="button"><a href="/login"> Login </a></button>
            </section>
        </section>
        </>
        
    )
}