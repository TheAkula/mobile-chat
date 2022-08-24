import { Message as MessageType } from "src/generated/graphql";
import { DeepPartial } from "src/types";
import { getDateHm } from "src/utils";
import styled, { css } from "styled-components/native";
import { ifProp } from "styled-tools";

type WithIsMine = {
  isMine?: boolean;
};

type Props = DeepPartial<MessageType> & WithIsMine;

export const Message = ({
  isMine,
  content,
  createdAt,
  updatedAt,
  isMyRead,
}: Props) => {
  const date = createdAt === updatedAt ? createdAt : "Edited " + updatedAt;

  return (
    <MessageContainer isMine={isMine}>
      <MessageText>{content}</MessageText>
      <MessageDate isMine={isMine}>
        {getDateHm(date)}
        {isMyRead && ` · Read`}
      </MessageDate>
    </MessageContainer>
  );
};

const MessageContainer = styled.View<WithIsMine>`
  padding: 10px;
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
`;

const MessageText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
  margin-bottom: 4px;
`;

const MessageDate = styled.Text<WithIsMine>`
  color: ${({ theme }) =>
    ifProp("isMine", theme.colors.white[0], theme.colors.white[2])};
  font-size: ${({ theme }) => theme.fontSizes.superSmall};
  line-height: ${({ theme }) => theme.lineHeights.superSmall};
  align-self: ${ifProp("isMine", "flex-end", "flex-start")};
`;
