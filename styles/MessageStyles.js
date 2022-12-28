import styled from 'styled-components';

export const Container = styled.view`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.view`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.view`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.view`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.view`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.text`
  font-size: 14px;
  color: #333333;
`;