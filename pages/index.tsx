/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface Props {
  pokemons: Array<Pokemon>;
}

export async function getServerSideProps() {
  const resp = await fetch(
    "https://arindampal-0.github.io/pokemon-api/index.json"
  );

  return {
    props: {
      pokemons: (await resp.json()) as Array<Pokemon>,
    },
  };
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Pokemon List using SSR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://arindampal-0.github.io/pokemon-api/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
