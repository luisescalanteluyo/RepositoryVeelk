import { Navigate, useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/security/auth";
import { useEffect, useState } from "react";
import STORAGE from "../../utils/storage";
import CONST from "../../utils/constants";

const logo = "/veekls-logo.jpeg";

function LoginPage() {
    const [isLogged, setIsLogged] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [errorLogin, setErrorLogin] = useState({ error: false, msg: "" });
    const navigate = useNavigate()
    useEffect(() => {
        let validateLogged = STORAGE.GET("TOKEN");
        if (isLogged || validateLogged) {
            window.location.href = "/dashboard";
        }
    }, [isLogged, navigate])

    const handleSubmit = async (e: any) => {
        setErrorLogin({ error: false, msg: ""})
        e.preventDefault();
        const { email, password } = document.forms[0];
        if (email.value !== "" && password.value !== "") {
            let validate = await validateLogin(email.value, password.value);
            if (validate) {
                setIsLogged(true);
                window.location.href = "/dashboard";
            } else {
                setErrorLogin({ error: true, msg: CONST.LOGIN.BAD_LOGIN })
            }
        } else {
            setErrorLogin({ error: true, msg: CONST.LOGIN.EMPTY_FIELDS })
        }
    }

    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <div className="app-brand justify-content-center">
                                    <img src={logo} width='100%' alt="veekls-logo" />
                                </div>
                                <h4 className="mb-2">{CONST.LOGIN.REGARDS}</h4>
                                {errorLogin.error &&
                                        <div
                                            className="bs-toast toast fade show bg-danger"
                                            role="alert"
                                            aria-live="assertive"
                                            aria-atomic="true"
                                            style={{marginTop:'15px', marginBottom: '15px'}}
                                        >
                                            <div className="toast-body" style={{ fontSize: '12px', textAlign: 'center', padding: '8px' }}>
                                                {errorLogin.msg}
                                            </div>
                                        </div>}
                                <form className="mb-3" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">{CONST.LOGIN.EMAIL}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder={CONST.LOGIN.EMAIL_PLACEHOLDER}
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label">{CONST.LOGIN.PASSWORD}</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={showPass ? "text": "password"}
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder={CONST.LOGIN.PASSWORD_PLACEHOLDER}
                                                aria-describedby="password" />
                                            <span className="input-group-text cursor-pointer" onClick={() => setShowPass(!showPass)}><i className={`bx ${showPass ? 'bx-lock-open-alt' : 'bxs-lock-alt'}`}></i></span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label"></label>
                                            <a href="auth-forgot-password-basic.html">
                                                <small>{CONST.LOGIN.FORGOT_PASS}</small>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary d-grid w-100">{CONST.LOGIN.LOGIN_BTN}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default LoginPage;