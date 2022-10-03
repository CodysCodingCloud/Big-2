import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { attemptPasswordLogin } from "../store/userSlice";
export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	React.useEffect(() => {
		try {
			dispatch(attemptTokenLogin(navigate));
		} catch (error) {}
	}, [dispatch, navigate]);
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const handleChange = (type) => (event) => {
		setState({
			...state,
			[type]: event.target.value,
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await dispatch(
				attemptPasswordLogin(
					{
						username: state.username,
						password: state.password,
					},
					navigate
				)
			);
			navigate("/play");
		} catch (error) {
			console.log("error login");
		}
	};

	return (
		<div className="LoginContainer">
			<form id="login-form" onSubmit={handleSubmit}>
				<h1 className="LoginTitle">SIGN IN</h1>
				<div className="login-line">
					<input
						className="login-input"
						placeholder="username"
						name="username"
						value={state.username}
						autoComplete="userName"
						onChange={handleChange("username")}
					/>
				</div>
				<div className="login-line">
					<input
						placeholder="Password"
						className="login-input"
						name="password"
						type="password"
						value={state.password}
						autoComplete="current-password"
						onChange={handleChange("password")}
					/>
				</div>
				<div className="createAccount">
					<button className="LoginBtn" type="submit">
						Sign In
					</button>
					<Link to="/signup" className="create-account-link">
						<button className="accountBtn">Create account?</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
