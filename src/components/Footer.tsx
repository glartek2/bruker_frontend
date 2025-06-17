import {NavLink} from 'react-router';
import {LogoMd, LogoNoMargin} from '../icons/Logo';

function Footer() {
    return (
        <footer className='bg-neutral text-neutral-content'>
            <div className='container mx-auto px-4 py-6'>
                <div className='flex flex-col items-center gap-4'>
                    {/* Logo and links centered */}
                    <div className='flex items-center gap-8'>
                        <LogoNoMargin/>
                        <div className='flex items-center gap-4'>
                            <NavLink to='/' className='link link-hover'>
                                Strona główna
                            </NavLink>
                            <NavLink to='/profile' className='link link-hover'>
                                Profile
                            </NavLink>
                        </div>
                    </div>

                    {/* Copyright below */}
                    <p className='text-sm text-base-content/60'>
                        © 2025 Wszystkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;