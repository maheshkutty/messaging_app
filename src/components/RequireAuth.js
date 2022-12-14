import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children, adminPass }) {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
    if (!currentUser) {
        console.log("Navigate to")
        return <Navigate to="/login" />;
    }

    if(currentUser.type == "user" && adminPass){
        return <Navigate to="/login" />;
    }

    return children
}

export default RequireAuth;