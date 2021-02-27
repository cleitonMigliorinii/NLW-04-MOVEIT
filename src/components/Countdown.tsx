import { useState, useEffect, useContext }  from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css'


export function Countdown(){

    const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

    const [minuteLeft, minuteRifht] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRifht] = String(seconds).padStart(2, '0').split('');



    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRifht}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRifht}</span>
                </div>
            </div>

                { 
                    hasFinished ?
                    (
                        <button 
                        disabled
                        className={styles.startCountdownButton} >
                            Ciclo encerrado
                        </button>
                    ) :
                    (
                        <>
                            { isActive ? 
                                (
                                    <button 
                                        type="button" 
                                        className={`${styles.startCountdownButton} ${styles.activeCountdownButton}` }
                                        onClick={resetCountdown}>
                                            Abandonar ciclo
                                    </button>
                                ):
                                (  
                                    <button 
                                        type="button" 
                                        className={styles.startCountdownButton}
                                        onClick={startCountdown}>
                                        Iniciar um ciclo
                                    </button>)
                                }
                        </>

                    )

                }


                
            
         

         
        </div>
    );

}