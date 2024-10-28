import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const { kakao } = window;

const WalkingMap = () => {
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [polyline, setPolyline] = useState(null); // 경로선을 상태로 관리
  const [routeDistance, setRouteDistance] = useState(null); // 경로 길이 상태 추가
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  // 타이머 상태 추가
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 기능
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = useCallback(
    (mouseEvent) => {
      const coords = mouseEvent.latLng;

      if (!originCoords) {
        if (originMarker) {
          originMarker.setMap(null);
        }
        const newOriginMarker = new kakao.maps.Marker({
          position: coords,
        });
        newOriginMarker.setMap(map);
        setOriginMarker(newOriginMarker);
        setOriginCoords(coords);
      } else if (!destinationCoords) {
        if (destinationMarker) {
          destinationMarker.setMap(null);
        }
        const newDestinationMarker = new kakao.maps.Marker({
          position: coords,
        });
        newDestinationMarker.setMap(map);
        setDestinationMarker(newDestinationMarker);
        setDestinationCoords(coords);
      }
    },
    [map, originCoords, destinationCoords, originMarker, destinationMarker]
  );

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(
        currentPosition.latitude,
        currentPosition.longitude
      ),
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, [currentPosition.latitude, currentPosition.longitude]);

  useEffect(() => {
    if (!map) return;

    if (!destinationCoords) {
      kakao.maps.event.addListener(map, "click", handleMapClick);
    } else {
      kakao.maps.event.removeListener(map, "click", handleMapClick);
    }

    return () => {
      kakao.maps.event.removeListener(map, "click", handleMapClick);
    };
  }, [map, handleMapClick, destinationCoords]);

  const getCarDirection = async () => {
    if (!originCoords || !destinationCoords) {
      alert("출발지와 목적지를 선택하세요.");
      return;
    }

    // 기존 경로선이 있다면 제거
    if (polyline) {
      polyline.setMap(null);
    }

    const REST_API_KEY = "da0dd0fc23a035bb681daba549304728";
    const url = "https://apis-navi.kakaomobility.com/v1/directions";
    const origin = `${originCoords.getLng()},${originCoords.getLat()}`;
    const destination = `${destinationCoords.getLng()},${destinationCoords.getLat()}`;

    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json",
    };

    const queryParams = new URLSearchParams({
      origin,
      destination,
    });

    try {
      const response = await fetch(`${url}?${queryParams}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const linePath = [];
      data.routes[0].sections[0].roads.forEach((road) => {
        road.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(
                road.vertexes[index + 1],
                road.vertexes[index]
              )
            );
          }
        });
      });

      // 경로 길이 설정
      const distance = data.routes[0].summary.distance;
      setRouteDistance(distance); // 경로 길이 업데이트

      const newPolyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#000000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      newPolyline.setMap(map);
      setPolyline(newPolyline); // 새로운 경로선을 상태로 저장
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetMarkers = useCallback(() => {
    // 마커 초기화
    if (originMarker) {
      originMarker.setMap(null);
      setOriginMarker(null);
    }
    if (destinationMarker) {
      destinationMarker.setMap(null);
      setDestinationMarker(null);
    }

    // 경로선 초기화
    if (polyline) {
      polyline.setMap(null);
      setPolyline(null);
    }

    setOriginCoords(null);
    setDestinationCoords(null);
    setRouteDistance(null); // 경로 길이 초기화
  }, [originMarker, destinationMarker, polyline]);

  return (
    <Container>
      <MapContainer id="map" />
      <InputContainer>
        <ButtonContainer>
          <StatusButton selected={!!originCoords}>
            {originCoords ? "출발지 설정됨" : "출발지 미설정"}
          </StatusButton>
          <StatusButton selected={!!destinationCoords}>
            {destinationCoords ? "목적지 설정됨" : "목적지 미설정"}
          </StatusButton>
        </ButtonContainer>

        <ButtonContainer>
          <button onClick={getCarDirection}>경로 구하기</button>
          <button onClick={resetMarkers}>초기화</button>
        </ButtonContainer>

        {/* 타이머 UI */}
        <ButtonContainer>
          {!isRunning ? (
            <button onClick={startTimer}>
              {time === 0 ? "Start!" : "다시 시작"}
            </button>
          ) : (
            <button onClick={pauseTimer}>일시 정지</button>
          )}
          <button onClick={stopTimer}>산책 종료</button>
        </ButtonContainer>
        <TimerDisplay>{formatTime(time)}</TimerDisplay>

        {routeDistance && <p>경로 길이: {routeDistance} 미터</p>}
        <br />
        <br />
        <br />
        <br />
      </InputContainer>
    </Container>
  );
};

export default WalkingMap;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 375px) {
    width: 375px;
  }
  @media (max-width: 500px) {
    width: 100vw;
  }
`;

const InputContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.selected ? "#4CAF50" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TimerDisplay = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;
