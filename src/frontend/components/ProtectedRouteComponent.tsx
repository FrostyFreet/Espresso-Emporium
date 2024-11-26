import { Navigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({children }: ProtectedRouteProps) {
    const {user, isAuthenticated } = useAuth0();
    console.log(isAuthenticated,user)
    return isAuthenticated ? children : <Navigate to="/" replace />;
}