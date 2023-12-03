import includes from "lodash.includes";
import indexOf from "lodash.indexof";
import map from "lodash.map";
import React, { createContext, useCallback, useState } from "react";
import type { TKey } from "../type";
import useContext from "../useContext";
import { forgottonProviderMessage } from "../utils";
import type {
  IErrorData,
  IErrorHandler,
  IErrorHandlerProvider,
  IErrorItem,
  TErrorRender,
} from "./type";

const ErrorHandler = createContext<null | IErrorHandler>(null);
export const useErrorHandler = () =>
  useContext(
    ErrorHandler,
    forgottonProviderMessage("ErrorHandler", "react-tools")
  );

export default function ErrorHandlerProvider({
  children,
  RenderOverlayErrorWrapper,
}: IErrorHandlerProvider) {
  const [errorItems, setErrorItems] = useState<IErrorItem[]>([]);
  const [ErrorRender, setErrorRender] = useState<TErrorRender>();
  let create = useCallback(
    (error: IErrorItem) => {
      let ids = map(errorItems, ({ id }) => id);
      if (!includes(ids, error.id)) setErrorItems((e) => [...e, error]);
    },
    [errorItems]
  );
  let read = useCallback(
    (id: TKey) => {
      let ids = map(errorItems, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        return errorItems[index];
      }
      return undefined;
    },
    [errorItems]
  );
  let update = useCallback(
    (id: TKey, newError: Partial<Omit<IErrorItem, "id">>) => {
      let copy = [...errorItems];
      let ids = map(copy, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        copy[index] = { ...copy[index], ...newError, id };
        setErrorItems(copy);
      }
    },
    [errorItems]
  );
  let remove = useCallback(
    (id: TKey) => {
      let copy = [...errorItems];
      let ids = map(copy, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        copy.splice(index, 1);
        setErrorItems(copy);
      }
    },
    [errorItems]
  );
  let show = useCallback(
    (id: TKey, data?: IErrorData) => {
      let copy = [...errorItems];
      let ids = map(copy, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        copy[index]!.props = data;
        copy[index]!.isVisible = true;
        setErrorItems(copy);
      }
    },
    [errorItems]
  );
  let hide = useCallback(
    (id: TKey) => {
      let copy = [...errorItems];
      let ids = map(copy, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        copy[index]!.isVisible = false;
        setErrorItems(copy);
      }
    },
    [errorItems]
  );
  return (
    <ErrorHandler.Provider
      {...{
        value: {
          updateDefaultErrorRender: setErrorRender,
          create,
          read,
          update,
          delete: remove,
          show,
          hide,
        },
      }}
    >
      {children}
      <RenderOverlayErrorWrapper {...{ ErrorRender, errorItems }} />
    </ErrorHandler.Provider>
  );
}
