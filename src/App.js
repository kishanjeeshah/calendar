
import React, { useState } from 'react';
import Calendar from './components/Calendar';

const App = () => {
  const [events, setEvents] = useState({});

  const handleDateClick = (date) => {
    const eventName = prompt('Enter event description:');
      setEvents((prevEvents) => ({
        ...prevEvents,
        [date]: [...(prevEvents[date] || []), eventName],
      }));
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='bg-slate-800 w-full text-center p-5 text-white text-2xl font-bold' >Calendar App</h1>
      <Calendar events={events} onDateClick={handleDateClick} />
    </div>
  );
};

export default App;
