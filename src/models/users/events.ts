import { createEvent } from "effector";
import { User } from "src/generated/graphql";

export const changeActivity = createEvent<Partial<User>>();
