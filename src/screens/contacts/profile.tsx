import { StackScreenProps } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";
import { Avatar, Container, Btn } from "src/components";
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
import {
  useAddContactMutation,
  useCreatePersonalChatMutation,
  User,
  useRemoveContactMutation,
  useUserInfoQuery,
} from "src/generated/graphql";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useCurrentChatContext } from "src/context";
import { useAddContact, useRemoveContact } from "src/hooks";

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
  const { data: contactData, loading: contactLoading } = useUserInfoQuery({
    variables: { id: userId },
  });
  const { setCurrentChat } = useCurrentChatContext();
  const [addContact] = useAddContact();
  const [removeContact] = useRemoveContact();
  const [createPersonalChat] = useCreatePersonalChatMutation();

  const addPressed = () => {
    addContact({
      variables: {
        friendId: userId,
      },
    });
  };

  const removePressed = () => {
    removeContact({
      variables: {
        id: userId,
      },
    });
  };

  const sendPressed = async () => {
    const res = await createPersonalChat({
      variables: {
        id: userId,
      },
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

  if (!contactData || contactLoading) {
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
          {contactData.user.avatar ? (
            <Image
              source={{ uri: contactData.user.avatar, width: 100, height: 100 }}
            />
          ) : (
            <Avatar width={56} height={56} />
          )}
        </ImageContainer>
        <Info>
          <Name>{`${contactData.user.firstName} ${contactData.user.lastName}`}</Name>

          <StyledText>
            {contactData.user.isActive
              ? "Online"
              : `Last seen ${contactData.user.lastSeen}`}
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
          {contactData.user.isFriend ? (
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
        contacts={contactData.user.friends || []}
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
