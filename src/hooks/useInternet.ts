import {  useEffect, useState } from 'react';

export default function useInternet(){

    const [isOnLine, setIsOnLine] = useState(true);

    useEffect(() => {

        window.addEventListener('online', () => {
        setIsOnLine(true);
        });

    }, []);


    return {
        isOnLine
    }

}