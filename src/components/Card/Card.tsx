import React from 'react';
import styles from './Card.module.scss';
import Link from "next/link";

const Card = (props: any) => {
    const {title, description, photoUrl, linkUrl} = props;

    return (
        <li key={title} className={styles.card}>
            <Link href={linkUrl}>
                <img src={photoUrl} alt="" className={styles['card__img']}/>
                <p className={styles['card__name']}>{title}</p>
                <p className={styles['card__address']}>{description}</p>
            </Link>
        </li>
    );
};

export default Card;