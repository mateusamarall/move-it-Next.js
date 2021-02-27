import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/Components/LevelUpModal.module.css';

export function LevelUpModal(){
  const {level, closeLevelUpModal} = useContext(ChallengesContext);
  return(
    <div className={styles.overlay}>
    <div className={styles.container}>
      <header>{level}</header>
      <strong>Parabéns</strong>
      <p>Vocễ Alcançou um novo nível.</p>
      <button type="button" onClick={closeLevelUpModal}>
        <img src="/icons/close.svg" alt="close modal" />
      </button>
    </div>
    </div>
  )
}