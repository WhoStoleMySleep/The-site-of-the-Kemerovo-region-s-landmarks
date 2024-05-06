import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import '@/app/globals.css';

const Layout = ({children}: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
/*to={path[path.length - 2]}*/
export default Layout;