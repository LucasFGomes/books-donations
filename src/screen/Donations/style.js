import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Item = styled.View`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 7px;
  background-color: #eeeeee;
  border-radius: 7px;
  border: 0.3px solid #000;
`;
export const InfoView = styled.View`
  flex: 1;
`;

export const ViewButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TouchableOpacityCompleted = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

export const TouchableOpacityCancel = styled(TouchableOpacityCompleted)`
  background-color: red;
  margin-right: 5px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  margin-bottom: 5px;
`;
