import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const WalkingMap = () => {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [selectingOrigin, setSelectingOrigin] = useState(false);
  const [selectingDestination, setSelectingDestination] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          const mapContainer = document.getElementById("map");
          const mapOptions = {
            center: new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 3,
          };

          const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
          setMap(kakaoMap);

          kakao.maps.event.addListener(kakaoMap, "click", (mouseEvent) => {
            const coords = mouseEvent.latLng;

            // 출발지 선택 중이 아니라면 출발지 마커 생성
            if (!selectingOrigin) {
              console.log("origin");
              const newOriginMarker = new kakao.maps.Marker({
                map: kakaoMap,
                position: coords,
                image: new kakao.maps.MarkerImage(
                  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                  new kakao.maps.Size(24, 35)
                ),
              });
              setOriginMarker(newOriginMarker);
              setSelectingOrigin(true);
            }
            // 출발지 선택 중이라면 목적지 마커 생성
            else {
              console.log("destination");
              const newDestinationMarker = new kakao.maps.Marker({
                map: kakaoMap,
                position: coords,
                image: new kakao.maps.MarkerImage(
                  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                  new kakao.maps.Size(24, 35)
                ),
              });
              setDestinationMarker(newDestinationMarker);
              setSelectingDestination(true);
            }
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
          const mapContainer = document.getElementById("map");
          const mapOptions = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
          setMap(kakaoMap);
        }
      );
    } else {
      alert("위치는 이 브라우저에서 지원되지 않습니다.");
    }
  }, [latitude, longitude]);

  // 마커 초기화 함수
  const resetMarkers = () => {
    if (originMarker) originMarker.setMap(null);
    if (destinationMarker) destinationMarker.setMap(null);
    setOriginMarker(null);
    setDestinationMarker(null);
    setSelectingOrigin(false);
    setSelectingDestination(false);
  };

  return (
    <Container>
      <MapContainer id="map" />
      <InputContainer>
        <p>
          지도를 클릭하여{" "}
          <strong>{selectingOrigin ? "목적지" : "출발지"}</strong>를 선택하세요.
        </p>
        <button onClick={resetMarkers}>마커 초기화</button>
      </InputContainer>
      <br />
      <br />
      <br />
      <br />
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

  p {
    font-size: 1rem;
    text-align: center;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #ff6e00;
    color: white;
    border: none;
    border-radius: 5px;
  }
`;

const MapContainer = styled.div`
  @media (min-width: 375px) {
    width: 375px;
  }
  @media (max-width: 500px) {
    width: 100vw;
  }
  height: 300px;
`;
