import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

const WalkingJournal = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [walkingLogs] = useState({
    "2024-11-01": { duration: "30:00", distance: "2.5" },
    "2024-11-03": { duration: "45:00", distance: "3.8" },
    "2024-11-05": { duration: "20:00", distance: "1.5" },
  });

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      const hasWalk = walkingLogs[dateStr];

      if (hasWalk) {
        return <WalkingDot />;
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      const isToday = formatDate(new Date()) === dateStr;
      const isSelected = selectedDate && formatDate(selectedDate) === dateStr;

      let classes = "calendar-tile";

      if (isToday) {
        classes += " today";
      }
      if (isSelected) {
        classes += " selected";
      }

      return classes;
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <StyledCard>
      <StyledCardContent>
        <CalendarContainer>
          <StyledCalendar
            onChange={handleDateClick}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        </CalendarContainer>

        {selectedDate && (
          <LogContainer>
            <LogTitle>
              {selectedDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </LogTitle>
            {walkingLogs[formatDate(selectedDate)] ? (
              <LogDetails>
                <LogItem>
                  산책 시간: {walkingLogs[formatDate(selectedDate)].duration}
                </LogItem>
                <LogItem>
                  산책 거리: {walkingLogs[formatDate(selectedDate)].distance}km
                </LogItem>
              </LogDetails>
            ) : (
              <NoLogMessage>산책 기록이 없습니다.</NoLogMessage>
            )}
          </LogContainer>
        )}
      </StyledCardContent>
      <br />
      <br />
      <br />
      <br />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transform: translateY(-20px);
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
`;

const CalendarContainer = styled.div`
  .calendar-tile {
    position: relative;
    height: 60px;
  }

  .today {
    border: 2px solid #ffa764;
    border-radius: 8px;
  }

  .selected {
    background-color: #fff3e8;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;

  .react-calendar__tile {
    padding: 1em 0.5em;
    height: 60px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #17a1fa;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    abbr {
      text-decoration-line: none;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9ca3af;
  }

  .react-calendar__navigation {
    margin-bottom: 15px;
    text-align: center;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 16px;

    &:disabled {
      background-color: #f0f0f0;
    }

    &:enabled:hover,
    &:enabled:focus {
      background-color: #fff3e8;
    }
  }

  .react-calendar__tile {
    &:enabled:hover,
    &:enabled:focus {
      background-color: #fff3e8;
    }

    &--now {
      background: transparent;
    }

    &--active {
      background: #fff3e8;
      color: black;
    }
  }
`;

const WalkingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #ffa764;
  border-radius: 50%;
  margin: 4px auto 0;
`;

const LogContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const LogTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const LogDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LogItem = styled.p`
  font-size: 0.875rem;
  color: #374151;
`;

const NoLogMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export default WalkingJournal;
