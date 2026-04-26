import type { Metadata } from "next";
import LoginPageContent from "./LoginPageContent";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to the Maa Sewa Healthcare staff and admin portal.",
};

export default function Page() {
  return <LoginPageContent />;
}
