import axios from "../../apis/AxiosInstance";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const HealthCare = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [petId, setPetId] = useState();
  const [showInput, setShowInput] = useState({
    hospital: true,
    nextVisit: false,
    healthCare: false,
  });
  const [memo, setMemo] = useState("");
  const userId = localStorage.getItem("userId");

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "";
    }
    return new Date(date).toISOString().split("T")[0];
  };

  // 펫 데이터 가져오기
  const fetchPetData = () => {
    axios
      .get(`https://ureca.store/api/pets`)
      .then((response) => {
        const filteredPets = response.data.filter(
          (data) => data.user === parseInt(userId)
        );
        if (filteredPets.length > 0) {
          const petId = filteredPets.map((pet) => pet.petId)[0]; // petId 추출
          setPetId(petId);
        }
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  };

  // 건강 기록 데이터 가져오기
  const fetchHealthData = async (petId) => {
    try {
      const response = await axios.get(`/healths`);
      const PetHealthData = response.data.filter((item) => item.pet === petId);

      setAppointments(
        PetHealthData.map((item) => {
          let type = "";
          if (item.visitedDate) {
            type = "병원 방문일";
          } else if (item.nextCheckupDate) {
            type = "다음 방문일";
          } else if (item.healthDate) {
            type = "건강 관리";
          }
          return {
            ...item,
            date: new Date(
              item.visitedDate || item.nextCheckupDate || item.healthDate
            ),
            type,
          };
        })
      );
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  useEffect(() => {
    if (petId) {
      fetchHealthData(petId);
    }
  }, [petId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addAppointment = async (type, e) => {
    e.preventDefault(); // 기본 동작 방지
    const newAppointment = {
      date: selectedDate,
      type,
      memo,
    };
    setAppointments([...appointments, newAppointment]);
    const formData = new FormData();
    const formattedDate = formatDate(selectedDate);
    try {
      formData.append("pet", petId);
      if (type === "병원 방문일") {
        formData.append("visitedDate", formattedDate);
      } else if (type === "다음 방문일") {
        formData.append("nextCheckupDate", formattedDate);
      } else if (type === "건강 관리") {
        formData.append("healthDate", formattedDate);
        formData.append("notes", memo);
      }

      const postResponse = await axios.post("/healths", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMemo("");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 날짜에 따른 캘린더 타일 표시
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      const appointment = appointments.find(
        (app) => formatDate(app.date) === dateStr
      );

      if (appointment) {
        let color = "";
        if (appointment.type === "병원 방문일") {
          color = "#FB3737";
        } else if (appointment.type === "다음 방문일") {
          color = "#17A1FA";
        } else if (appointment.type === "건강 관리") {
          color = "#33E949";
        }
        return <SmallDot color={color} />;
      }
    }
    return null;
  };

  // 날짜 강조 스타일 적용
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

      const appointment = appointments.find(
        (app) => formatDate(app.date) === dateStr
      );
      if (appointment) {
        if (appointment.type === "병원 방문일") {
          classes += " hospital-visit";
        } else if (appointment.type === "다음 방문일") {
          classes += " next-visit";
        } else if (appointment.type === "건강 관리") {
          classes += " health-care";
        }
      }

      return classes;
    }
  };

  return (
    <Container>
      <Legend>
        <LegendItem>
          <SmallDot color="#FB3737" /> 병원 방문일
        </LegendItem>
        <LegendItem>
          <SmallDot color="#33E949" /> 건강 관리 기록
        </LegendItem>
        <LegendItem>
          <SmallDot color="#17A1FA" /> 다음 병원 방문일
        </LegendItem>
      </Legend>
      <CalendarWrapper>
        <StyledCalendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </CalendarWrapper>
      <AppointmentSection>
        <AppointmentInput>
          <label>병원 방문일</label>
          <RegisterButton onClick={(e) => addAppointment("병원 방문일", e)}>
            등록
          </RegisterButton>
        </AppointmentInput>
        <AppointmentInput>
          <label>다음 방문일</label>
          <RegisterButton onClick={(e) => addAppointment("다음 방문일", e)}>
            등록
          </RegisterButton>
        </AppointmentInput>
        <AppointmentInput>
          <label>건강 관리</label>

          <RegisterButton onClick={(e) => addAppointment("건강 관리", e)}>
            등록
          </RegisterButton>
        </AppointmentInput>
      </AppointmentSection>
    </Container>
  );
};

export default HealthCare;

const Container = styled.div`
  padding: 64px 10px;
`;

const CalendarWrapper = styled.div`
  margin-bottom: 20px;

  .react-calendar {
    border: none;
  }
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__tile {
    padding: 1em 0.5em;
    height: 60px;
    position: relative;
  }

  .react-calendar__tile--now {
    border-radius: 8px;
  }

  .react-calendar__tile--active {
    color: black;
    height: 5px;
    width: 5px;
  }

  .calendar-tile {
    position: relative;
    height: 60px;
  }

  .selected {
    background-color: #fff3e8;
  }

  .today {
    border: 2px solid #ffa764;
    border-radius: 8px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #17a1fa;
  }

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

const Legend = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
  font-size: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
`;

const SmallDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 auto;
  display: block;
`;

const AppointmentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const AppointmentInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MemoInput = styled.input`
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: auto;
  width: 100%;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 1px solid #ec7a4f;
  }
`;

const RegisterButton = styled(Button)`
  border: 1px solid #ec7a4f;
  color: #ec7a4f;
  margin-left: 5px;

  &:hover {
    background-color: #ec7a4f;
    color: wheat;
  }
`;

const AppointmentList = styled.div`
  width: 100%;
  max-width: 500px;
`;

const AppointmentItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const MemoText = styled.span`
  font-style: italic;
  color: #555;
`;
