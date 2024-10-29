import WalkingMap from "../../components/walking/WalkingMap.jsx";
import WalkingHeader from "../../components/walking/WalkingHeader.jsx";
import styled from "styled-components";

function WalkPage() {
  return (
    <Container>
      <WalkingHeader />
      <WalkingMap />
    </Container>
  );
}

export default WalkPage;

const Container = styled.div`
  margin-top: 64px;
`;
