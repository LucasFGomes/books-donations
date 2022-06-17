import styled from 'styled-components/native'


export const Container = styled.View`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    background: #eeeeee;
    padding-top:10px;
`
export const ContainerSearch = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-width:1px;
    border-radius: 12px;
    width: 90%;
    height:8%;
    border-color:#fff
`
export const Search_text = styled.TextInput`
    font-Size:20px;
    width: 82%;
    height:80%;
    border-radius: 10px;
    align-items: center;
    margin-right: 8px;
    margin-left: 8px;
`

export const ContainerBody = styled.View`
    background-color: red;
    height: 100px;
    width: 100px;
`
export const ContainerList = styled.ScrollView`
    height: 100%;
    margin-top: 10px;
`;
