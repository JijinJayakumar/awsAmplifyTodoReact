import { NextUIProvider } from "@nextui-org/react";
import { Alert } from "@aws-amplify/ui-react";
import Link from "next/link";
import { Button, Card, Text } from "@nextui-org/react";

const NoPermission = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card bordered shadow={false} css={{ mw: "400px" }}>
          <Text h4>No permission to view, Please</Text>

          <Link href="/auth" className="link" passHref>
            <button className="px-6 py-2 text-sm transition-colors duration-300 rounded rounded-full shadow-xl text-cyan-100 bg-cyan-500 hover:bg-cyan-600 shadow-cyan-400/30">
              Login
            </button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default NoPermission;
