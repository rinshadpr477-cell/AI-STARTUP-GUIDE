import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="w-full px-10 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">Manage the knowledge base</p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/articles" className="text-muted-foreground hover:text-foreground">
            Articles
          </Link>
          <Link href="/admin/resources" className="text-muted-foreground hover:text-foreground">
            Resources
          </Link>
          <Link href="/admin/analytics" className="text-muted-foreground hover:text-foreground">
            Analytics
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}