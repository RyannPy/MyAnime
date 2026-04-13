import { useState } from "react";
import { signIn, signUp } from "../services/authServices";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("")

    const handleAuth =  async (e) => {
        e.preventDefault();

        let result;

        if (isLogin) {
            result = await signIn(email, password);
        } else {
            result = await signUp(email, password);
        }

        if (result.error) {
            setMessage(result.error.message);
        } else {
            setMessage(
                isLogin
                ? "Login succesfully!"
                : "Cek email untuk verifikasi!"
            );
        }

    };

    return (
        <div className="flex flex-col items-center gap-2">
            <h1>{isLogin ? "Login" : "Register"}</h1>

            <form onSubmit={handleAuth}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
            </button>

            {message && <p>{message}</p>}

        </div>
    )
}


export default Auth;