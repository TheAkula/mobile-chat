import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Plus, Input, Send } from "src/components";
import { useState } from "react";
import { AppTheme } from "src/theme";
import { useSendMessageMutation } from "src/generated/graphql";

interface Props {
  chatId: string;
}

export const ChatInput = ({ chatId }: Props) => {
  const [message, setMessage] = useState("");
  const [sendMessage, { loading }] = useSendMessageMutation();

  const handleSend = async () => {
    if (message && !loading) {
      try {
        await sendMessage({
          variables: {
            content: message,
            chatId,
          },
        });
      } finally {
        setMessage("");
      }
    }
  };

  return (
    <InputContainer>
      <TouchableOpacity>
        <AddContainer>
          <Plus />
        </AddContainer>
      </TouchableOpacity>
      <StyledInput
        value={message}
        onChangeText={(value: string) => setMessage(value)}
        placeholder="Message"
        placeholderTextColor={AppTheme.colors.white[2]}
      />
      <TouchableOpacity onPress={handleSend}>
        <SendContainer>
          <Send color={loading ? AppTheme.colors.blue[1] : undefined} />
        </SendContainer>
      </TouchableOpacity>
    </InputContainer>
  );
};

const InputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[7]};
  padding: 10px 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const AddContainer = styled.View`
  margin-right: 12px;
`;

const SendContainer = styled.View`
  margin-left: 12px;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;
