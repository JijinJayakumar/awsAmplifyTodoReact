import { useContext } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";

export default function App() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { setUser } = useContext(AuthContext);

  const router = useRouter();

  const { route } = useAuthenticator((context) => [context.route]);

  // // // if (user) {route === 'authenticated'
  if (route === "authenticated") {
    console.log("AUTHENTICATED");
    router.push("/todo");
    setUser(user);

    // history.replace(from.pathname + from.search);
  } else {
    setUser(null);
    console.log("NOT AUTHENTICATED");
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Authenticator>
        {/* {({ signOut, user }) => ( */}
        {/* <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main> */}
        {/* )} */}
      </Authenticator>
    </div>
  );
}
