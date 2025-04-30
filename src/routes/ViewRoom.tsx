import { SlotsRow } from '../model/Slot';
import PartWeekRoomView from '../components/room/PartWeekRoomView';

const slots: SlotsRow[] = [
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

function ViewRoom() {
  return (
    <>
      <div className='grid grid-cols-[1fr_4fr_1fr]'>
        <div></div>
        <div className='flex flex-row justify-center'>
          <div className='overflow-x-auto w-96 sm:w-md md:w-lg lg:w-xl xl:w-full'>
            <PartWeekRoomView slots={slots} />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ViewRoom;
