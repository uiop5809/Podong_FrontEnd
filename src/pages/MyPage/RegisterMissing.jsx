import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../../apis/AxiosInstance';
const ScrollableContainer = styled.div`
  max-height: 100%;
  border: 1px solid #ddd;
  margin: 64px 0;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
`;
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
`;
const SubTitle = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  flex-grow: 1;
  margin-top: 5px;
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 10px 20px 10px 10px;
  border: 1px solid #E4E4E4;
  border-radius: 5px;
  font-size: 11px;
  margin-bottom: 10px;
`;
const AddressContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 10px;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const EditButton = styled.button`
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-50%);
  background-color: #FFEFEF;
  color: #FF6E00;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  width: 61px;
  height: 22px;
  padding: 5px 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #FFD3D3;
  }
`;
const ImageContainer = styled.div`
  width: 125px;
  height: 125px;
  border: 1px solid #E4E4E4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: #F8F8F8;
`;
const PlaceholderText = styled.span`
  color: #888;
  font-size: 12px;
  text-align: center;
`;
const PreviewImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #E4E4E4;
  border-radius: 5px;
  font-size: 11px;
  resize: none;
  height: 100px;
`;
const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #E4E4E4;
  width: 100%;
  height: 43px;
  text-align: center;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 70px;
  &:hover {
    background-color: #FF6E00;
    color: white;
  }
`;
const RegisterMissing = () => {
  const navigate = useNavigate();
  const { userId, petId } = useParams();
  const [petName, setPetName] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.978);
  const [previewImage, setPreviewImage] = useState(null);
  const [walkrouteId, setWalkrouteId] = useState(null); // walkrouteId 상태 추가
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const fetchWalkRouteId = async () => {
      try {
        const response = await axios.get(`/walkRoutes/user/${userId}`); // 사용자 ID에 따른 walkroute 조회
        if (response.status === 200) {
          const walkRoutes = response.data;
          if (walkRoutes.length > 0) {
            setWalkrouteId(walkRoutes[0].walkrouteId); // 첫 번째 walkroute의 ID 설정
          }
        }
      } catch (error) {
        console.error('Error fetching walk routes:', error);
      }
    };
    fetchWalkRouteId();
  }, [userId]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('petId', petId);
    formData.append('userId', userId);
    formData.append('walkroute', walkrouteId); // 가져온 walkrouteId 사용
    formData.append('location', locationInput);
    formData.append('alarmName', '고창준');
    formData.append('missingDate', `${date}T00:00:00+09:00`);
    formData.append('alertradiuskm', 1);
    formData.append('petName', petName);
    formData.append('missingstatus', 1);
    formData.append('formDetail', latitude);
    formData.append('date', date);
    formData.append('address', address);
    formData.append('contactNumber', phone);
    formData.append('missingDetails', description);
    formData.append('createdAt', new Date().toISOString());
    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput.files[0]) {
      formData.append('imageUrl', imageInput.files[0]);
    }
    try {
      const response = await axios.post('/missings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        if (userId) {
          alert('실종등록이 완료되었습니다.');
          navigate(`/myPage/${userId}/missingSave`);
        } else {
          console.error('User ID not found in local storage');
          alert('사용자 ID를 받아오는데 실패했습니다.');
        }
      } else {
        alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error registering pet:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
    const newMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
    });
    newMarker.setMap(newMap);
    setMarker(newMarker);
    const geocoder = new window.kakao.maps.services.Geocoder();
    const searchAddrFromCoords = (coords, callback) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    };
    window.kakao.maps.event.addListener(newMap, 'click', (mouseEvent) => {
      const clickedPosition = mouseEvent.latLng;
      newMarker.setPosition(clickedPosition);
      setLatitude(clickedPosition.getLat());
      setLongitude(clickedPosition.getLng());
      searchAddrFromCoords(clickedPosition, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
          setLocationInput(`주소: ${addr}`);
        }
      });
    });
    // 초기 위치의 주소 가져오기
    searchAddrFromCoords(new window.kakao.maps.LatLng(latitude, longitude), function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const addr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
        setLocationInput(`${addr}`);
      }
    });
  }, [latitude, longitude]);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(latitude, longitude);
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
            setLocationInput(`주소: ${addr}`);
          }
        });
      }, (error) => {
        console.error("위치 정보에 접근할 수 없습니다.", error);
        alert("위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해 주세요.");
      });
    } else {
      alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };
  const handleDateChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (value.length > 4) {
      formattedValue += value.substring(0, 4);
      formattedValue += '-';
      if (value.length > 6) {
        formattedValue += value.substring(4, 6);
        formattedValue += '-';
        formattedValue += value.substring(6, 8);
      } else if (value.length > 4) {
        formattedValue += value.substring(4, 6);
      }
    } else {
      formattedValue += value;
    }
    setDate(formattedValue);
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += value.substring(0, 3);
    }
    if (value.length > 3) {
      formattedValue += '-' + value.substring(3, 7);
    }
    if (value.length > 7) {
      formattedValue += '-' + value.substring(7,11);
    }
    setPhone(formattedValue);
  };
  return (
    <ScrollableContainer>
      <Container>
        <MapContainer id="map"></MapContainer>
        <LocationContainer>
          <SubTitle>위치 정보</SubTitle>
          <InputContainer>
            <StyledInput value={locationInput} readOnly />
            <EditButton onClick={getCurrentLocation}>위치 확인</EditButton>
          </InputContainer>
          <SubTitle>실종 날짜</SubTitle>
          <DateContainer>
            <StyledInput type="date" placeholder="YYYY-MM-DD" value={date} onChange={handleDateChange} max={today} />
          </DateContainer>
          <AddressContainer>
            <SubTitle>핸드폰 번호</SubTitle>
            <StyledInput placeholder="연락처를 입력해주세요" value={phone} onChange={handlePhoneChange} />
          </AddressContainer>
          <SubTitle>아이 사진</SubTitle>
          <input
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="imageUpload"
          />
          <ImageContainer onClick={() => document.getElementById('imageUpload').click()}>
            {previewImage ? (
              <PreviewImage src={previewImage} alt="미리보기" />
            ) : (
              <PlaceholderText>사진 등록</PlaceholderText>
            )}
          </ImageContainer>
          <SubTitle>상세정보</SubTitle>
          <StyledTextarea value={description} placeholder="최대한 자세하게 작성해주세요" onChange={(e) => setDescription(e.target.value)} />
          <RegisterButton onClick={handleSubmit}>등록하기</RegisterButton>
        </LocationContainer>
      </Container>
    </ScrollableContainer>
  );
};
export default RegisterMissing;