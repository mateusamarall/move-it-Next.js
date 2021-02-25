import { useContext} from 'react';
import { CountdownContext } from '../Contexts/CountdownContext';
import styles from '../styles/Components/Countdown.module.css';



export function Countdown() {
  const  { 
    minutes, 
    seconds,
    hasFinished,
    isActive,
    startCountDown, 
    resetCountDown } = useContext(CountdownContext);
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

 
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
              <button 
              type="button"
              onClick={resetCountDown} 
              className={`
              ${styles.countdownButton} 
              ${styles.countdownButtonActive}`}>
                Abandonar Ciclo
              </button>
            ) : (
              <button 
              type="button"
               onClick={startCountDown}
               className={styles.countdownButton}>
                Iniciar Ciclo
                </button>
              )}
            </>
          )
      
      }


    </div>
  );
}