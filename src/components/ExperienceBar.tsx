import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){

    const { currentExpirence, expirenceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round((currentExpirence * 100) / expirenceToNextLevel);

    return(

        <header className={styles.expirenceBar} >

            <span>0 xp</span>
            <div>
                <div style= {{ width : `${percentToNextLevel}%`}} />

                <span className={styles.currentExperience}  style= {{ left : `${percentToNextLevel}%`}}> 
                {currentExpirence} xp</span>
            </div>
            <span>{expirenceToNextLevel} xp</span>
        </header>

    );

}