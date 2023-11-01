import styled from 'styled-components';

export const TitleContainer = styled.div`
  font-size: 24px;
  color: white;
  margin: 20px 0;
`;
export const GalleryTitle = styled.h1`
  font-size: 24px;
  color: #3f51b5;
  margin-right: 20px;
  margin-left: auto;
  display: inline-block;
`;

export const ContentContainer = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    315deg,
    rgb(255, 159, 14),
    rgb(228, 64, 187),
    rgb(101, 90, 220),
    rgb(72, 140, 251),
    rgb(72, 140, 251),
    rgb(41, 219, 188),
    rgb(221, 245, 5)
  );
`;
// ==================================================================
export const LoaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
// =======================================================

export const LoginForm = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  height: 100%;
  margin: auto;
  width: fit-content;
  background-color: yellow;
  background: linear-gradient(315deg, rgb(255, 0, 88), rgb(3, 169, 244));
`;

export const InputField = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 400px;
  display: flex;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

export const LoginButton = styled.button`
  display: inline-block;
  margin-right: 20px;
  padding: 8px 16px;
  font-size: 1.2rem;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  border: none;

  transition: all 0.3s ease;
  &:hover {
    background-color: #3f51b5;
    box-shadow: 0 0 10px 2px #3f51b5;
  }
`;
