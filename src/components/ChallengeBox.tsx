import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const { activeChallenges, resetChallenges, completChallenges } = useContext(ChallengesContext);
    const { resetCountdown} = useContext(CountdownContext);

    function handleChallengeSucceed(){
        completChallenges();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenges();
        resetCountdown();
    }


    return(

        <div className={styles.challengeBoxContainer}>
            
            {
                activeChallenges ? (
                    <div className={styles.challengeBoxActive}>
                        <header>Ganha {activeChallenges.amount} xp</header>

                        <main>
                            <img src={ `icons/${activeChallenges.type}.svg` }></img>
                            <strong>
                                Novo desafio
                            </strong>
                            <p>{activeChallenges.description}</p>
                        </main>

                        <footer>
                            <button type="button"
                            onClick={handleChallengeFailed}
                            className={styles.challengeFailedButton}>
                                Falhei
                            </button>


                            <button type="button"
                            onClick={handleChallengeSucceed}
                            className={styles.challengeSucceededButton}>
                                Completei
                            </button>
                        </footer>
                    </div>
                ) : 
                (
                    <div className={styles.challengeBoxNotActive}>
                    <strong>
                        Finalize um ciclo para receber desafios a serem completados
                    </strong>
    
                    <p>
                        <img src="icons/level-up.svg"></img>
                        Avance de level completanto desafios.
                    </p>
    
                    </div>
                )
            }
         
        </div>

    );

}