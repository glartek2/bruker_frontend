import WeekSchedule from './WeekSchedule';
import { useEffect, useState } from 'react';
import { components, paths } from '../../api/schema';
import createClient from 'openapi-fetch';
import { useAuth } from '../../context/AppContext';

type Reservation = components['schemas']['Reservation'];

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function WeekViewer() {
  const { state } = useAuth();

  function padDate(date: number): string {
    return date.toString().padStart(2, '0');
  }

  function getRangeDateTimeFromWeekId(week: number): [Date, Date] {
    const startDate = new Date(2025, 0);
    startDate.setDate(week * 7 - 1);
    startDate.setTime(startDate.getTime() + 0);
    const endDate = new Date(2025, 0);
    endDate.setDate(week * 7 + 5);
    endDate.setTime(endDate.getTime() + 86400000 - 1);
    return [startDate, endDate];
  }

  function getDateFromWeekId(week: number): string {
    const [weekStartDate, weekEndDate] = getRangeDateTimeFromWeekId(week);
    const weekStartDay = weekStartDate.getDate();
    const weekStartMonth = weekStartDate.getMonth() + 1;
    const weekEndDay = weekEndDate.getDate();
    const weekEndMonth = weekEndDate.getMonth() + 1;
    return (
      padDate(weekStartDay) +
      '.' +
      padDate(weekStartMonth) +
      '-' +
      padDate(weekEndDay) +
      '.' +
      padDate(weekEndMonth)
    );
  }

  const [weekId, setWeekId] = useState<number>(24);
  const [schedule, setSchedule] = useState<Reservation[]>([]);

  useEffect(() => {
    const [startDate, endDate] = getRangeDateTimeFromWeekId(weekId);
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();
    async function fetchSchedule() {
      const { data, error } = await client.GET('/api/reservation/', {
        headers: {
          Authorization: 'Token ' + state?.user?.token,
        },
        params: {
          query: {
            date_time__gte: startDateISO,
            date_time__lte: endDateISO,
          },
        },
      });
      if (!error) {
        setSchedule(data);
      }
    }
    fetchSchedule();
  }, [weekId, state?.user?.token]);

  return (
    <div>
      <div className='flex justify-center'>
        <div className='join'>
          <button
            className='join-item btn'
            onClick={() => {
              setWeekId(weekId - 1);
            }}
          >
            « Poprzedni
          </button>
          <button className='join-item btn w-25'>
            {getDateFromWeekId(weekId)}
          </button>
          <button
            className='join-item btn'
            onClick={() => {
              setWeekId(weekId + 1);
            }}
          >
            Następny »
          </button>
        </div>
      </div>
      <WeekSchedule schedule={schedule} />
    </div>
  );
}

export default WeekViewer;
