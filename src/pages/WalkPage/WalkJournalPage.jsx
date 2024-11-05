import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import MonthlySummary from "../../components/walking/MonthlySummary";
import noWalkingAnimation from "../../components/walking/noWalking.json";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { images } from "../../components/Images";
import axios from "../../apis/AxiosInstance";

const WalkingJournal = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [walkingLogs, setWalkingLogs] = useState({});

  const fetchWalkingLogs = async () => {
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${import.meta.env.VITE_BASE_URL}/walkRoutes`
      );
      const logs = response.data.reduce((acc, log) => {
        const dateStr = new Date(log.createdAt).toISOString().split("T")[0];

        if (!acc[dateStr]) {
          acc[dateStr] = { duration: "00:00", distance: 0.0 };
        }
        acc[dateStr].distance += parseFloat(log.distanceKm);

        const [prevHours, prevMinutes] = acc[dateStr].duration
          .split(":")
          .map(Number);
        const [currentHours, currentMinutes] = log.walkTime
          .split(":")
          .map(Number);
        const totalMinutes = prevMinutes + currentMinutes;
        const totalHours =
          prevHours + currentHours + Math.floor(totalMinutes / 60);
        acc[dateStr].duration = `${String(totalHours).padStart(
          2,
          "0"
        )}:${String(totalMinutes % 60).padStart(2, "0")}`;

        acc[dateStr].distance = parseFloat(acc[dateStr].distance.toFixed(2));

        return acc;
      }, {});
      setWalkingLogs(logs);
    } catch (error) {
      console.error("Error fetching walking logs:", error);
    }
  };

  useEffect(() => {
    fetchWalkingLogs();
  }, []);

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

  const handleMonthChange = ({ activeStartDate }) => {
    setSelectedMonth(activeStartDate);
  };
  const handleGoButtonClick = () => {
    navigate("/walking/map");
  };

  return (
    <>
      <MonthlySummary selectedMonth={selectedMonth} walkingLogs={walkingLogs} />

      <StyledCard>
        <StyledCardContent>
          <CalendarContainer>
            <StyledCalendar
              onChange={handleDateClick}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              onActiveStartDateChange={handleMonthChange}
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
                의 산책 기록🔥
              </LogTitle>
              {walkingLogs[formatDate(selectedDate)] ? (
                <LogDetails>
                  <LogItem>
                    <img src={images.walkingDistance} alt="산책 시간" />
                    <div>
                      <h5>산책 시간</h5>
                      <p>{walkingLogs[formatDate(selectedDate)].duration}</p>
                    </div>
                  </LogItem>
                  <LogItem>
                    <img src={images.walkingTime} alt="산책 시간" />
                    <div>
                      <h5>산책 거리</h5>
                      <p>
                        {walkingLogs[formatDate(selectedDate)].distance}
                        km
                      </p>
                    </div>
                  </LogItem>
                </LogDetails>
              ) : (
                <NoLogMessage>
                  <Lottie
                    loop
                    animationData={noWalkingAnimation}
                    play
                    style={{ width: 160, height: 160 }}
                  />
                  이날은 산책 기록이 없어요
                  <GoWalkingButton onClick={handleGoButtonClick}>
                    산책 하러가기
                  </GoWalkingButton>
                </NoLogMessage>
              )}
            </LogContainer>
          )}
        </StyledCardContent>
      </StyledCard>
    </>
  );
};

const StyledCard = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transform: translateY(-60px);

  .react-calendar {
    border: none;
  }
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
  padding-top: 20px;
`;

const LogTitle = styled.h3`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const LogDetails = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
`;

const LogItem = styled.p`
  font-size: 0.875rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  h5 {
    font-size: 12px;
    color: #818181;
  }
  p {
    font-size: 16px;
    font-weight: 800;
  }
`;

const NoLogMessage = styled.p`
  font-size: 0.875rem;
  font-weight: 800;
  text-align: center;
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    margin: 0 auto;
  }
`;

const GoWalkingButton = styled.button`
  background-color: #fff3f0;
  color: #ff6e00;
  font-size: 14px;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 15px auto 0;

  &:hover {
    background-color: #ffe0d9;
  }

  &:active {
    background-color: #ffd0c5;
  }
`;

export default WalkingJournal;
