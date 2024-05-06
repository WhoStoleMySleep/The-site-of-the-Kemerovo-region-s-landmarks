"use client";
import styles from './Header.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";

const Header = () => {
  const location = usePathname();
  const path = location?.split('/')

  return (
    <header className={styles["header"]}>
      <Link className={styles["header__logo"]} href={'/'}>
        Главная
      </Link>

      {location && path && location !== '/' &&
          <nav className={styles["header__nav"]}>
              <Link href={`/${path[path.length - 2]}`} className={styles["header__link"]}>Назад</Link>
          </nav>
      }
    </header>
  );
};
export default Header;