import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-4xl font-semibold text-center text-white">
              OpenShelf
            </h1>
          </div>
          {children}
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
}
