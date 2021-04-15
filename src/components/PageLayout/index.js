import Head from "next/head";
import Header from "../Header/Index";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Trabajo Final | IU DIGITAL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="antialiased">
        <Header />
        <div className="container flex flex-col justify-center max-w-6xl mx-auto mb-20 space-y-5 place-items-center">
          {children}
        </div>
      </main>
    </div>
  );
}
