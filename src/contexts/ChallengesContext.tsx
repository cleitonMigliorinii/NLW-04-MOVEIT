import { createContext, ReactNode, useEffect, useState} from 'react';

import challenges from '../../challenges.json';

import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge {
    type : 'body' | 'eye';
    description : string;
    amount : number;
}

interface ChallengesContextData {
    level: number;
    currentExpirence: number;
    challengesCompleted: number; 
    levelUp: () => void;
    startNewChallenges: () => void;
    activeChallenges: Challenge;
    resetChallenges: () => void;
    expirenceToNextLevel : number;
    completChallenges: () => void;
    closeUpModal: () => void;

}

interface ChallengesProviderProps {
    children : ReactNode;
    level: number;
    currentExpirence : number;
    challengesCompleted: number;
   
      
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExpirence, setCurrentExpirence] = useState(rest.currentExpirence ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0 );
    const [activeChallenges, setActiveChallenges] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const expirenceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExpirence', String(currentExpirence));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExpirence, challengesCompleted]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);

    }


    function closeUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenges(){
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];

        setActiveChallenges(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenges(){
        setActiveChallenges(null);
    }


    function completChallenges(){
        
        if(!activeChallenges){
            return;
        }

        const { amount } = activeChallenges;

        let finalExperience = currentExpirence + amount;

        if(finalExperience >= expirenceToNextLevel){

            finalExperience = finalExperience - expirenceToNextLevel;
            levelUp();
            
        }

        setCurrentExpirence(finalExperience);
        setActiveChallenges(null);
        setChallengesCompleted(challengesCompleted + 1);



    }


    return(
        <ChallengesContext.Provider value={{
            level, 
            currentExpirence, 
            challengesCompleted, 
            levelUp,
            startNewChallenges,
            activeChallenges,
            resetChallenges,
            expirenceToNextLevel,
            completChallenges,
            closeUpModal
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal></LevelUpModal> }
        </ChallengesContext.Provider>   
    );

}   
