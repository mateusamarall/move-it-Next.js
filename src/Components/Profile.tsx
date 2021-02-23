 import styles from '../styles/Components/Profile.module.css';
 export function Profile(){
   return(

    <div className={styles.profileContainer}>
      <img src="https://github.com/mateusamarall.png" alt="profile-icon"/>
      <div>
        <strong>Mateus Amaral</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
          </p>
      </div>
    </div>

   );
 }