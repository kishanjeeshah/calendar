import React, { useState } from 'react';

const Calendar = ({ events, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const totalDays = daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const generateCalendar = () => {
    const weeks = [];
    let days = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > totalDays) {
          days.push(null);
        } else {
          const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayCounter);
          days.push(currentDay);
          dayCounter++;
        }
      }
      weeks.push(days);
      days = [];
    }

    return weeks;
  };

  const weeks = generateCalendar();

  const handleDateClick = (date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className="m-5 border rounded-xl">

      <div className="flex justify-between items-center p-5 w-[500px] bg-slate-400 font-semibold ">

        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          Previous Month
        </button>

        <h2 className='font-bold text-2xl'>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>

        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          Next Month
        </button>

      </div>


      <div className="flex text-blue-700">

        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((week, index) => (
          <div key={index} className="flex-1 text-center p-3 font-bold ">
            {week}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {weeks.map((week, index) => (
          <div key={index} className="flex">
            {week.map((day, index) => (
              <div
                key={index}
                className="flex-1 text-center p-3 font-semibold cursor-pointer"
                onClick={() => handleDateClick(day)}
              >
                {day ? day.getDate() : ''}

                {events[day] && (
                  <div>
                    {events[day].map((event, index) => (
                      <div key={index} className="bg-blue-200 text-red-700 rounded-lg p-1">
                        {event}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Calendar;
