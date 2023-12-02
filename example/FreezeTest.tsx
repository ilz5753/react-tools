import { useCallback, useState } from "react";
import { MakeFreeze, useFreeze } from "../src/Freeze";
import { IFreezeProps } from "../src/Freeze/type";
import { randomStringId } from "../src/utils";
import "./styles.css";
interface ITest {
  a: string;
  b: string;
  c: string;
}
const TestComponent = ({ a, b, c, freeze, unfreeze }: IFreezeProps & ITest) => {
  return (
    <div>
      <div className="fc">
        <p>{a}</p>
        <p>{b}</p>
        <p>{c}</p>
      </div>
      <div className="fc">
        <button onClick={freeze}>freezez</button>
        <button onClick={unfreeze}>unfreezez</button>
      </div>
    </div>
  );
};
let { id: TestId, FreezedComponent: FreezedTest } = MakeFreeze(TestComponent);
export default function TestFreeze() {
  let { freeze, unfreeze } = useFreeze();
  let [state, setState] = useState<ITest>({
    a: "Hello",
    b: "From",
    c: "Test",
  });
  let update = useCallback(
    () =>
      setState({
        a: randomStringId(),
        b: randomStringId(),
        c: randomStringId(),
      }),
    []
  );
  let _freeze = useCallback(() => freeze(TestId, state), [freeze, state]);
  let _unfreeze = useCallback(() => unfreeze(TestId), [unfreeze]);
  return (
    <div className="container fh">
      <FreezedTest {...state} />
      <button onClick={update}>update state</button>
      <div className="fc">
        <button onClick={_freeze}>freezez</button>
        <button onClick={_unfreeze}>unfreezez</button>
      </div>
    </div>
  );
}
