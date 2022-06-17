import styled from 'styled-components/native';

export const Container = styled.View`
    width: 96%;
    height: 160px;
    display: flex;
    flexFlow: row nowrap;
    justifyContent: space-around;
    alignItems:center
    backgroundColor: #ffffffff;
    border: 0.7px solid #000;
    borderRadius: 10px;
    marginBottom: 15px;
`;

export const ContainerLeft = styled.View`
    width: 40%;
    height: 88%;
    justifyContent: center;
    alignItems: center;
    borderRadius: 15px;
    
`;

export const ContainerRight = styled.View`
    width: 60%;
    height: 100%;
    flexFlow: row wrap;
    alignItems: center;
    justifyContent: center;
    borderRadius: 15px;
`;

export const ContainerRightUpside = styled.View`
    width: 100%;
    height: 75%;
    flexFlow: column nowrap;
    justifyContent: space-evenly;
    borderRadius: 5px;

`;

export const ContainerRightDownside = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flexFlow: column nowrap;
    justifyContent: flex-start;
    borderRadius: 5px;

`;

export const Title = styled.Text`
    fontWeight: bold;
    fontSize: 18px
`;

export const Autor = styled.Text`
    fontSize: 10px
`;

export const Points = styled.Text`
    fontSize: 11px
`;

export const Description = styled.Text`
    fontSize:12px
    marginBottom:-90px
`;