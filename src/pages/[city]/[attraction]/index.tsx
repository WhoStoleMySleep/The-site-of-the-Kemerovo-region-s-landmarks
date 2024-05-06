"use client"
import styles from "./Attraction.module.scss";
import Layout from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "@/util/fetcher";


const Attraction = () => {
  const {city, attraction} = useRouter().query;
  const {
    data,
    error,
    isLoading
  } = useSWR(
    `/api/${city}/${attraction}`,
    fetcher
  )

    return (
      <Layout>
          <main className={styles["main"]}>
              {!isLoading &&
                <div className={styles["main__wrapper"]} key={data[0]?.id}>
                    <h1 className={styles['main__title']}>Достопримечательность "{data[0]?.name}" в городе {city}</h1>
                    <img src={typeof (data[0]?.photo) !== 'undefined' ? data[0].photo.url : ''}
                         alt=""
                         className={styles["main__img"]}/>
                    <p className={styles["main__name"]}>{data[0]?.name}</p>
                    <p className={styles["main__address"]}>{data[0]?.address}</p>
                    <ul className={styles["main__info-list"]}>
                        {data[0]?.securityInfo.map((info: any) => (
                          <li key={info} className={styles["main__info-element"]}>{info}</li>
                        ))}
                    </ul>
                </div>
              }
          </main>
      </Layout>
    );
};

export default Attraction;