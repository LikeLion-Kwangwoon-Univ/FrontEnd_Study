import styled from "styled-components";

const NotFound = ({ width, height }) => {
  return (
    <ErrorContainer width={width} height={height}>
      Not found
    </ErrorContainer>
  );
};

export default NotFound;

const ErrorContainer = styled.div`
  width: ${(props) => (props.primary ? "blue" : "gray")};
`;
