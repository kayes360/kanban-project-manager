import localFont from "next/font/local";
import "./globals.css";
import Aside from "./components/Aside";
import TaskProvider from "./providers/TaskProvider";
import Header from "./components/Header";
import { AsideProvider } from "./providers/AsideProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "project-manager-converted-to-nextjs",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen antialiased bg-gray-900 text-white `}
      >
        <TaskProvider>
          <AsideProvider>
            <Aside />
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              <Header />
              {children}
            </main>
          </AsideProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
