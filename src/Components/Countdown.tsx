import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/Components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;


export function Countdown() {
  const {startNewChallenge} = useContext(ChallengesContext);

  
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(true);
      startNewChallenge();
    }
  }, [isActive, time]);
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>

        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>



      </div>
      {
        hasFinished ? (
          <button disabled className={styles.countdownButton}>
            Terminou...
          </button>
        ) :
          (
            <>
             { isActive ? (
              <button type="button" onClick={resetCountDown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Abandonar Ciclo
              </button>
            ) : (
              <button type="button" onClick={startCountDown} className={styles.countdownButton}>
                Iniciar Ciclo
                </button>
              )}
            </>
          )
      
      }


    </div>
  );
}