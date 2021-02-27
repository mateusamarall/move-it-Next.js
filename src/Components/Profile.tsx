 import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/Components/Profile.module.css';
 export function Profile(){
   const {level} = useContext(ChallengesContext);
   return(

    <div className={styles.profileContainer}>
      <img src="https://github.com/omateusamaral.png" alt="profile-icon"/>
      <div>
        <strong>Mateus Amaral</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>

            {' '}Level {level}
          </p>
      </div>
    </div>

   );
 }