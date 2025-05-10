"use client";

export function ClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
