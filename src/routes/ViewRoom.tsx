import { DaySlots } from '../model/Slot';
import WeekRoomView from '../components/room/WeekRoomView';

const slots: DaySlots[] = [
  {
    day: 'Pon',
    rows: [
      { type: 'taken', time: '8:00', spans: 1, subject: 'TC' },
      { type: 'taken', time: '9:45', spans: 1, subject: 'TC' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'taken', time: '13:15', spans: 1, subject: 'PF' },
      { type: 'taken', time: '15:00', spans: 1, subject: 'PF' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Wt',
    rows: [
      { type: 'taken', time: '8:00', spans: 1, subject: 'AM1' },
      { type: 'taken', time: '9:45', spans: 1, subject: 'AM1' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'taken', time: '13:15', spans: 1, subject: 'PF' },
      { type: 'taken', time: '15:00', spans: 1, subject: 'PF' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Śr',
    rows: [
      { type: 'taken', time: '8:00', spans: 1, subject: 'TC' },
      { type: 'taken', time: '9:45', spans: 1, subject: 'TC' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'taken', time: '13:15', spans: 1, subject: 'PF' },
      { type: 'taken', time: '15:00', spans: 1, subject: 'PF' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Czw',
    rows: [
      { type: 'taken', time: '8:00', spans: 1, subject: 'PC' },
      { type: 'taken', time: '9:45', spans: 1, subject: 'PC' },
      { type: 'taken', time: '11:30', spans: 1, subject: 'DF' },
      { type: 'taken', time: '13:15', spans: 1, subject: 'PF' },
      { type: 'taken', time: '15:00', spans: 1, subject: 'PF' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Pt',
    rows: [
      { type: 'taken', time: '8:00', spans: 1, subject: 'TC' },
      { type: 'taken', time: '9:45', spans: 1, subject: 'TC' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'taken', time: '13:15', spans: 1, subject: 'PF' },
      { type: 'taken', time: '15:00', spans: 1, subject: 'PF' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Sob',
    rows: [
      { type: 'empty', time: '8:00', spans: 1, claimID: '1' },
      { type: 'empty', time: '9:45', spans: 1, claimID: '1' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'empty', time: '13:15', spans: 1, claimID: '1' },
      { type: 'empty', time: '15:00', spans: 1, claimID: '1' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
  {
    day: 'Nie',
    rows: [
      { type: 'empty', time: '8:00', spans: 1, claimID: '1' },
      { type: 'empty', time: '9:45', spans: 1, claimID: '1' },
      { type: 'empty', time: '11:30', spans: 1, claimID: '1' },
      { type: 'empty', time: '13:15', spans: 1, claimID: '1' },
      { type: 'empty', time: '15:00', spans: 1, claimID: '1' },
      { type: 'empty', time: '16:45', spans: 1, claimID: '2' },
      { type: 'empty', time: '18:30', spans: 1, claimID: '3' },
    ],
  },
];

function ViewRoom() {
  return (
    <>
      <div className='grid grid-cols-[1fr_4fr_1fr]'>
        <div></div>
        <div className='flex flex-row justify-center'>
          <div>
            <div className='flex justify-center'>
              <div className='join'>
                <button className='join-item btn'>« Poprzedni</button>
                <button className='join-item btn'>28.04-04.05</button>
                <button className='join-item btn'>Następny »</button>
              </div>
            </div>
            <WeekRoomView daysSlots={slots} />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ViewRoom;
