import Head from 'next/head';
import Header from '../header'
type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='layout'>
      <Header />
      <Head>
        <title>视频格式转换助手</title>
      </Head>
      <main className='layout__content sm:container mx-auto'>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
