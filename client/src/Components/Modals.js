import React, { useContext } from "react";
import loadable from '@loadable/component';
import { ModalsStateContext, ModalsDispatchContext } from "../Context/Modal/ModalsContext";

export const modals = {
  newsModal: loadable(() => import('./NewsModal')),
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;
    const onClose = () => {
      close(Component);
    };

    const handleSubmit = async () => {
      if(typeof onSubmit === 'function'){
        await onSubmit();
      }
      onClose();
    };

    return(
      <Component 
        {...restProps}
        key={index}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    );
  })
};

export default Modals;