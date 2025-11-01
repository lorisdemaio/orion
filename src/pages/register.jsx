import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// components
import Section from "../components/section";

// utils
import { fetchRegister } from '../utils/fetchRegister';

export default function Register() {
    
    useEffect(() => {
        if(localStorage.getItem('token')) navigate("/home");
    }, []);

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try 
        {
            const ris = await fetchRegister(username, email, password);
            toast.success(ris.mex);
            navigate("/login");

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
                        Registrati
                    </h1>
                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username">
                                Username:
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username..."
                                required
                            />
                        </div>
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
                            Hai gia un account? <Link to="/login">Accedi</Link>
                        </p>
                        <button type="submit">
                            Registrati
                        </button>
                    </form>
                </div>
            </Section>
        </>
    );
}