import TeacherFilters from "@/components/filters/TeacherFilters";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TeacherFilters>{children}</TeacherFilters>;
}
