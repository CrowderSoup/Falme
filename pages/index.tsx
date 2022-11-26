import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useCallback, FormEvent } from 'react';

enum FLAME {
  F = 'f',
  L = 'l',
  A = 'a',
  M = 'm',
  E = 'e',
}

const MESSAGES = {
  'f': "You're best friends!",
  'l': "You're lovers!",
  'a': "You're attracted to each other!",
  'm': "You're married!",
  'e': "You're enemies!"
}

export default function Home() {
  const [firstPerson, setFirstPerson] = useState("");
  const [secondPerson, setSecondPerson] = useState("");
  const [result, setResult] = useState<FLAME | null>();
  const [shouldReset, setShouldReset] = useState(false);

  const filter = (letter: string) => {
    return !Object.values(FLAME).includes(letter as FLAME);
  }

  function getIndex(index: number, length: number) {
    if (index === length) {
      return index - 1;
    } else if (Math.abs(index - length) > index) {
      const i = Math.abs(index - (length - index)) - 1;
      if (i === index) {
        return i - 1;
      }
      return Math.abs(index - (length - index)) - 1;
    }

    return Math.abs(index - length) - 1;
  }

  const submit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const remainingFirstLetters = firstPerson.toLowerCase().split('').filter(filter);
    const remainingSecondLetters = secondPerson.toLowerCase().split('').filter(filter);

    let totalRemainingLetters = remainingFirstLetters.length + remainingSecondLetters.length;

    let flameResult = Object.values(FLAME);

    while (flameResult.length > 1) {
      const itemToRemove = flameResult[getIndex(flameResult.length, totalRemainingLetters)];
      flameResult = flameResult.filter((item) => item !== itemToRemove);
    }

    setResult(flameResult[0]);
    setShouldReset(true);
  }, [firstPerson, secondPerson, result, setResult, setShouldReset]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Flame</title>
        <meta name="description" content="A fun game to see if you're friends, lovers, attracted, marrying, or enemies!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Flame
        </h1>

        <p className={styles.description}>
          A fun game to see if you're friends, lovers, attracted, marrying, or enemies!
        </p>

        <div>
          <form onSubmit={(event) => submit(event)}>
            <div>
              <label htmlFor="firstPerson">
                The First Persons Name&nbsp;
                <input type="text" id="firstPerson" value={firstPerson} onChange={(event) => setFirstPerson(event.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="secondPerson">
                The Second Persons Name&nbsp;
                <input type="text" id="secondPerson" value={secondPerson} onChange={(event) => setSecondPerson(event.target.value)} />
              </label>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div>

        </div>
        <div>
          {shouldReset && (
            <div>
              {result && (
                <div>
                  {MESSAGES[result]}
                </div>
              )}
              <div>
                <button onClick={(event) => {
                  event.preventDefault();
                  setResult(null);
                  setFirstPerson("");
                  setSecondPerson("");
                  setShouldReset(false);
                }}>Reset!</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
