import Head from "next/head";
import Nav from "./Nav";

export default function Layout({ children }) {

  return (
    <>
      <Head>
        <title>Dream Shoppe</title>
        <meta
          name="description"
          content="Shop your dreams for tangible goods!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="bg-[#f8f7f5] min-h-[calc(100vh-76px)] px-10 py-8">
        <div className="container md:mx-auto md:max-w-[1100px]">{children}</div>
      </main>
    </>
  );
}
