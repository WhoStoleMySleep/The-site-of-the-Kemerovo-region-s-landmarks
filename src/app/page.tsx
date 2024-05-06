"use client"
import styles from "./page.module.scss";
import Card from "@/components/Card/Card";
import Layout from "@/components/Layout/Layout";
import useSWR from "swr";
import fetcher from "@/util/fetcher";

export default function Home() {
  const {
    data,
    error,
    isLoading
  } = useSWR(
    'http://localhost:3000/api/cities',
    fetcher
  )

  return (
    <Layout>
      <main className={styles['main']}>
        <h1 className={styles['main__title']}>Достопримечательности в Кемеровской области</h1>
        <h2 className={styles['main__subtitle']}>Популярные города в Кемеровской области</h2>
        <ul className={styles['main__list']}>
          {!isLoading && data.map((element: any) => (
            <Card
              key={element.id}
              description={''}
              photoUrl={element.photo}
              linkUrl={`/${element.name}`}
              title={element.name}
            />
          ))}
        </ul>
      </main>
    </Layout>
  );
}
