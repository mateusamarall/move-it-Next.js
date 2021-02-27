import { CompleteChallenges } from "../Components/CompleteChallenges";
import { Countdown } from "../Components/Countdown";
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import { ChallengesProvider } from '../Contexts/ChallengesContext';

import { ExpirenceBar } from "../Components/ExpirenceBar";
import { Profile } from "../Components/Profile";
import { ChallengeBox } from "../Components/ChallengeBox";
import styles from '../styles/Pages/Home.module.css';
import { CountDownProvider } from "../Contexts/CountdownContext";
interface Homeprops{
  level:number, 
  currentExperience:number, 
  challengesCompleted:number
}
export default function Home(props:Homeprops) {
  return (
    <ChallengesProvider       
    level={props.level} 
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExpirenceBar />
      <CountDownProvider >
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) =>{
 
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return{
    props:{
      level:Number(level), 
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    }
  }
}