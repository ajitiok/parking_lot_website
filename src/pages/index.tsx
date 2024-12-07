import Button from "@/components/core/Button";
import Select, { SelectItem } from "@/components/core/Select";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const buildingOptions = [
  {
    id: 1,
    name: "Pakuwon Mall",
  },
  {
    id: 2,
    name: "Tunjungan Plaza",
  },
  {
    id: 3,
    name: "Grand Indonesia",
  },
];

export default function Home() {
  const router = useRouter();

  const [building, setBuilding] = useState<SelectItem>(buildingOptions[0]);

  const handleSearch = () => {
    const query = {
      building: building.name,
    };

    router.push({
      pathname: "/search-results",
      query,
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="relative px-6 py-5 w-full z-0 overflow-hidden flex flex-col">
        <div className="flex justify-center md:justify-start pt-14 pb-10 md:py-0 w-full">
          <div className="text-primary-2 text-xl">
            <h1>ParkLot Website</h1>
          </div>
        </div>

        <div className="flex flex-auto justify-center bg-primary-4 rounded-lg p-6 md:p-0 items-center">
          <div className="w-[460px] mx-auto">
            <h3 className="font-bold text-xl text-primary-1 pb-4 text-center md:text-left">
              Choose Your Building for{" "}
              <span className="text-primary-3">Parking</span> Reservation
            </h3>
            <p className="text-primary-1 pb-6 text-center md:text-left">
              Select a building below to book your parking space.
            </p>

            <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-primary-1 font-medium">Select Building</p>

                <Select
                  data={buildingOptions}
                  onChange={setBuilding}
                  value={building}
                  className="min-w-[200px]"
                />
              </div>
              <Button
                type="submit"
                full
                className="mb-4 text-p"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:block min-w-[690px] relative overflow-hidden z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/car-park.jpg"
            alt="car"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
