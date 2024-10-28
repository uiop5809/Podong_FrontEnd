import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const WalkingMap = () => {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  useEffect(() => {
    // Geolocation API로 사용자 위치 가져오기
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

          // 카카오 지도 생성
          new kakao.maps.Map(mapContainer, mapOptions);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          // 위치 정보 가져오기 실패 시 기본 좌표 사용
          const mapContainer = document.getElementById("map");
          const mapOptions = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          new kakao.maps.Map(mapContainer, mapOptions);
        }
      );
    } else {
      alert("위치는 이 브라우저에서 지원되지 않습니다.");
    }
  }, [latitude, longitude]);

  return <MapContainer id="map" />;
};

export default WalkingMap;

const MapContainer = styled.div`
  @media (min-width: 375px) {
    width: 375px;
  }
  @media (max-width: 500px) {
    width: 100vw;
  }
  height: 400px;
`;
