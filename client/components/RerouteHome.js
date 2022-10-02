import React from "react";
import { useNavigate } from "react-router-dom";

const RerouteHome = () => {
	const navigate = useNavigate();
	React.useEffect(() => {
		navigate("/");
	}, []);

	return <div>"Hmm... That page doesn't exist."</div>;
};

export default RerouteHome;
