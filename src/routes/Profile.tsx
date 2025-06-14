import WeekViewer from '../components/room/WeekViewer';
import RouteContainer from '../components/RouteContainer';

function Profile() {
  return (
    <RouteContainer>
      <div className='grid grid-cols-[1fr_4fr_1fr] p-8'>
        <div></div>
        <div className='space-y-4'>
          <h1>Witaj ponownie</h1>
          <h2 className='text-2xl'>Twój plan</h2>
          <WeekViewer />
        </div>
        <div></div>
      </div>
    </RouteContainer>
  );
}

export default Profile;
