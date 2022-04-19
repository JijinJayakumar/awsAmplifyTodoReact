import { useContext } from "react";
import { Auth } from "aws-amplify";

import Image from "next/image";
import Link from "next/link";
import { siteName, siteLogo } from "../../src/siteData";
import { AuthContext } from "../../contexts/AuthContext";
// login logot button
export const AuthButton = () => {
  const { user, setUser } = useContext(AuthContext);
  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  let button = "";
  if (user) {
    button = (
      <button
        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        onClick={signOutHandler}
      >
        Logout
      </button>
    );
  } else {
    button = (
      <Link href="/auth" passHref>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login{" "}
        </button>
      </Link>
    );
  }

  return button;
};
//header navigation
const HeaderNav = () => {
  return (
    <header className="text-gray-600 body-font sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link href="/" passHref>
            <Image src={siteLogo} alt="logo" width="60" height="60" />
          </Link>
          <Link href="/" passHref>
            <span className="ml-3 text-xl">{siteName}</span>
          </Link>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/todo">
            <a className="mr-5 hover:text-gray-900">Todos GraphQL</a>
          </Link>
          <Link href="/todo_rest">
            <a className="mr-5 hover:text-gray-900">Todos Rest</a>
          </Link>

          {/* <Link href="/profile">
            <a className="mr-5 hover:text-gray-900">Profile</a>
          </Link> */}
        </nav>

        <AuthButton />
      </div>
    </header>
  );
};

export default HeaderNav;
