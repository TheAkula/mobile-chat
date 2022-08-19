import { TextInput, TextInputProps } from "react-native";
import { Input } from "src/components/input";
import { Search } from "src/components/icons";
import styled from "styled-components/native";
import { useRef } from "react";

export const SearchInput = ({
  placeholder = "Search",
  ...rest
}: TextInputProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.isFocused()
      ? inputRef.current.blur()
      : inputRef.current?.focus();
  };

  return (
    <SearchContainer>
      <IconContainer onPress={handlePress}>
        <SearchIconContainer>
          <Search />
        </SearchIconContainer>
      </IconContainer>
      <StyledInput ref={inputRef} {...rest} placeholder={placeholder} />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-left: 40px;
`;

const SearchIconContainer = styled.View`
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 100;
`;

const IconContainer = styled.TouchableWithoutFeedback``;
