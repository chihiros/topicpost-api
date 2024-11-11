import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import { WindowSize } from "./components/debug/WindowSize";
import MainContent from "./components/main/MainContent";
import Sidebar from "./components/sidebar/Sidebar";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Sidebar />
          <MainContent>
            <Breadcrumb />
            {children}
          </MainContent>
        </div>
        <ScrollRestoration />
        <Scripts />
        <WindowSize />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
