import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
      <header className='bg-white shadow-sm'>
        <Link href="/" >
          <a className='px-4 md:px-8 container mx-auto flex items-center py-2'>
            <Image className='rounded' src="/logo.png" width={42} height={42} alt="logo" />
            <h1 className='ml-4'>视频格式转换助手</h1>
          </a>
        </Link>
      </header>
      <main className='layout__content sm:container mx-auto'>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
