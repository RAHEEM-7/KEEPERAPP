import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
const Register = () => {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [redirect, setRedirect] = useState(false);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onRegister = (event) => {
		event.preventDefault();

		axios
			.post("/register", user, {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((res) => {
				setTimeout(() => {
					setRedirect(true);
				}, 750);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (redirect) {
		return <Navigate to="/home" />;
	}

	return (
		<>
			<Header />
			<form>
				<label for="text">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					value={user.username}
					onChange={handleChange}
				/>
				<label for="password">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={user.password}
					onChange={handleChange}
				/>
				<button onClick={onRegister}>Register</button>
			</form>
		</>
	);
};

export default Register;
