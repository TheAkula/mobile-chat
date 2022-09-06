import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { Avatar, Container, Btn } from "src/components";
import {
  setCurrentChat,
  useAddMyContact,
  useContactStore,
  useCreatePersonalChat,
  useFetchContactInfo,
  useRemoveContact,
} from "src/models";
import { ContactsList } from "src/components/contacts";
import {
  ChatRoute,
  ContactsParamList,
  ContactsRoute,
  MainParamList,
  MainRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import styled from "styled-components/native";
import { User } from "src/generated/graphql";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = CompositeScreenProps<
  StackScreenProps<ContactsParamList, ContactsRoute.Profile>,
  CompositeScreenProps<
    BottomTabScreenProps<MainParamList, MainRoute.Contacts>,
    StackScreenProps<RootParamList, RootRoute.Main>
  >
>;

export const Profile = ({ route, navigation }: Props) => {
  const { userId } = route.params;
  const { push } = navigation;
  const { contact, contactLoading } = useContactStore();
  const fetchContactInfo = useFetchContactInfo();
  const addContact = useAddMyContact();
  const removeContact = useRemoveContact();
  const createPersonalChat = useCreatePersonalChat();

  useEffect(() => {
    fetchContactInfo({
      id: userId,
    });
  }, []);

  const addPressed = () => {
    addContact({
      friendId: userId,
    });
  };

  const removePressed = () => {
    removeContact({
      id: userId,
    });
  };

  const sendPressed = async () => {
    const res = await createPersonalChat({
      id: userId,
    });

    setCurrentChat(res.data?.createPersonalChat.id || "");

    push(RootRoute.Chat, {
      screen: ChatRoute.Messages,
      params: {
        chatId: res.data?.createPersonalChat.id || "",
        name:
          res.data?.createPersonalChat.friend?.firstName +
          " " +
          res.data?.createPersonalChat.friend?.lastName,
      },
    });
  };

  const isAdd = (item: Partial<User>) => {
    return !item.isFriend;
  };

  const isRemove = (item: Partial<User>) => {
    return !!item.isFriend;
  };

  if (!contact || contactLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container>
      <InfoContainer>
        <ImageContainer>
          {contact.avatar ? (
            <Image source={{ uri: contact.avatar, width: 100, height: 100 }} />
          ) : (
            <Avatar width={56} height={56} />
          )}
        </ImageContainer>
        <Info>
          <Name>{`${contact.firstName} ${contact.lastName}`}</Name>

          <StyledText>
            {contact.isActive ? "Online" : `Last seen ${contact.lastSeen}`}
          </StyledText>
        </Info>
      </InfoContainer>
      <BtnsContainer>
        <StyledBtnContainer>
          <Btn pressed={sendPressed}>
            <StyledText>Send</StyledText>
          </Btn>
        </StyledBtnContainer>
        <BtnContainer>
          {contact.isFriend ? (
            <Btn pressed={removePressed}>
              <StyledText>Remove</StyledText>
            </Btn>
          ) : (
            <Btn pressed={addPressed}>
              <StyledText>Add</StyledText>
            </Btn>
          )}
        </BtnContainer>
      </BtnsContainer>
      <Header>Friends</Header>
      <ContactsList
        contacts={contact.friends || []}
        isAdd={isAdd}
        isRemove={isRemove}
        add={addPressed}
        remove={removePressed}
        send={sendPressed}
      />
    </Container>
  );
};

const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.blue[6]};
  border-radius: 50px;
  overflow: hidden;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const Info = styled.View`
  justify-content: center;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

const BtnsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BtnContainer = styled.View`
  flex: 1;
`;

const Header = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};
  margin-top: 40px;
`;

const StyledBtnContainer = styled(BtnContainer)`
  margin-right: 16px;
`;
