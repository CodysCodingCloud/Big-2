import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../store/userSlice";

export default function Signup() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
	});

	const handleChange = (props) => (event) => {
		setForm({
			...form,
			[props]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await dispatch(signup(form, navigate));
			navigate;
		} catch (error) {}
	};

	const checkDisabled = () => {
		return !form.username.length || !form.password.length || !form.email.length;
	};

	return !user.id ? (
		<form id="create-account-container" onSubmit={handleSubmit}>
			<div id="create-account-form">
				<h1 className="createAccounttitle">Create New Account</h1>
				<div className="form-line">
					<input
						className="login-input"
						placeholder="Username"
						type="text"
						value={form.username}
						onChange={handleChange("username")}
					/>
				</div>
				<div className="form-line">
					<input
						className="login-input"
						placeholder="Password"
						type="password"
						value={form.password}
						onChange={handleChange("password")}
					/>
				</div>
				<div className="form-line">
					<input
						className="login-input"
						placeholder="Email address"
						type="email"
						value={form.email}
						onChange={handleChange("email")}
					/>
				</div>
				<button
					className="createAccountBtn"
					type="submit"
					disabled={checkDisabled()}
				>
					Create Account
				</button>
			</div>
		</form>
	) : (
		<div>Cannot create account when already logged in</div>
	);
}
