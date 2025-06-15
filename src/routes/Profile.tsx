import { ScheduleVariant } from '../components/room/WeekSchedule';
import WeekScheduleViewer from '../components/room/WeekScheduleViewer';
import RouteContainer from '../components/RouteContainer';

function Profile() {
  return (
    <RouteContainer>
      <div className='grid grid-cols-[1fr_4fr_1fr] p-8'>
        <div></div>
        <div className='space-y-8'>
          <h1 className='text-3xl'>Witaj ponownie</h1>
          <h2 className='text-2xl'>Twój plan</h2>
          <WeekScheduleViewer variant={ScheduleVariant.VIEW} />
        </div>
        <div></div>
      </div>
    </RouteContainer>
  );
}

export default Profile;
