import { Image } from "react-native";
import { Message as MessageType } from "src/generated/graphql";
import { DeepPartial } from "src/types";
import { getDateHm } from "src/utils";
import styled, { css } from "styled-components/native";
import { ifProp } from "styled-tools";
import { Avatar } from "src/components";
import { MessageToShow } from "./types";

type WithIsMine = {
  isMine?: boolean;
};

type Props = MessageToShow &
  WithIsMine & {
    isFriendsChat?: boolean;
  };

export const Message = ({
  isMine,
  content,
  author,
  createdAt,
  isFriendsChat,
  updatedAt,
  isMyRead,
}: Props) => {
  const date = createdAt === updatedAt ? createdAt : "Edited " + updatedAt;

  return (
    <Wrapper isMine={isMine}>
      {!isMine && !isFriendsChat && (
        <ImageContainer>
          {author?.avatar ? (
            <Image source={{ uri: author?.avatar }} />
          ) : (
            <Avatar width={26} height={26} />
          )}
        </ImageContainer>
      )}
      <MessageContainer isMine={isMine}>
        {!isFriendsChat && !isMine && (
          <Name>{[author?.firstName, author?.lastName || ""].join(" ")}</Name>
        )}
        <MessageText>{content}</MessageText>
        <MessageDate isMine={isMine}>
          {getDateHm(date)}
          {isMyRead && ` · Read`}
        </MessageDate>
      </MessageContainer>
    </Wrapper>
  );
};

const Wrapper = styled.View<WithIsMine>`
  flex-direction: ${ifProp("isMine", "row-reverse", "row")};
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.colors.blue[7]};
`;

const MessageContainer = styled.View<WithIsMine>`
  padding: 10px;
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({ theme }) =>
    ifProp("isMine", theme.colors.blue[2], theme.colors.blue[7])};
  ${ifProp(
    "isMine",
    css`
      border-bottom-left-radius: 16px;
    `,
    css`
      border-bottom-right-radius: 16px;
    `
  )}
  align-self: ${ifProp("isMine", "flex-end", "flex-start")};
  margin-bottom: 12px;
  max-width: 80%;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue[2]};
`;

const MessageText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
  padding-bottom: 14px;
`;

const MessageDate = styled.Text<WithIsMine>`
  color: ${({ theme }) =>
    ifProp("isMine", theme.colors.white[0], theme.colors.white[2])};
  font-size: ${({ theme }) => theme.fontSizes.superSmall};
  line-height: ${({ theme }) => theme.lineHeights.superSmall};
  position: absolute;

  bottom: 6px;

  ${ifProp(
    "isMine",
    css`
      right: 6px;
    `,
    css`
      left: 6px;
    `
  )}
`;
