import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/Components/CompleteChallenges.module.css';
export function CompleteChallenges(){
  const{challengesCompleted} = useContext(ChallengesContext);
return(
  <div className={styles.compleatedChallengesContainer}>
    <span>Desafios Completos</span>
    <span>{challengesCompleted}</span>
  </div>
);
}