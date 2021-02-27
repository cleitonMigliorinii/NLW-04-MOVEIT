import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){

    const {level, closeUpModal} = useContext(ChallengesContext);


    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Voce alcançou um novo level</p>

                <button type="button" onClick={closeUpModal}>
                    <img src="/icons/close.svg"></img>
                </button>
            </div>
        </div>
    );

}