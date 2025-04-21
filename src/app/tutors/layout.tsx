export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <h1>Hello</h1>
      <main>{children}</main>
    </>
  );
}
