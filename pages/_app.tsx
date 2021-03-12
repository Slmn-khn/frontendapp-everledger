/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: _app.tsx
 * PACKAGE: src
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/12/2021
 * VERSION: 0.1
 * ABSTRACT: This page wraps the content of the entire applciation
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

//Layout import from components to align design of various pages as one
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* various screens are wrapped inisde layout for uniform design pattern */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
