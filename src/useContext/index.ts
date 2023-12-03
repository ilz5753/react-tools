import isNull from "lodash.isnull";
import { useContext as useReactContext, type Context } from "react";

export default function useContext<T>(
  ctx: Context<T | null>,
  noExistMessage: string
) {
  let Ctx = useReactContext(ctx);
  if (isNull(Ctx)) throw new Error(noExistMessage);
  return Ctx;
}
