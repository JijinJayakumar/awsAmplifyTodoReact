import { useState, useEffect } from "react";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
import { NextUIProvider } from "@nextui-org/react";

import "@aws-amplify/ui-react/styles.css"; // default theme
import "../styles/globals.css";
import "@fontsource/inter/variable.css";
import awsExports from "../src/aws-exports";
import NoPermission from "../components/auth/NoPermission";
import GuestLayout from "../components/layouts/GuestLayout";
import UserLayout from "../components/layouts/UserLayout";
import { AuthContext } from "../contexts/AuthContext";
Amplify.configure({ ...awsExports, ssr: true });
function MyApp({ Component, pageProps }) {
  /**
   * set auth protection on all pages
   */
  const [user, setUser] = useState(null); //auth

  useEffect(() => {
    // Accessing the user session on the client
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("User: ", user);
        setUser(user);
      })
      .catch((err) => setUser(null));
  }, []);

  if (pageProps.protected && !user) {
    return (
      <NextUIProvider>
        <NoPermission></NoPermission>
      </NextUIProvider>
    );
  }
  //  if (
  //    pageProps.protected &&
  //    user &&
  //    pageProps.userTypes &&
  //    pageProps.userTypes.indexOf(user.type) === -1
  //  ) {
  //    return <Layout>Sorry, you don't have access</Layout>;
  //  }
  /**
   * set auth protection on all pages ends
   *
   */

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <UserLayout>
          <NextUIProvider>
            <AmplifyProvider>
              <Authenticator.Provider>

              <Component {...pageProps} />
              </Authenticator.Provider>
            </AmplifyProvider>
          </NextUIProvider>
        </UserLayout>
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GuestLayout>
        <NextUIProvider>
          <AmplifyProvider>
            <Authenticator.Provider>
              <Component {...pageProps} />
            </Authenticator.Provider>
          </AmplifyProvider>
        </NextUIProvider>
      </GuestLayout>
    </AuthContext.Provider>
  );
}

// const linkStyle = css`
//   margin-right: 20px;
//   cursor: pointer;
// `;

// const navStyle = css`
//   display: flex;
// `;

export default MyApp;
