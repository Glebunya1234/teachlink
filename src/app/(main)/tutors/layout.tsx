import TeacherFilters from "@/components/filters/TeacherFilters";

export default function TutorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TeacherFilters>{children}</TeacherFilters>;
}
