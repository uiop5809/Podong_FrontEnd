import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import WalkingTimer from "../../components/walking/WalkingTimer";
import MissingPetAlert from "../../components/walking/MissingPetAlert";
import { images } from "../../components/Images";

const { kakao } = typeof window !== "undefined" ? window : {};

const sampleMissingPet = {
  name: "멍멍이",
  phone: "010-1234-5678",
  image: `${images.missingPet}`,
  description:
    "아이를 발견하시면 즉시 연락 부탁드립니다. 아이는 사람을 좋아하고, 낯선 사람에게도 친근하게 다가갈 수 있습니다.",
  radius: 300,
  location: {
    latitude: 37.53716987316825,
    longitude: 127.08617177992514,
  },
};

// 두 지점 간의 거리를 계산하는 함수 (미터 단위)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 경로와 특정 지점 사이의 최소 거리를 계산하는 함수
const calculateMinDistanceToRoute = (routePath, point) => {
  if (!routePath || routePath.length < 2) return Infinity;

  let minDistance = Infinity;

  for (let i = 0; i < routePath.length - 1; i++) {
    const start = routePath[i];
    const end = routePath[i + 1];
    const distance = calculateDistance(
      point.latitude,
      point.longitude,
      start.getLat(),
      start.getLng()
    );
    minDistance = Math.min(minDistance, distance);
  }
  return minDistance;
};

const WalkMapPage = () => {
  const [map, setMap] = useState(null);
  const [time, setTime] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [polyline, setPolyline] = useState(null); // 경로선
  const [routeDistance, setRouteDistance] = useState(null); // 경로 길이
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const [missingPet, setMissingPet] = useState(null);
  const [missingPetDistance, setMissingPetDistance] = useState(0);
  const [isMissingPetAlertOpen, setIsMissingPetAlertOpen] = useState(false);
  const [routePath, setRoutePath] = useState([]);

  const handleTimerStart = () => {
    if (!routePath.length) return;
    const minDistance = calculateMinDistanceToRoute(
      routePath,
      sampleMissingPet.location
    );

    // 실종동물이 경로 반경 300m 이내에 있을 경우에만 알림을 표시
    if (minDistance <= sampleMissingPet.radius) {
      setMissingPet(sampleMissingPet);
      setMissingPetDistance(Math.round(minDistance));
      setIsMissingPetAlertOpen(true);
    }
    setIsTimerStarted(true);
  };

  const handleMissingPetAlertClose = () => {
    setIsMissingPetAlertOpen(false);
  };

  /* 위치 관련*/
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  // 현위치로 이동
  const moveToCurrentLocation = () => {
    if (map) {
      map.setCenter(
        new kakao.maps.LatLng(
          currentPosition.latitude,
          currentPosition.longitude
        )
      );
    }
  };

  /* 지도 관련*/
  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao) {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          currentPosition.latitude,
          currentPosition.longitude
        ),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOptions);
      setMap(kakaoMap);
    }
  }, [currentPosition.latitude, currentPosition.longitude]);

  // 지도 클릭하여 출발지, 목적지 설정
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

  // 지도 클릭 이벤트 리스너 등록
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

  /* 경로 관련 */
  const getCarDirection = async () => {
    // eslint-disable-next-line no-undef
    const REST_API_KEY = import.meta.env.VITE_MOBILITY_REST_API_KEY;
    const url = "https://apis-navi.kakaomobility.com/v1/directions";
    const origin = `${originCoords.getLng()},${originCoords.getLat()}`;
    const destination = `${destinationCoords.getLng()},${destinationCoords.getLat()}`;

    const queryParams = new URLSearchParams({
      origin,
      destination,
    });
    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${url}?${queryParams}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      const linePath = [];
      data.routes[0].sections[0].roads.forEach((road) => {
        road.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            const point = new kakao.maps.LatLng(
              road.vertexes[index + 1],
              road.vertexes[index]
            );
            linePath.push(point);
          }
        });
      });
      setRoutePath(linePath);
      const distance = data.routes[0].summary.distance;
      setRouteDistance(distance);

      const newPolyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#000000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      newPolyline.setMap(map);
      setPolyline(newPolyline);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 목적지 설정 후 자동으로 경로 계산
  useEffect(() => {
    if (destinationCoords) {
      getCarDirection();
    }
  }, [destinationCoords]);

  // 마커, 경로선 초기화 함수
  const resetMarkers = useCallback(() => {
    if (originMarker) {
      originMarker.setMap(null);
      setOriginMarker(null);
    }
    if (destinationMarker) {
      destinationMarker.setMap(null);
      setDestinationMarker(null);
    }
    if (polyline) {
      polyline.setMap(null);
      setPolyline(null);
    }
    setRoutePath([]);
    setTime(0);
    setIsStarted(false);
    setIsRunning(false);
    setIsTimerStarted(false);
    setOriginCoords(null);
    setDestinationCoords(null);
    setRouteDistance(null);
  }, [originMarker, destinationMarker, polyline]);

  // 초기 시간 형식 변환 함수
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Container>
      <HeaderContainer>
        <div>
          <StatusButton selected={!!originCoords}>
            {originCoords ? "출발지 설정됨" : "출발지 미설정"}
          </StatusButton>
          <StatusButton selected={!!destinationCoords}>
            {destinationCoords ? "목적지 설정됨" : "목적지 미설정"}
          </StatusButton>
        </div>
        <div>
          <OutlineButton onClick={moveToCurrentLocation}>
            현위치로
          </OutlineButton>
          <OutlineButton onClick={resetMarkers}>초기화</OutlineButton>
        </div>
      </HeaderContainer>

      <MapContainer id="map" />

      <DetailContainer>
        <div>
          <div>산책 시간 (분:초)</div>
          {formatTime(time)}
        </div>
        <div>
          <div>산책 거리 (km)</div>
          {routeDistance ? (routeDistance / 1000).toFixed(1) + "km" : `0.0`}
        </div>
      </DetailContainer>

      <WalkingTimer
        time={time}
        setTime={setTime}
        onStart={handleTimerStart}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        originCoords={originCoords}
        destinationCoords={destinationCoords}
        routeDistance={routeDistance}
      />

      {/* 지도 표시 부분 */}
      {isTimerStarted && (
        <MissingPetAlert
          pet={missingPet}
          distance={missingPetDistance}
          isOpen={isMissingPetAlertOpen}
          onClose={handleMissingPetAlertClose}
        />
      )}
    </Container>
  );
};

export default WalkMapPage;

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

const HeaderContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-10px);

  div {
    display: flex;
    gap: 10px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 260px;
`;

const StatusButton = styled.button`
  padding: 2px 10px;
  background-color: ${(props) => (props.selected ? "#FFA764" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
`;

const DetailContainer = styled.div`
  @media (min-width: 375px) {
    width: 375px;
  }
  @media (max-width: 500px) {
    width: 100vw;
  }
  display: flex;
  justify-content: space-around;
  background-color: #ffefef;
  padding: 10px 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    gap: 5px;
  }
`;

const OutlineButton = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  color: #ff6e00;
  border: 1px solid #ff6e00;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff6e00;
    color: #ffffff;
  }
`;
