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
  const user = localStorage.getItem('userId');
  console.log(user)
  
  const petData =  () => {
    axios.get(`https://ureca.store/api/pets`)
    .then((response) => {
        setPetId( user === response.data.userId)
        console.log('petId :', response.data);
      })
    }
  

  useEffect(() => {
    const userData = (date) => {
      if (!date || isNaN(new Date(date).getTime())) {
        return ""; 
      }
      return new Date(date).toISOString().split("T")[0];
    };




        
    // const  = async () => {
    //   try {
    //     const response = await axios.get(`https://ureca.store/api/healths`);
    //     setAppointments(response.data.map(item => ({ ...item, date: new Date(item.date) })));
    //     console.log('댓글 목록:', response.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addAppointment = async (type, e) => {
    setAppointments([...appointments, { date: selectedDate, type, memo }]);
    const formData = new FormData();
    const formattedDate = formatDate(selectedDate);
    const userId = localStorage.getItem('userId');
    
    console.log("userId :", userId);
    try {
      // petId 가져오기
      const response = await axios.get(`https://ureca.store/api/pets/pet/${userId}`);
      const petId = response.data[0].petId;
      console.log("petId :", petId);
  
      // petId를 포함하여 formData에 추가
      formData.append("pet", petId);
    
      // 선택된 타입에 따라 필요한 필드를 formData에 추가
      if (type === "병원 방문일") {
        formData.append("visitedDate", formattedDate);
      } else if (type === "다음 방문일") {
        formData.append("nextCheckupDate", formattedDate);
      } else if (type === "건강 관리") {
        formData.append("healthDate", formattedDate);
        formData.append("notes", memo); // 메모 추가
      }
      console.log("formData 내용:", formData);
  
      // formData를 포함하여 POST 요청 전송
      const postResponse = await axios.post("/healths", formData);
      console.log("등록 data : ", postResponse.data);
      alert("등록 성공");
      setMemo("");
  
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류 발생");
    }
  };

  const toggleInput = (type) => {
    setShowInput({ ...showInput, [type]: !showInput[type] });
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
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
        return <Dot color={color} />;
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

      return classes;
    }
  };

    
  return (
    <Container>
      <Legend>
        <LegendItem>
          <Dot color="#FB3737" /> 병원 방문일
        </LegendItem>
        <LegendItem>
          <Dot color="#33E949" /> 건강 관리 기록
        </LegendItem>
        <LegendItem>
          <Dot color="#17A1FA" /> 다음 병원 방문일
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
          <Button onClick={() => toggleInput("hospital")}>
            {showInput.hospital ? "-" : "+"}
          </Button>
        </AppointmentInput>
        {showInput.hospital && (
          <InputWrapper>
            <DateInput
              type="date"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
            <RegisterButton onClick={(e) => addAppointment("병원 방문일", e)}>
              등록
            </RegisterButton>
          </InputWrapper>
        )}
        <AppointmentInput>
          <label>다음 방문일</label>
          <Button onClick={() => toggleInput("nextVisit")}>
            {showInput.nextVisit ? "-" : "+"}
          </Button>
        </AppointmentInput>
        {showInput.nextVisit && (
          <InputWrapper>
            <DateInput
              type="date"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
            <RegisterButton onClick={(e) => addAppointment("다음 방문일", e)}>
              등록
            </RegisterButton>
          </InputWrapper>
        )}
        <AppointmentInput>
          <label>건강 관리</label>
          <Button onClick={() => toggleInput("healthCare")}>
            {showInput.healthCare ? "-" : "+"}
          </Button>
        </AppointmentInput>
        {showInput.healthCare && (
          <InputWrapper>
            <DateInput
              type="date"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
            <MemoInput
              type="text"
              placeholder="메모를 입력하세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <RegisterButton onClick={(e) => addAppointment("건강 관리", e)}>
              등록
            </RegisterButton>
          </InputWrapper>
        )}
      </AppointmentSection>
      <AppointmentList>
        {appointments.map((appointment, index) => (
          <AppointmentItem key={index}>
            {appointment.type} - {appointment.date.toLocaleDateString()}
            {appointment.memo && (
              <MemoText> - 메모: {appointment.memo}</MemoText>
            )}
          </AppointmentItem>
        ))}
      </AppointmentList>
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
  }

  .react-calendar__tile--now {
    background: #fff3e8;
    border-radius: 8px;
  }

  .react-calendar__tile--active {
    background-color: #fff3e8;
    color: black;
    height: 5px;
    width: 5px;
  }

  .calendar-tile {
    position: relative;
    height: 60px;
  }

  .today {
    border: 2px solid #ffa764;
    border-radius: 8px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #17a1fa;
  }
  
  .selected {
    background-color: #fff3e8;
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

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
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
