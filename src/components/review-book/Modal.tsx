import React from "react";

import Button from "@/components/core/Button";
import Modal from "@/components/core/Modal";


type Props = {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  outsideCloseable?: boolean;
  closeText?: string;
};

const ModalWarning: React.FC<Props> = ({
  isOpen = false,
  onClose,
  title,
  description,
  outsideCloseable = true,
  closeText = "Close",
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      outsideCloseable={outsideCloseable}
      className="!p-10"
      size="small"
    >
      <header className="space-y-3 text-center">
        <div className="text-center">
          <span className="inline-block">
          </span>
        </div>
        <h5 className="text-center text-2xl font-bold text-primary-3">{title}</h5>
      </header>
      <main className="space-y-2 space-x-5 py-2 pb-6">
        {description && (
          <p
            className="text-center text-lg font-normal"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        )}
      </main>
      <footer className="flex justify-between gap-2">
        <Button full size="m" onClick={onClose}>
          {closeText}
        </Button>
      </footer>
    </Modal>
  );
};

export default ModalWarning;
