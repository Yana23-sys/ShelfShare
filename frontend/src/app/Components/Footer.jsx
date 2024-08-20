import styles from "../Styles/Footer.module.css";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} ShelfShare. All rights reserved.</p>
    </section>
  );
};

export default Footer;
