import { useState, useEffect } from "react";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
import { NextUIProvider } from "@nextui-org/react";

import "@aws-amplify/ui-react/styles.css";
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
  const [user, setUser] = useState(null);
  console.log("user", { user });

  useEffect(() => {
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

export default MyApp;
