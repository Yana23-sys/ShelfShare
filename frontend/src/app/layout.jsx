import Footer from "./Components/Footer";
import Header from "./Components/Header";
import styles from "./Styles/global.css";

export const metadata = {
  title: "ShelfShare App",
  description: "Swap books with others in your community!",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
