"use client";
import Card from "../../components/Card/Card";
import styles from './Attractions.module.scss'
import Layout from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import fetcher from "@/util/fetcher";
import {useEffect, useState} from "react";

const Attraction = () => {
  const {city, attraction} = useRouter().query;
  const [data, setData] = useState([])

  useEffect(() => {
    (async function () {
      if (city) {
        setData(await fetcher(`/api/${city}`))
      }
    })()
  }, [city]);

  return (
    <Layout>
      <main className={styles["main"]}>
        <h2 className={styles['main__subtitle']}>Популярные достопримечательности в {city}</h2>
        <ul className={styles["main__list"]}>
          {data ? data.map((element: any) => (
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

export default Attraction;