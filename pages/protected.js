import { withSSRContext } from "aws-amplify";

function Protected({ authenticated, username }) {
  if (!authenticated) {
    return <h1>Not authenticated</h1>;
  }
  return <h1>Hello {username} from SSR route!</h1>;
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        protected: true,
        authenticated: true,
        username: user.username,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
        protected: true,
      },
    };
  }
}

// export async function getStaticProps(context) {
//     return {
//         props: {
//             protected: true,
//         },
//     };
// }
export default Protected;