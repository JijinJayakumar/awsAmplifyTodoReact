import Head from "next/head";
import {useContext } from "react";
import Link from "next/link";
// import { Link, Spacer } from "@nextui-org/react";


import {AuthButton} from "../components/layouts/HeaderNav";
import { AuthContext } from "../contexts/AuthContext";
import { siteName, siteDescription } from "../src/siteData";

export default function Home() {
  const {user} = useContext(AuthContext);
  // console.log({user.username});
  let text = <span>Please Login to use this app</span>;
  if (user) {
    text = (
      <span>
        Hello {user.username},{" "}
        <Link href="/todo" color="secondary">
          click here
        </Link>{" "}
        to go to app page{" "}
      </span>
    );
  }
  return (
    <div>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
              <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                {text}
              </h1>
              <AuthButton />
            </div>
          </div>
        </section>
      </main>

      <footer>A AWS Demo project</footer>
    </div>
  );
}
