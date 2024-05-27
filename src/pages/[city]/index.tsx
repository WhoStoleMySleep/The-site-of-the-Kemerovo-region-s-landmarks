"use client"
import Card from "../../components/Card/Card";
import styles from './Attractions.module.scss'
import Layout from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "@/util/fetcher";

export default function Attractions() {
  const {city} = useRouter().query;
  const {
    data,
    error,
    isLoading
  } = useSWR(
    `https://attractions42.vercel.app/api/${city}`,
    fetcher
  )

  return (
    <Layout>
      <main className={styles["main"]}>
        <h2 className={styles['main__subtitle']}>Популярные достопримечательности в {city}</h2>
        <ul className={styles["main__list"]}>
          {!isLoading ? data && data.map((element: any) => (
            <Card
              key={element.id}
              description={element.description}
              photoUrl={typeof (element.photo) !== 'undefined' ? element.photo.url : ''}
              linkUrl={`/${city}/${element.id}`}
              title={element.name}
            />
          )) :
            <div className={styles['main__loading']}>
          Загрузка...
        </div>}
        </ul>
      </main>
    </Layout>
  );
};