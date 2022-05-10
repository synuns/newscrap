import { useMemo, useState } from "react";
import { ModalsStateContext, ModalsDispatchContext } from "./ModalsContext";

const ModalsProvider = ({ children }) => {
  const [opendedModals, setOpenedModals] = useState([]);

  const open = (Component, props) => {
    setOpenedModals((modals) => {
      return [...modals, { Component, props }];
    });
    console.log(opendedModals);
  };

  const close = (Component) => {
    setOpenedModals((modals) => {
      return modals.filter(modal => modal.Component !== Component);
    });
    console.log(opendedModals);
  };

  const dispatch = useMemo(() => (
    {open, close}
  ), []);

  return (
    <ModalsStateContext.Provider value={opendedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;