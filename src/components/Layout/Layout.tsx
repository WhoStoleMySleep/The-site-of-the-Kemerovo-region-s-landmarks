import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import '@/app/globals.css';

const Layout = ({children, city, attraction}: any) => {
  return (
    <>
      <Header city={city} attraction={attraction} />
      {children}
      <Footer />
    </>
  );
};
/*to={path[path.length - 2]}*/
export default Layout;