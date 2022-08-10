/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/Link";
import styles from "../../styles/Details.module.css";

interface Stat {
  name: string;
  value: number;
}

interface PokemonDetails {
  name: string;
  type: Array<String>;
  stats: Array<Stat>;
  image: string;
}

interface Props {
  pokemon: PokemonDetails;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const resp = await fetch(
    `https://arindampal-0.github.io/pokemon-api/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: (await resp.json()) as PokemonDetails,
    },
  };
}

export default function Details({ pokemon }: Props) {
  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
        <div className={styles.layout}>
          <div>
            <img
              className={styles.picture}
              src={`https://arindampal-0.github.io/pokemon-api/${pokemon?.image}`}
              alt={pokemon?.name}
            />
          </div>
          <div>
            <div className={styles.name}>{pokemon?.name}</div>
            <div className={styles.type}>{pokemon?.type.join(", ")}</div>
            <table>
              <thead className={styles.header}>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {pokemon?.stats.map(({ name, value }: Stat) => (
                  <tr key={name}>
                    <td className={styles.attribute}>{name}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
