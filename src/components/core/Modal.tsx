/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import React, { Fragment, ReactNode, useEffect } from "react";


type Props = {
  open?: boolean;
  onClose?: () => void;
  /**
   * - xsmall : 320px
   * - small  : 400px
   * - medium : 640px
   * - large  : 800px
   * - xlarge : 1140px
   *
   * @default medium
   */
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  children: ReactNode;
  /**
   * Class name to apply to the modal dialog.
   */
  className?: string;
  /**
   * Show close button on top right
   */
  closeButton?: boolean;
  /**
   * if `false` when click outside, the modal will not closed
   *
   * @default true
   */
  outsideCloseable?: boolean;
};

const modalSize = {
  xsmall: "max-w-[320px]",
  small: "max-w-[400px]",
  medium: "max-w-[640px]",
  large: "max-w-[800px]",
  xlarge: "max-w-[1140px]",
};

const Modal: React.FC<Props> = ({
  open = false,
  onClose = () => null,
  size = "medium",
  children,
  className,
  closeButton = false,
  outsideCloseable = true,
}) => {
  const width = modalSize[size];
  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("padding-right");
    }
  }, [open]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[70]"
        onClose={() => {
          outsideCloseable && onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-end justify-center  p-4 sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  "relative w-full transform rounded-xl bg-white p-5 shadow-lg transition-all",
                  width,
                  className
                )}
              >
                {closeButton && (
                  <button
                    onClick={onClose}
                    className="block-inline absolute top-4 right-4 aspect-square rounded-full p-[2px] outline-none"
                    tabIndex={-1}
                  >
                    <p>close</p>
                  </button>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
