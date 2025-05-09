import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RouteContainer from '../components/RouteContainer';
import {AppContext} from '../context/AppContext';

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = useContext(AppContext)!;
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login/`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) throw new Error('Login failed');

            const userData = await response.json();

            dispatch({type: 'SET_USER', payload: userData});
            navigate('/profile');
        } catch (error) {
            console.error(error);
            alert('Niepoprawne dane logowania');
        }
    };

    return (
        <RouteContainer>
            <div className='hero bg-base-200 min-h-screen'>
                <div className='hero-content flex-col'>
                    <div className='text-center'>
                        <h1 className='text-5xl font-bold'>Logowanie</h1>
                        <p className='py-6'>Podaj swoje dane aby się zalogować</p>
                    </div>
                    <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                        <form className='card-body' onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Email</span>
                                </label>
                                <input
                                    type='email'
                                    placeholder='email'
                                    className='input input-bordered'
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Hasło</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='hasło'
                                    className='input input-bordered'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='form-control mt-6'>
                                <button type='submit' className='btn btn-primary'>
                                    Zaloguj się
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </RouteContainer>
    );
};

export default LoginView;
