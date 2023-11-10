import { useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../../../../components/Layout";
import { requestApi } from "../../components/@api/fetch";
import Login from "../login";

function LoginGuard (): JSX.Element {
    //check if is logged 
    
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const authGuard = async () => {
        try{
        const response = await requestApi('/auth', 'GET', null);
        if (response.data === "true") {
           setIsLogged(true);
        }}
        catch(error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    authGuard();
    
    //if is logged, redirect to home page
    if (isLoading) {
        return  <Layout id="pageLogin"> Carregando...</Layout>;
    }
    if (isLogged) {
        return <Outlet/>;
    }
    //if is not logged, redirect to login page
    return <Login/>;
}

export default LoginGuard;