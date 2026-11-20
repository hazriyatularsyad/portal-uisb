import { AdminProvider } from "@/lib/admin-store";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
