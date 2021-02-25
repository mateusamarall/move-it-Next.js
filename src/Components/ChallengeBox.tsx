
import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import { CountdownContext } from '../Contexts/CountdownContext';
import styles from '../styles/Components/ChallengeBox.module.css';

export function ChallengeBox() {
 const {
    activeChallenge,
    resetChallenge,
    completeChallenge
  } = useContext(ChallengesContext);

  const {resetCountDown} = useContext(CountdownContext);


 function handleChallengeSucceeded(){
  completeChallenge();
  resetCountDown();
 }
  
 function handleChallengeFailed(){
  resetChallenge();
  resetCountDown();
 }  

  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="body" />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
              >
                Não Completado
                </button>
              <button
                type="button"
                className={styles.challengeSucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completado
                </button>

            </footer>
          </div>
        ) : (

            <div className={styles.challengeNotActive}>
              <strong> Inicie um cilco para receber desafios a serem completados</strong>
              <p>
                <img src="icons/level-up.svg" alt="LEVEL UP" />
                Avance de level completando desafios
            </p>
            </div>
          )
      }
    </div>
  )
}