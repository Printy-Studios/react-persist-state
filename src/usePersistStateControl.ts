import { useEffect, useMemo } from 'react';

export default function usePersistStateControl<T>(state: T, setState: (new_state: T) => void, id: string, initial_value: T) {

    const _initial_value = useMemo(() => {
        const local_storage_value_str = localStorage.getItem('state:' + id);
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return initial_value;
    }, []);

    useEffect(() => {
        setState(_initial_value);
    }, [])

    useEffect(() => {
        const state_str = JSON.stringify(state); // Stringified state
        localStorage.setItem('state:' + id, state_str) // Set stringified state as item in localStorage
    }, [state]);
}