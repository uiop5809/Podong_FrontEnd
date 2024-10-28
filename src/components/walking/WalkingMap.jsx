import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const WalkingMap = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
  }, []);

  return (
    <>
      <MapContainer id="map" />
    </>
  );
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
