import { AuthRoute, MainRoute } from "src/navigation/types";

export const getTitle = (title: string) => {
  switch (title) {
    case AuthRoute.AuthProfile:
      return "Your Profile";
    case MainRoute.Contacts:
      return "Contacts";
    case MainRoute.Chats:
      return "Chats";
    case MainRoute.More:
      return "More";
    default:
      return "";
  }
};
