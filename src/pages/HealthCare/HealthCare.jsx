import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const HealthCare = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [showInput, setShowInput] = useState({ hospital: false, nextVisit: false, healthCare: false });
  const [memo, setMemo] = useState('');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const addAppointment = type => {
    setAppointments([...appointments, { date: selectedDate, type, memo }]);
    setMemo('');
  };

  const toggleInput = type => {
    setShowInput({ ...showInput, [type]: !showInput[type] });
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
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </CalendarWrapper>
      <AppointmentSection>
        <AppointmentInput>
          <label>병원 방문일</label>
          <Button onClick={() => toggleInput('hospital')}>{showInput.hospital ? '-' : '+'}</Button>
        </AppointmentInput>
        {showInput.hospital && (
          <InputWrapper>
            <DateInput type="date" onChange={e => handleDateChange(new Date(e.target.value))} />
            <RegisterButton onClick={() => addAppointment('병원 방문일')}>등록</RegisterButton>
          </InputWrapper>
        )}
        <AppointmentInput>
          <label>다음 방문일</label>
          <Button onClick={() => toggleInput('nextVisit')}>{showInput.nextVisit ? '-' : '+'}</Button>
        </AppointmentInput>
        {showInput.nextVisit && (
          <InputWrapper>
            <DateInput type="date" onChange={e => handleDateChange(new Date(e.target.value))} />
            <RegisterButton onClick={() => addAppointment('다음 방문일')}>등록</RegisterButton>
          </InputWrapper>
        )}
        <AppointmentInput>
          <label>건강 관리</label>
          <Button onClick={() => toggleInput('healthCare')}>{showInput.healthCare ? '-' : '+'}</Button>
        </AppointmentInput>
        {showInput.healthCare && (
          <InputWrapper>
            <DateInput type="date" onChange={e => handleDateChange(new Date(e.target.value))} />
            <MemoInput
              type="text"
              placeholder="메모를 입력하세요"
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
            <RegisterButton onClick={() => addAppointment('건강 관리')}>등록</RegisterButton>
          </InputWrapper>
        )}
      </AppointmentSection>
      <AppointmentList>
        {appointments.map((appointment, index) => (
          <AppointmentItem key={index}>
            {appointment.type} - {appointment.date.toLocaleDateString()}
            {appointment.memo && <MemoText> - 메모: {appointment.memo}</MemoText>}
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
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
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const DateInput = styled.input`
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MemoInput = styled.input`
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  font-weight: bold;
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
  background-color: #4caf50;
  margin-left: 5px;

  &:hover {
    background-color: #45a049;
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
