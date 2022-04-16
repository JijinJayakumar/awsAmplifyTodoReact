import { withSSRContext } from "aws-amplify";
export default async function handler(req, res) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    res.json({ user: user.username });
  } catch (err) {
    res.statusCode = 200;
    res.json({ user: null });
  }

};
