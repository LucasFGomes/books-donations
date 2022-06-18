import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  ContainerLeft,
  ContainerRight,
  ContainerRightUpside,
  ContainerRightDownside,
  Title,
  Autor,
  Points,
  Description,
} from "./style";
import user from "../../../../assets/user.png";

const Card = (props) => {
  const {
    id,
    title,
    author,
    nameDonor,
    donorId,
    points,
    description,
    rate,
    profilePicture,
    bookPicture,
    handleClickCard,
  } = props;

    return (
        <TouchableOpacity onPress={() => handleClickCard(id, nameDonor, donorId, points)}>
            <Container>
                <ContainerLeft>
                    <Image
                        style={{ display: 'flex', flex: 1, height: 50, width: 100 }}
                        source={{uri: profilePicture}}
                    />
                </ContainerLeft>
                <ContainerRight>
                    <ContainerRightUpside>
                        <View style={{ backgroundColor: '' }}>
                            <Title>{title && title.length <= 40 ? title : `${title.substring(0, 40)}...`}</Title>
                        </View>

                        <View style={{ backgroundColor: '' }}>
                            <Autor>{author}</Autor>
                        </View>

                        <View style={{ backgroundColor: '', justifyContent: 'center', flexDirection: 'row', alignSelf: 'flex-start',}}>
                            <Icon
                                name="loyalty"
                                size={18}
                                color="#000"
                                style={{ marginRight: 5 }}
                            /> 
                            <Points> {points} </Points>
                        </View>
                    </ContainerRightUpside>

                    <ContainerRightDownside>
                        <View style={{ backgroundColor: '' }}>
                            <Description numberOfLines={4}>{description}</Description>
                        </View>
                    </ContainerRightDownside>
                </ContainerRight>
            </Container>
        </TouchableOpacity>
    );
};

export default Card;
