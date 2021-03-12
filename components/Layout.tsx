/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: Layout.tsx
 * PACKAGE: components
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/21/2021
 * VERSION: 0.1
 * ABSTRACT: This page is responsible for creating a layout in which all other pages will be wrapped.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

//Navigation bar
import Navbar from "./Navbar";

//Header section
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Everledger App</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Navbar />
      {children}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
    </>
  );
};

export default Layout;
