import { useState } from 'react';
import { Usuario } from '../Interfaces/Usuario';

export const UseRegisterUserForm = (initState: Usuario) => {
    const [user, setUser] = useState(initState);

    const OnChange = (value: string, field: keyof Usuario) => {
        setUser({
            ...user,
            [field]: value
        });
    }

    const setFormValue = (form: Usuario) => {
        setUser(form);
    }

    return {
        ...user,
        form: user,
        OnChange,
        setFormValue
    }

}