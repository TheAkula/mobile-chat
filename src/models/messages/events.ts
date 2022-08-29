import { createEvent } from "effector";
import { Message } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const addMessage = createEvent<DeepPartial<Message>>();
export const pushMessage = createEvent<DeepPartial<Message>>();
export const updateMessage = createEvent<DeepPartial<Message>>();
