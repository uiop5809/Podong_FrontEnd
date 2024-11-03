import WalkingHeader from "../../components/walking/WalkingHeader.jsx";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

function WalkPage() {
  return (
    <Container>
      <WalkingHeader />
      <Outlet />
    </Container>
  );
}

export default WalkPage;

const Container = styled.div`
  margin-top: 64px;
`;
