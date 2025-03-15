
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
