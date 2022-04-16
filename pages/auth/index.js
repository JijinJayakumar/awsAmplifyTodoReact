import { useContext, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";

export default function App() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { user: stateUser, setUser } = useContext(AuthContext);

  const router = useRouter();

  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    console.log("user Change", { user }, { stateUser });

    if (user && stateUser == null) {
      {
        console.log("YESSSS");
        setUser(user);
      }
    } else {
      if (user == null && stateUser) {
        console.log("NOOOOOOOO");
      }
    }
  }, [setUser, stateUser, user]);

  // // // if (user) {route === 'authenticated'
  if (route === "authenticated") {
    console.log("AUTHENTICATED");
    router.push("/todo");
  } else {
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
        </main> */}
        {/* )} */}
        {/* <button onClick={signOut}>Sign out</button> */}
      </Authenticator>
    </div>
  );
}
