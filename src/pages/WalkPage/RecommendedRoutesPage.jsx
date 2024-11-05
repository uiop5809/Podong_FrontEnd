import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RecommendRoutes } from "../../data/recommendRoutes";
import axios from "../../apis/AxiosInstance";

const { kakao } = window;

const RouteMap = ({ routeData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(routeData.center.lat, routeData.center.lng),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const getCarDirection = async () => {
      const REST_API_KEY = import.meta.env.VITE_MOBILITY_REST_API_KEY;
      const url = "https://apis-navi.kakaomobility.com/v1/directions";
      const origin = `${routeData.start.lng},${routeData.start.lat}`;
      const destination = `${routeData.end.lng},${routeData.end.lat}`;

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

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });

        polyline.setMap(map);

        const startMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            routeData.start.lat,
            routeData.start.lng
          ),
        });
        const endMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(routeData.end.lat, routeData.end.lng),
        });

        startMarker.setMap(map);
        endMarker.setMap(map);

        // 지도 범위를 경로에 맞게 조정
        const bounds = new kakao.maps.LatLngBounds();
        linePath.forEach((point) => bounds.extend(point));
        map.setBounds(bounds);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCarDirection();
  }, [routeData]);

  return <MapContainer ref={mapRef} />;
};

const RecommendedRoutesPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("환타 왕자");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }
      try {
        const response = await axios.post(`/users/${userId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container>
      <Title>
        <span>{name} 님!</span>
        <p>발바닥천국이 산책 경로를 추천해드려요</p>
      </Title>
      <RouteList>
        {RecommendRoutes.map((route) => (
          <RouteItem key={route.id}>
            <h3>{route.name}</h3>
            <p>거리: {route.distance}</p>
            <p>예상 시간: {route.time}</p>
            <RouteMap routeData={route.routeData} />
          </RouteItem>
        ))}
      </RouteList>
    </Container>
  );
};

export default RecommendedRoutesPage;

const Container = styled.div`
  margin-top: 64px;
  padding: 0 20px 100px 20px;
`;

const Title = styled.div`
  span {
    font-size: 20px;
    color: #ff6e00;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;

  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  font-weight: 800;
`;

const RouteList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const RouteItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
`;
