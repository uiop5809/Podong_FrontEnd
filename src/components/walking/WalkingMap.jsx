import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const WalkingMap = () => {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);

    const handleMapClick = (mouseEvent) => {
      const coords = mouseEvent.latLng;

      // 출발지 설정
      if (!originCoords) {
        const newOriginMarker = new kakao.maps.Marker({
          map: kakaoMap,
          position: coords,
        });
        newOriginMarker.setMap(kakaoMap);
        setOriginMarker(newOriginMarker);
        setOriginCoords(coords);
      }
      // 목적지 설정
      else if (!destinationCoords) {
        const newDestinationMarker = new kakao.maps.Marker({
          map: kakaoMap,
          position: coords,
        });
        newDestinationMarker.setMap(kakaoMap);
        setDestinationMarker(newDestinationMarker);
        setDestinationCoords(coords);

        // 출발지와 목적지가 모두 설정된 경우 클릭 이벤트 제거
        kakao.maps.event.removeListener(kakaoMap, "click", handleMapClick);
      }
    };

    kakao.maps.event.addListener(kakaoMap, "click", handleMapClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      kakao.maps.event.removeListener(kakaoMap, "click", handleMapClick);
    };
  }, [latitude, longitude, originCoords, destinationCoords]);

  const getCarDirection = async () => {
    if (!originCoords || !destinationCoords) {
      alert("출발지와 목적지를 선택하세요.");
      return;
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

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#000000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      polyline.setMap(map);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetMarkers = () => {
    if (originMarker) {
      originMarker.setMap(null);
      setOriginMarker(null);
    }
    if (destinationMarker) {
      destinationMarker.setMap(null);
      setDestinationMarker(null);
    }
    setOriginCoords(null);
    setDestinationCoords(null);

    // 지도 클릭 이벤트 다시 등록
    if (map) {
      const handleMapClick = (mouseEvent) => {
        const coords = mouseEvent.latLng;

        if (!originCoords) {
          const newOriginMarker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          newOriginMarker.setMap(map);
          setOriginMarker(newOriginMarker);
          setOriginCoords(coords);
        } else if (!destinationCoords) {
          const newDestinationMarker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          newDestinationMarker.setMap(map);
          setDestinationMarker(newDestinationMarker);
          setDestinationCoords(coords);

          kakao.maps.event.removeListener(map, "click", handleMapClick);
        }
      };

      kakao.maps.event.addListener(map, "click", handleMapClick);
    }
  };

  return (
    <Container>
      <MapContainer id="map" />
      <InputContainer>
        <StatusButton selected={!!originCoords}>
          {originCoords ? "출발지 설정됨" : "출발지 미설정"}
        </StatusButton>
        <StatusButton selected={!!destinationCoords}>
          {destinationCoords ? "목적지 설정됨" : "목적지 미설정"}
        </StatusButton>
        <button onClick={getCarDirection}>경로 구하기</button>
        <button onClick={resetMarkers}>마커 초기화</button>
        <br />
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
