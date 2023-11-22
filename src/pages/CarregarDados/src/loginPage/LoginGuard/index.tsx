import { useState } from "react";
import CarregarDados from "../..";
import Layout from "../../../../../components/Layout";
import { requestApi } from "../../components/@api/fetch";
import Login from "../login";

function LoginGuard(): JSX.Element {
  //check if is logged

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authGuard = async () => {
    try {
      const response = await requestApi("/auth", "GET", null);
      if (typeof response.data === "string") {
        const json = JSON.parse(response.data);
        if (json?.valid) {
          setIsLogged(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  authGuard();

  //if is logged, redirect to home page
  if (isLoading) {
    return <Layout id="pageLogin"> Carregando...</Layout>;
  }
  if (isLogged) {
    return <CarregarDados />;
  }
  //if is not logged, redirect to login page
  return <Login />;
}

export default LoginGuard;
