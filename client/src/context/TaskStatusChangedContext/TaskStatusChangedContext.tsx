import React, {
  createContext,
  useState,
  PropsWithChildren,
  ReactElement,
} from 'react';

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});

export function TaskStatusChangedContextProvider(
  props: PropsWithChildren,
): ReactElement {
  const [updated, setUpdated] = useState<boolean>(false);
  function toggleHandler() {
    setUpdated((prev) => !prev);
  }
  return (
    <TaskStatusChangedContext.Provider
      value={{
        updated: updated,
        toggle: toggleHandler,
      }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
}
