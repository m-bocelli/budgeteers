'use client';
import styles from './page.module.css';
import { UserAuth } from '../js/AuthContext';
import { useEffect, useState } from 'react';

export default function CreateHouseUI() {
    const { userData } = UserAuth();
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (userData) {
            setEndpoint(`http://localhost:2001/createHouse?user=${userData.id}`);
        }
    }, [userData]);

    return (
        <div className={styles.container}>
            <h1> Create House 🏠 </h1>
            <form id='createHouse' action={endpoint} method='POST'>
                <label>House Name:</label>
                <input
                    className={styles.textInput}
                    type='text'
                    id='houseName'
                    name='houseName'
                    placeholder='House name'
                ></input>
                <br></br>
                <input
                    className={styles.create}
                    type='submit'
                    placeholder='Create'
                ></input>
            </form>
        </div>
    );
}
