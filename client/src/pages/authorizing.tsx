import React from 'react';
import Authorizing from 'containers/Login/Authorizing';
import { useLocation } from "react-router-dom";

const AuthPage = () => {

	const location = useLocation();
	const code = location.search.split("code=")[1];

	return <Authorizing code={code} />
}

export default AuthPage;