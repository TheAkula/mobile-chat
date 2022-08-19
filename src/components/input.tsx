import styled from "styled-components/native";

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.white[0],
}))`
  background-color: ${({ theme }) => theme.colors.blue[5]};
  color: ${({ theme }) => theme.colors.white[0]};
  padding: 6px 8px;
  border-radius: 4px;
  width: 100%;
`;
