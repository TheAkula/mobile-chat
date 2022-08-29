import { createStackNavigator } from "@react-navigation/stack";
import { MoreParamsList, MoreRoute } from "src/navigation/types";
import { Account } from "./account";

const MoreStack = createStackNavigator<MoreParamsList>();

export const More = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name={MoreRoute.Account} component={Account} />
    </MoreStack.Navigator>
  );
};
