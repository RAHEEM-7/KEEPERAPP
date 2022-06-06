import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
const Login = () => {
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
	const onLogin = (event) => {
		event.preventDefault();

		axios
			.post("/login", user, {
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
				<button onClick={onLogin}>Login</button>
			</form>
		</>
	);
};

export default Login;
