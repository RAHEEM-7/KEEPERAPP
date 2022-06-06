import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";
import axios from "axios";

const Header = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUserName, setCurrentUserName] = useState("");
	const [redirect, setRedirect] = useState(false);
	useEffect(() => {
		let path = window.location.pathname;
		if (path === "/home") {
			axios
				.get("/api/verify")
				.then((res) => {
					console.log("done");
					setCurrentUserName(res.data);
					setIsAuthenticated(true);
				})
				.catch((err) => {
					setRedirect(true);
				});
		}
	}, []);

	let navlist;
	if (isAuthenticated) {
		navlist = (
			<ul>
				<li>
					<header>
						<h1>
							<HighlightIcon />
							Keeper
						</h1>
					</header>
				</li>
				<li>{currentUserName}</li>
				<li>
					<Link
						to="/"
						onClick={() => {
							axios
								.post("/api/logout")
								.then((res) => console.log(res))
								.catch((err) => console.log(err));
						}}
					>
						{" "}
						Logout{" "}
					</Link>
				</li>
			</ul>
		);
	} else {
		navlist = (
			<ul>
				<li>
					<header>
						<h1>
							<HighlightIcon />
							Keeper
						</h1>
					</header>
				</li>
				<li>
					<Link to="/login"> Login </Link>
				</li>
				<li>
					<Link to="/register"> Register </Link>
				</li>
			</ul>
		);
	}

	if (redirect) return <Navigate to="/" />;

	return <>{navlist}</>;
};

export default Header;
