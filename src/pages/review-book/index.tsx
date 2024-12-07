import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import Select, { SelectItem } from "@/components/core/Select";
import Modal from "@/components/review-book/Modal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const durationOptions = [
  {
    id: 1,
    name: "30 Minutes",
    value: 30,
  },
  {
    id: 2,
    name: "1 hour",
    value: 60,
  },
  {
    id: 3,
    name: "2 hour",
    value: 120,
  },
];

const ReviewBookPage = () => {
  const router = useRouter();

  const { building, floor, spot } = router.query;

  const [duration, setDuration] = useState<SelectItem>(durationOptions[0]);

  const [name, setName] = useState<string>("");
  const [platNumber, setPlatNumber] = useState<string>("");

  const [showModalEmptyField, setModalEmptyField] = useState<boolean>(false);
  const [showModalSuccess, setModalSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!name || !platNumber) {
      setModalEmptyField(true);
      return;
    }

    const newBook = {
      id: uuidv4(),
      name,
      platNumber,
      duration,
      building,
      floor,
      spot,
      timestamp: new Date().toISOString(),
      status: "active",
    };

    const existingEntries = JSON.parse(
      localStorage.getItem("parkingData") || "[]"
    );

    const updatedEntries = [...existingEntries, newBook];

    localStorage.setItem("parkingData", JSON.stringify(updatedEntries));

    setName("");
    setPlatNumber("");
    setDuration(durationOptions[0]);

    setModalSuccess(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Left */}
        <div className="relative w-full z-0 overflow-hidden flex flex-col my-auto">
          <div className="flex justify-center pt-2 pb-2 w-full">
            <div className="text-primary-2 text-lg">
              <h1>Review Book Transaction</h1>
            </div>
          </div>

          <div className="flex justify-center rounded-lg md:p-0">
            <div className="w-[460px] mt-10 mx-10">
              <h3 className="font-bold text-xl text-primary-1 pb-4 text-center md:text-left">
                Detail Transaction
              </h3>
              <p className="text-primary-1 pb-6 text-center md:text-left">
                Please enter name, car license plat number, parking duration.
              </p>

              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="w-full space-y-1">
                    <label className="text-base font-medium text-primary-1">
                      Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type={"text"}
                      placeholder="Please enter the name"
                    />
                  </div>
                  <div className="w-full space-y-1">
                    <label className="text-base font-medium text-primary-1">
                      Car License Plat Number
                    </label>
                    <Input
                      value={platNumber}
                      onChange={(e) => setPlatNumber(e.target.value)}
                      type={"text"}
                      placeholder="Please enter the number"
                      className="uppercase"
                    />
                  </div>
                  <div className="w-full space-y-1">
                    <label className="text-base font-medium text-primary-1">
                      Parking Duration
                    </label>
                    <Select
                      data={durationOptions}
                      onChange={setDuration}
                      value={duration}
                      className="min-w-[200px]"
                      position="top"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  full
                  className="mb-4 text-primary-1"
                  onClick={() => handleSubmit()}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="md:min-w-[690px] my-auto relative z-0">
          <div className="mt-4 rounded-lg bg-primary-4 px-10 py-5">
            <h2>Parking Details</h2>
            <hr className="my-5 h-px w-full bg-primary-2" />
            <div className="mt-4 rounded-lg border p-5">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-base font-medium">Name</h5>
                  <p className="p-2 rounded-md capitalize">
                    {name || "-"}
                  </p>
                </div>
                <div>
                  <h5 className="text-base font-medium">Plat Number</h5>
                  <p className="p-2 rounded-md uppercase">
                    {platNumber || "-"}
                  </p>
                </div>
                <div>
                  <h5 className="text-base font-medium">Duration</h5>
                  <p className="p-2 rounded-md">{duration.name}</p>
                </div>
                <div>
                  <h5 className="text-base font-medium">Building</h5>
                  <p className="p-2 rounded-md">{building}</p>
                </div>
                <div>
                  <h5 className="text-base font-medium">Floor</h5>
                  <p className="p-2 rounded-md">{floor}</p>
                </div>
              </div>
            </div>
            <hr className="my-5 h-px w-full bg-primary-2" />
            <div className="w-full flex justify-center">
              <h1 className="text-7xl">
                NO <span className="text-primary-3">{spot}</span>
              </h1>
            </div>
            <hr className="my-5 h-px w-full bg-primary-2" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModalEmptyField}
        title="Failed Book"
        description="Name or Plat Number is required"
        onClose={() => {
          setModalEmptyField(false);
        }}
      />
      <Modal
        isOpen={showModalSuccess}
        title="Success Booking"
        description="Your booking is Success"
        onClose={() => {
          setModalSuccess(false);
          router.push("/detail-book");
        }}
      />
    </div>
  );
};

export default ReviewBookPage;
