import styled from 'styled-components';

export const ScrollableContainer = styled.div`
max-height: 100%;
margin: 64px 0;
width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserInfo = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 5%;
  text-align: left;
`;

export const EditButton = styled.button`

color: #ff6e00;
border: none;
border-radius: 20px;
cursor: pointer;
font-size:11px;
font-weight: bold;
margin-top: 3px;
margin-left: 5%;
transition: background-color 0.3s;

&:hover {
  color: #e65c00;
}
`;
