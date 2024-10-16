import { Button } from "@/components/button";
import { signIn, NFIDProvider } from "@junobuild/core-peer";

export const Login = () => {
  const handleSignIn = async () => {
    try {
      await signIn({
        provider: new NFIDProvider({
          appName: "Parquet Explorer",
          logoUrl: "https://jacobcrabtree.me/favicon.ico",
        }),
      });
    } catch (error) {
      console.error("Sign in failed:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <Button onClick={handleSignIn}>Sign in with NFID</Button>;
};
