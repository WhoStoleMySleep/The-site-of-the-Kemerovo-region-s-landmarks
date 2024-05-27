"use client";
import styles from "./Attraction.module.scss";
import Layout from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import fetcher from "@/util/fetcher";
import {useEffect, useState} from "react";


const Attraction = () => {
  const {city, attraction} = useRouter().query;
  const [data, setData] = useState([])

  useEffect(() => {
    (async function () {
      if (city && attraction) {
        setData(await fetcher(`/api/${city}/${attraction}`))
      }
    })()
  }, [city, attraction]);
  
    return (
      <Layout>
          <main className={styles["main"]}>
            {data ? data.map((item: any) => (
                <div className={styles["main__wrapper"]} key={item.id}>
                  <h1 className={styles['main__title']}>Достопримечательность "{item.name}" в городе {city}</h1>
                  <img src={typeof (item.photo) !== 'undefined' ? item.photo.url : ''}
                       alt=""
                       className={styles["main__img"]}/>
                  <p className={styles["main__name"]}>{item.name}</p>
                  <p className={styles["main__address"]}>{item.address}</p>
                  <ul className={styles["main__info-list"]}>
                    {item.securityInfo.map((info: any) => (
                      <li key={info} className={styles["main__info-element"]}>{info}</li>
                    ))}
                  </ul>
                </div>)) :
              <div className={styles['main__loading']}>
                Загрузка...
              </div>
            }
          </main>
      </Layout>
    )
      ;
};

export default Attraction;