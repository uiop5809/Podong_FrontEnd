import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PetItemListPage = () => {
  const navigate = useNavigate();


  return (
    <Div>
      <h1>목록</h1>
      <button onClick={(e)=>{navigate("/petitem")}}>등록</button>
    </Div>
  );
};

export default PetItemListPage;

const Div = styled.div`
margin-top: 64px;
`;
