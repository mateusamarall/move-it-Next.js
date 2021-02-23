import { CompleteChallenges } from "../Components/CompleteChallenges";
import { Countdown } from "../Components/Countdown";
import {ExpirenceBar} from "../Components/ExpirenceBar";
import { Profile } from "../Components/Profile";
import Head from 'next/head';
import styles from '../styles/Pages/Home.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExpirenceBar />
      <section>
        <div>
          <Profile/>
          <CompleteChallenges/>
          <Countdown/>
        </div>
        <div></div>
      </section>
    </div>
  )
}
