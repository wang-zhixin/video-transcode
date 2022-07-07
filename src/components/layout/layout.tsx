import Head from 'next/head'
type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      {/* <Header /> */}
      <Head><title>tool</title></Head>
      <main className="layout__content sm:container mx-auto">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout