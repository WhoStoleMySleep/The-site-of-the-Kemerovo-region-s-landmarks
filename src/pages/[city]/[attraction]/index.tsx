import styles from "./Attraction.module.scss";
import Layout from "@/components/Layout/Layout";
import {GetServerSideProps} from "next";
import {router} from "next/client";


interface Props {
  city: string | string[] | undefined;
  attraction: any[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { city, attraction } = context.params || {};
  const data = await fetch( `https://the-site-of-the-kemerovo-region-s-landmarks.vercel.app/${city}/${attraction}`, {
    cache: "force-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async res => await res.json())

  return {
    props: {
      city: city || '',
      attraction: data || [],
    },
  };
};

const Attraction = ({ city, attraction }: Props) => {
    return (
      <Layout>
          <main className={styles["main"]}>
              {attraction.length &&
                <div className={styles["main__wrapper"]} key={attraction[0]?.id}>
                    <h1 className={styles['main__title']}>Достопримечательность "{attraction[0]?.name}" в городе {city}</h1>
                    <img src={typeof (attraction[0]?.photo) !== 'undefined' ? attraction[0].photo.url : ''}
                         alt=""
                         className={styles["main__img"]}/>
                    <p className={styles["main__name"]}>{attraction[0]?.name}</p>
                    <p className={styles["main__address"]}>{attraction[0]?.address}</p>
                    <ul className={styles["main__info-list"]}>
                        {attraction[0]?.securityInfo.map((info: any) => (
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