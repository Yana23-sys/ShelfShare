import Link from "next/link";
import styles from "../Styles/Map.module.css";

const Map = () => {
  return (
    <Link href="/books/66ced211cd7a0381694b545a" prefetch={false}>
    <div>
    <iframe className={styles.map} width="450" height="280" src="https://api.maptiler.com/maps/5c2aff68-c608-459b-9214-fd31c158628c/?key=thOdTAyGPF7S1OunajFd#5.3/52.50740/0.02780"></iframe>
    </div>
    </Link>
  );
};

export default Map;