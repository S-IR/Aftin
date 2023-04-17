import React from "react";

import {
  changeModalText,
  changeModalType,
  ModalType,
  useModalStore,
} from "../../../zustand/ModalBoxStore/store";
import AuthErrorModal from "./AuthErrorModal";
import GenericErrorModal from "./GenericErrorModal";
import ServerErrorModal from "./ServerErrorModal";
import MissingFeatureModal from "./MissingFeatureModal";
import GenericSuccessModal from "./GenericSuccessModal";
import LoginFirstModal from "./LoginFirstModal";

export interface generalModalBoxProps {
  title?: string;
  text?: string;

  modalType: ModalType;
  changeModalType: changeModalType;
  changeModalText?: changeModalText;
}
//This component is meant to keep track of the modalStore and save all of the modal boxes together
const AllModalBoxes = () => {
  const modalStoreProps = useModalStore((state) => {
    return {
      title: state.title,
      text: state.text,
      modalType: state.modalType,
      changeModalType: state.CHANGE_MODAL_TYPE,
      changeModalText: state.CHANGE_MODAL_TEXT,
    };
  });
  if (modalStoreProps.modalType === null) return null;
  return (
    <>
      <AuthErrorModal {...modalStoreProps} />
      <GenericErrorModal {...modalStoreProps} />
      <MissingFeatureModal {...modalStoreProps} />
      <ServerErrorModal {...modalStoreProps} />
      <GenericSuccessModal {...modalStoreProps} />
      <LoginFirstModal {...modalStoreProps} />
    </>
  );
};

export default AllModalBoxes;
