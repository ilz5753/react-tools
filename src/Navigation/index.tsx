import React, { createContext, type PropsWithChildren } from "react";
import useContext from "../useContext";
import { forgottonProviderMessage } from "../utils";
import type { INavigation } from "./type";
import useNavigationStore from "./useNavigationStore";

const NavigationContext = createContext<INavigation | null>(null);
export const useNavigation = () =>
  useContext(
    NavigationContext,
    forgottonProviderMessage("Navigation", "react-tools")
  );

export default function NavigationProvider({ children }: PropsWithChildren) {
  let value = useNavigationStore({});
  return <NavigationContext.Provider {...{ value, children }} />;
}
