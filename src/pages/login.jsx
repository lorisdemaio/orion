import { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// components
import Section from "../components/section";

// utils
import { fetchLogin } from "../utils/fetchLogin";

export default function Login() {

    useEffect(() => {
        if(localStorage.getItem('token')) navigate("/home");
    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try 
        {
           const ris = await fetchLogin(email, password);
           if(ris.status !== "success") toast.error(ris.mex);
           else
           {
             toast.success(ris .mex);
             localStorage.setItem('token', ris.token);
             localStorage.setItem('selected-chat', false);
             window.location.reload();
             navigate("/home");
           }
        }
        catch(err) 
        {
            console.error("err: ", err);
        }
    }

    return(
        <>
            <Section
                height="100dvh"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <div className="form-container">
                    <h1>
                        Accedi
                    </h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email">
                                Email:
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@provider.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password..."
                                required
                            />
                        </div>
                        <p>
                            Non hai un account? <Link to="/register">Registrati</Link>
                        </p>
                        <button type="submit">
                            Accedi
                        </button>
                    </form>
                </div>
            </Section>
        </>
    );
}