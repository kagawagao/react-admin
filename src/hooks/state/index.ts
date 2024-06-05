import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMountedRef from '../mounted';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useSafeState<S>(initialState?: S | (() => S)) {
  const mountedRef = useMountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback(
    (state: SetStateAction<S | undefined>) => {
      if (mountedRef.current) {
        setState(state);
      }
    },
    [mountedRef],
  );

  return [state, setCurrentState] as const;
}

export default useSafeState;
