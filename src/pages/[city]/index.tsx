import Card from "../../components/Card/Card";
import styles from './Attractions.module.scss'
import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "@/util/fetcher";
import Layout from "@/components/Layout/Layout";
import {GetServerSideProps} from "next";

interface Props {
  city: string | string[] | undefined;
  attractions: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { city } = context.params || {};
  const data = await fetch( `https://the-site-of-the-kemerovo-region-s-landmarks.vercel.app/${city}`, {
    cache: "force-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async res => await res.json())

  return {
    props: {
      city: city || '',
      attractions: data || [],
    },
  };
};

export default function Attractions({ city, attractions }: Props) {
  return (
    <Layout>
      <main className={styles["main"]}>
        <h2 className={styles['main__subtitle']}>Популярные достопримечательности в {city}</h2>
        <ul className={styles["main__list"]}>
          {attractions.length && attractions.map((element: any) => (
            <Card
              key={element.id}
              description={element.description}
              photoUrl={typeof (element.photo) !== 'undefined' ? element.photo.url : ''}
              linkUrl={`/${city}/${element.id}`}
              title={element.name}
            />
          ))}
        </ul>
      </main>
    </Layout>
  );
};