import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + `text-white bg-[#0E0218]`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
