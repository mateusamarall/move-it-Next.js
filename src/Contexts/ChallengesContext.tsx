import{createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../challenges.json';
interface challenge{
  type:'body'|'eye',
  description:string,
  amount:number
}

interface challengesContextData{
  level:number,
  currentExperience:number;
  challengesCompleted:number;
  experienceToNextLevel:number;

  activeChallenge: challenge;
  levelUp:()=>void;
  startNewChallenge:()=>void; 
  resetChallenge:()=>void; 
  completeChallenge:()=>void;

}
interface ChallengesProviderProps{
  children:ReactNode;
}
export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({children}:ChallengesProviderProps){
  const [level,setLevel] = useState(1);
  const [currentExperience, setCurrenceExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level+1)*4,2);

  useEffect(()=>{
    Notification.requestPermission();
  },[]);
  function levelUp(){
    setLevel(level+1);
  }

  function startNewChallenge(){
  const randomChallengeIndex = Math.floor(Math.random()* challenges.length);
  const challenge = challenges[randomChallengeIndex];

  setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();
    if(Notification.permission==='granted'){
      new Notification('Novo desafio 🎉 ',{
        body:`Valendo ${challenge.amount} xp!`
      });
    }
 
    
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrenceExperience(finalExperience);
    setChallengesCompleted(challengesCompleted+1);
    setActiveChallenge(null);
    
  }
  return(
    <ChallengesContext.Provider value={
      {
        level,
        levelUp,
        currentExperience,
        challengesCompleted, 
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
         }
         }>
      {children}
    </ChallengesContext.Provider>
  );
}