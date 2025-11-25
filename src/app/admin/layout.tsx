import { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin | Casa Kiran",
  description: "Panel de administración",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
