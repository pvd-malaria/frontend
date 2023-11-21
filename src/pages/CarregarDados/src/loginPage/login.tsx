//a simple login page with email & password
// this page is not connected to redux

import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { requestApi } from "../components/@api/fetch";

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPassword, setUserPassword] = useState<string | null>(null);

  const handleLogin = async () => {
    const userData = {
      username: userEmail,
      password: userPassword,
    };

    const response = await requestApi("/api-poc/auth/login", "POST", userData);

    if (response!["statusCode"] === 200) {
      localStorage.setItem("token", response.data ? response.data : "");
      window.location.reload();
    } else if (
      response!["statusCode"] === 404 ||
      response!["statusCode"] === 403
    ) {
      alert("Revise seu email e senha");
    } else {
      alert("Tente novamente mais tarde");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Layout id="pageLogin">
      <section className="wrapperInfo">
        <div className="container">
          {/* <Link to="/visualizacoes">Galeria de visualizações</Link> */}
          <h1> Entre com seu usuário </h1>
          <p className="description">Acesso restrito </p>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          marginLeft: "20%",

          flexDirection: "column",
        }}
        className="visualization"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            style={{
              //custom input
              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
              //border #333
              border: "2px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
            placeholder="Nome de usuário"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            style={{
              //custom input

              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",

              border: "2px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <button
            style={{
              //custom input

              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#2754a8",
              color: "#f5f5f5",
            }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
