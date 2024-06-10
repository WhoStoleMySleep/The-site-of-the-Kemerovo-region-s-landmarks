"use client";
import styles from "./page.module.scss";
import Layout from "@/components/Layout/Layout";
import fetcher from "@/util/fetcher";
import {useEffect, useState} from "react";
import Card from "@/components/Card/Card";

export default function Home() {
  const [data, setData] = useState('')

  useEffect(() => {
    (async function () {
      setData(await fetcher('/api/cities'))
      console.log(JSON.parse(await fetcher('/api/cities')))
    })()
  }, []);

  return (
    <Layout>
      <main className={styles['main']}>
        <h1 className={styles['main__title']}>Достопримечательности в Кемеровской области</h1>
        <h2 className={styles['main__subtitle']}>Популярные города в Кемеровской области</h2>
        <ul className={styles['main__list']}>
          {data.length ? JSON.parse(data).map((item: any) => (
              <Card
                key={item.id}
                description={''}
                photoUrl={item.photo}
                linkUrl={`/${item.name}`}
                title={item.name}
              />)) :
            <div className={styles['main__loading']}>
              Загрузка...
            </div>
          }
        </ul>
      </main>
    </Layout>
  );
}
