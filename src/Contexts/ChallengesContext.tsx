import{createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import challenges from '../challenges.json';
import { LevelUpModal } from '../Components/LevelUpModal';
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
  closeLevelUpModal:()=>void;

}
interface ChallengesProviderProps{
  children:ReactNode;
    level:number, 
    currentExperience:number, 
    challengesCompleted:number
}
export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){
  const [level,setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrenceExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level+1)*4,2);

  useEffect(()=>{
    Notification.requestPermission();
  },[]);
  function levelUp(){
    setLevel(level+1);
    setIsLevelUpModalOpen(true);
  }
  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));

  },[level, currentExperience, challengesCompleted]);
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
        completeChallenge,
        closeLevelUpModal
         }
         }>
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
      
    </ChallengesContext.Provider>
  );
}