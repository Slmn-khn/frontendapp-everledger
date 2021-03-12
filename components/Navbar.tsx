/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: Navbar.tsx
 * PACKAGE: components
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/21/2021
 * VERSION: 0.1
 * ABSTRACT: This page is contains design for Navbar.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

//Link: to enable routing seamleassly
import Link from "next/link";

//Image: to add logo
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper" style={{ background: "#1f3340" }}>
        <Link href="/">
          <a className="brand-logo left">
            <Image src="/el_logo_white.png" width={180} height={30} />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
