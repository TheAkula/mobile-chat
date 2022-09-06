import { Message } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export type MessageToShow = DeepPartial<Message> & {
  isRead: boolean;
  isMyRead: boolean;
};

export interface ListSection {
  title: string;
  data: MessageToShow[];
  isNotRead?: boolean;
  index: number;
  notReadIndex?: number;
}
