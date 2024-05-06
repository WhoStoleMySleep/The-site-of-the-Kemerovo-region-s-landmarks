import styles from "./page.module.scss";
import useSWR from 'swr'
import Card from "@/components/Card/Card";
import fetcher from "@/util/fetcher";
import Layout from "@/components/Layout/Layout";

export default async function Home() {
  const data = await fetch( '/api/cities', {
    cache: "force-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async res => await res.json())

  return (
    <Layout>
      <main className={styles['main']}>
        <h1 className={styles['main__title']}>Достопримечательности в Кемеровской области</h1>
        <h2 className={styles['main__subtitle']}>Популярные города в Кемеровской области</h2>
        <ul className={styles['main__list']}>
          {data.length && data.map((element: any) => (
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
