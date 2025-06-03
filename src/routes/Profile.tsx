import RouteContainer from '../components/RouteContainer';

function ReserveCard() {
  return (
    <div className='card bg-base-100 shadow-sm'>
      <div className='card-body'>
        <h2 className='card-title'>Rezerwacja</h2>
        <p>Test</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Edytuj</button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <RouteContainer>
      <div className='grid grid-cols-[1fr_4fr_1fr] p-8'>
        <div></div>
        <div className='space-y-4'>
          <h1 className='text-2xl'>Rezerwacje</h1>
          <div className='columns-3 gap-4'>
            <ReserveCard />
            <ReserveCard />
            <ReserveCard />
          </div>
          <div className='columns-3 gap-4'>
            <ReserveCard />
            <ReserveCard />
            <ReserveCard />
          </div>
        </div>
        <div></div>
      </div>
    </RouteContainer>
  );
}

export default Profile;
