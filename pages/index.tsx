/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: index.tsx
 * PACKAGE: pages
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/21/2021
 * VERSION: 0.1
 * ABSTRACT: This page is the entry point applciation i.e this is the landing page.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

//Link: to enable routing seamleassly
import Link from "next/link";

//styles: global style sheet
import styles from "../styles/index.module.css";

//string constants that are defined in a single file
import { mainContent, subContent } from "../components/constants";

const Home = (props) => (
  <div className={styles.home}>
    {/* Landing page welcome message */}
    <div className={styles.labelContainer}>
      <span data-fusion-font="true" className={styles.mainLabelContent}>
        {mainContent}
      </span>
      <span className={styles.subLabelContent}>{subContent}</span>
    </div>
    {/* link to upload files page*/}
    <div className={styles.linkContainer}>
      <Link href="/upload">
        <a style={{ color: "white" }}>Click here to upload image</a>
      </Link>
    </div>
  </div>
);

export default Home;
