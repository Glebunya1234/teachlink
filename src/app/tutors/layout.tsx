import { ClientProvider } from "@/components/client-provider/client-provider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClientProvider>{children}</ClientProvider>
    </>
  );
}
