import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MonthlySummary = ({ selectedMonth, walkingLogs }) => {
  const [totalTime, setTotalTime] = useState("00:00");
  const [totalDistance, setTotalDistance] = useState("0.0");

  useEffect(() => {
    const calculateTotals = () => {
      let totalMinutes = 0;
      let totalDistance = 0;

      Object.keys(walkingLogs).forEach((date) => {
        const [year, month] = date.split("-");
        const selectedYear = selectedMonth.getFullYear();
        const selectedMonthIndex = selectedMonth.getMonth() + 1;

        if (
          parseInt(year) === selectedYear &&
          parseInt(month) === selectedMonthIndex
        ) {
          const { duration, distance } = walkingLogs[date];
          const [minutes, seconds] = duration.split(":").map(Number);

          totalMinutes += minutes;
          totalDistance += parseFloat(distance);
        }
      });

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setTotalTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      );
      setTotalDistance(totalDistance.toFixed(1));
    };

    calculateTotals();
  }, [walkingLogs, selectedMonth]);

  return (
    <SummaryContainer>
      <SummaryTitle>{selectedMonth.getMonth() + 1}월 총 산책 기록</SummaryTitle>
      <SummaryCards>
        <SummaryCard>
          <SummaryLabel>누적 산책 시간</SummaryLabel>
          <SummaryValue>{totalTime}</SummaryValue>
        </SummaryCard>
        <DistanceCard>
          <SummaryLabel>누적 산책 거리</SummaryLabel>
          <SummaryValue>{totalDistance}km</SummaryValue>
        </DistanceCard>
      </SummaryCards>
    </SummaryContainer>
  );
};

export default MonthlySummary;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  transform: translateY(-30px);
`;

const SummaryTitle = styled.h2`
  color: #ff6e00;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
`;

const SummaryCards = styled.div`
  display: flex;
  gap: 12px;
`;

const SummaryCard = styled.div`
  background-color: #ffe0b2;
  padding: 8px 12px;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const DistanceCard = styled(SummaryCard)`
  background-color: #fec079;
`;

const SummaryLabel = styled.p`
  font-size: 12px;
  color: #374151;
  margin: 0;
`;

const SummaryValue = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;
