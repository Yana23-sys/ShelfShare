import Footer from "./Components/Footer";
import Header from "./Components/Header";
import styles from "./Styles/global.css";
import Providers from "./Providers";

export const metadata = {
  title: "ShelfShare App",
  description: "Swap books with others in your community!",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default Layout;

//Layout
