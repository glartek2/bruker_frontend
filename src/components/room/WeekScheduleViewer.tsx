import WeekSchedule, {ScheduleVariant} from './WeekSchedule';
import {useEffect, useMemo, useState} from 'react';
import {components, paths} from '../../api/schema';
import createClient from 'openapi-fetch';
import {useAppContext} from '../../context/AppContext';
import {dateFromDate, dateTimesOfWeek} from '../../model/Time';
import ViewProposedModal from '../modal/ViewProposedModal';
import ViewAcceptedModal from '../modal/ViewAcceptedModal';
import EditAcceptedModal from '../modal/EditAcceptedModal';
import ReserveEmptyModal from '../modal/ReserveEmptyModal';

type Reservation = components['schemas']['Reservation'];

const client = createClient<paths>({baseUrl: import.meta.env.VITE_API_URL});

function WeekScheduleViewer({variant}: WeekScheduleViewerProps) {
    const {state} = useAppContext();

    const [weekId, setWeekId] = useState<number>(24);
    const [schedule, setSchedule] = useState<Reservation[]>([]);
    const [meMode, setMeMode] = useState<boolean>(false);
    const dateTimes = useMemo(() => dateTimesOfWeek(weekId), [weekId]);

    function getDateFromWeekId(): string {
        const startDateTime = dateTimes[0];
        const endDateTime = dateTimes[6];
        return dateFromDate(startDateTime) + ' - ' + dateFromDate(endDateTime);
    }

    useEffect(() => {
        const startDateTime = dateTimes[0];
        const endDateTime = dateTimes[6];

        async function fetchSchedule() {
            const {data, error} = await client.GET('/api/reservation/', {
                headers: {
                    Authorization: 'Token ' + state?.user?.token,
                },
                params: {
                    query: {
                        date_time__gte: startDateTime.toISOString(),
                        date_time__lte: endDateTime.toISOString(),
                        me: meMode
                    },
                },
            });
            if (!error) {
                setSchedule(data);
            }
        }

        fetchSchedule();
    }, [dateTimes, state?.user?.token, meMode]);

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
          <button className='join-item btn w-40'>{getDateFromWeekId()}</button>
          <button
            className='join-item btn'
            onClick={() => {
              setWeekId(weekId + 1);
            }}
          >
            Następny »
          </button>
        </div>
          <div className='flex items-center gap-2'>
                    <input
                        type="checkbox"
                        id="meMode"
                        className="checkbox checkbox-primary"
                        checked={meMode}
                        onChange={(e) => setMeMode(e.target.checked)}
                    />
                    <label htmlFor="meMode" className="cursor-pointer select-none">
                        Tylko moje zajęcia
                    </label>
                </div>
      </div>
      <WeekSchedule
        dateTimes={dateTimes}
        schedule={schedule}
        variant={variant}
      />
    </div>
  );
}

interface WeekScheduleViewerProps {
  variant: ScheduleVariant;
}

export default WeekScheduleViewer;
