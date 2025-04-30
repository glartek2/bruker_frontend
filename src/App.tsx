import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WeekRoomView from './WeekRoomView';
import { Slot } from './Slot';

const slots: Slot[] = [
  {
    time: '08:00',
    cols: [
      { subject: 'TC', teacher: 'JD' },
      { subject: 'TC', teacher: 'JD' },
      null,
      { subject: 'PF', teacher: 'OD' },
      { subject: 'PF', teacher: 'OD' },
      null,
      null,
    ],
  },
  {
    time: '09:45',
    cols: [
      { subject: 'TC', teacher: 'JD' },
      null,
      null,
      { subject: 'PF', teacher: 'AT' },
      { subject: 'AB', teacher: 'LK' },
      null,
      null,
    ],
  },
  {
    time: '11:30',
    cols: [
      { subject: 'AM1', teacher: 'WE' },
      { subject: 'AM1', teacher: 'AH' },
      { subject: 'AM1', teacher: 'PO' },
      { subject: 'PF', teacher: 'AT' },
      { subject: 'AB', teacher: 'LK' },
      null,
      null,
    ],
  },
  {
    time: '13:15',
    cols: [
      { subject: 'AM1', teacher: 'WE' },
      { subject: 'AM1', teacher: 'AH' },
      { subject: 'AM1', teacher: 'PO' },
      null,
      null,
      null,
      null,
    ],
  },
  {
    time: '15:00',
    cols: [
      { subject: 'TM', teacher: 'BK' },
      { subject: 'TM', teacher: 'BK' },
      null,
      null,
      null,
      null,
      null,
    ],
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='grid grid-cols-[1fr_4fr_1fr]'>
        <div></div>
        <div>
          <div>
            <a href='https://vite.dev' target='_blank'>
              <img src={viteLogo} alt='Vite logo' />
            </a>
            <a href='https://react.dev' target='_blank'>
              <img src={reactLogo} alt='React logo' />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div>
            <button
              className='btn btn-primary'
              onClick={() => setCount(count => count + 1)}
            >
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p>Click on the Vite and React logos to learn more</p>
          <WeekRoomView slots={slots} />
        </div>
        <div></div>
      </div>
      <footer className='footer sm:footer-horizontal bg-neutral text-neutral-content p-10'>
        <nav>
          <h6 className='footer-title'>Services</h6>
          <a className='link link-hover'>Branding</a>
          <a className='link link-hover'>Design</a>
          <a className='link link-hover'>Marketing</a>
          <a className='link link-hover'>Advertisement</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Company</h6>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact</a>
          <a className='link link-hover'>Jobs</a>
          <a className='link link-hover'>Press kit</a>
        </nav>
        <nav>
          <h6 className='footer-title'>Legal</h6>
          <a className='link link-hover'>Terms of use</a>
          <a className='link link-hover'>Privacy policy</a>
          <a className='link link-hover'>Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}

export default App;
