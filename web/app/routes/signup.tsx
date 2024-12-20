import { Outlet } from "@remix-run/react";
import { BreadcrumbHandle } from "../components/breadcrumb/Breadcrumb";

export const handle: BreadcrumbHandle = {
  breadcrumb: () => ({
    title: "アカウント登録"
  })
};

export default function Recreation() {
  return (
    <Outlet />
  );
}
