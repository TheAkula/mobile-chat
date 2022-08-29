import { createEvent } from "effector";
import { useUnit } from "effector-react";
import { Message } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const setCurrentChat = createEvent<string>();
export const receiveMessage = createEvent<DeepPartial<Message>>();

export const useSetCurrentChat = () => useUnit(setCurrentChat);
