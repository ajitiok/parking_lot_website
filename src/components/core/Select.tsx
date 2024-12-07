/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import cx from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

export type SelectItem = {
  id: string | number;
  name: string;
};

type SelectProps = {
  value?: string | number | SelectItem;
  data: SelectItem[];
  className?: string;
  placeholder?: string;
  onChange?: (value: SelectItem) => void;
  /**
   * position of dropdown
   *
   * @default bottom
   */
  position?: "top" | "bottom";
};

const Select: React.FC<SelectProps> = ({
  value,
  data,
  className,
  onChange = () => null,
  position = "bottom",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectItem>();

  const handleOnChange = (e: SelectItem) => {
    setSelected(e);
    onChange(e);

    setOpen(false);
  };

  const refOutsideClick = useOnclickOutside(
    (e) => {
      if (inputRef.current?.contains(e.target as Node)) return;

      inputRef.current?.blur();
      setOpen(false);
    },
    {
      disabled: !open,
    }
  );

  const handleButtonClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof value === "object") {
      const newValue = data.find((item) => item.id === value?.id);
      setSelected(newValue);
    } else {
      const index = data.findIndex((item) => item.id == value);

      if (index > -1) {
        setSelected(data[index]);
      }
    }
  }, [data, value]);

  return (
    <div ref={refOutsideClick} className="relative">
      <Listbox value={selected} onChange={handleOnChange}>
        <button
          className={cx(
            "relative p-3 pr-12 rounded-md border w-full h-full text-left outline-none bg-white",
            "transition-colors duration-150",
            {
              "border-primary-3": open,
              "border-primary-1": !open,
            },
            className
          )}
          onClick={handleButtonClick}
          type="button"
        >
          <Fragment>
            <span
              className={cx("block truncate ", {
                "text-primary-2": !selected?.name,
              })}
            >
              {selected?.name}
            </span>
          </Fragment>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
        </button>
        {open && (
          <Listbox.Options
            static
            as="div"
            className={cx(
              "bg-white rounded-md border border-primary-3 mt-2 absolute w-full z-[1] shadow-lg outline-none",
              position === "top" ? "bottom-full" : "top-full"
            )}
          >
            {data.length > 0 && (
              <Fragment>
                {data.map((item) => (
                  <Listbox.Option key={item.id} value={item} as={Fragment}>
                    {({ selected, active }) => (
                      <li
                        className={cx(
                          "list-none p-4 cursor-pointer border-b font-normal text-primary-1",
                          {
                            "bg-white": selected,
                            "bg-primary-4": active,
                          }
                        )}
                      >
                        {item.name}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Fragment>
            )}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
