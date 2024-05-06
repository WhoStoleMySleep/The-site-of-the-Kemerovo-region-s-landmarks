import styles from './Header.module.scss'
import Link from "next/link";

const Header = ({ city = '', attraction = '' }: any) => {
  return (
        <header className={styles["header"]}>
            <Link className={styles["header__logo"]} href={'/'}>
                Главная
            </Link>

          {!!city &&
              <nav className={styles["header__nav"]}>
                  <Link href={
                    `/`
                  } className={styles["header__link"]}>Назад</Link>
              </nav>
          }
        </header>
    );
};
export default Header;