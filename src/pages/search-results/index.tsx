import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/core/Button";
import Select, { SelectItem } from "@/components/core/Select";

const Stage = dynamic(() => import("react-konva").then((mod) => mod.Stage), {
  ssr: false,
});
const Layer = dynamic(() => import("react-konva").then((mod) => mod.Layer), {
  ssr: false,
});
const Rect = dynamic(() => import("react-konva").then((mod) => mod.Rect), {
  ssr: false,
});
const Text = dynamic(() => import("react-konva").then((mod) => mod.Text), {
  ssr: false,
});

const parkingSpots = [
  { id: 101, x: 50, y: 50, isAvailable: true },
  { id: 102, x: 50, y: 140, isAvailable: false },
  { id: 103, x: 50, y: 230, isAvailable: true },
  { id: 104, x: 50, y: 320, isAvailable: false },
  { id: 105, x: 50, y: 410, isAvailable: true },
  { id: 106, x: 150, y: 50, isAvailable: true },
  { id: 107, x: 150, y: 140, isAvailable: true },
  { id: 108, x: 150, y: 230, isAvailable: true },
  { id: 109, x: 150, y: 320, isAvailable: true },
  { id: 110, x: 150, y: 410, isAvailable: true },
];

const floorOptions = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
];

const getRandomUnavailableSpot = () => {
  const unavailableSpots = parkingSpots.filter((spot) => spot.isAvailable);
  if (unavailableSpots.length === 0) {
    throw new Error("No unavailable spots found!");
  }
  const randomSpot =
    unavailableSpots[Math.floor(Math.random() * unavailableSpots.length)];
  return randomSpot.id;
};

const SearchPage = () => {
  const router = useRouter();
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [floor, setFloor] = useState<SelectItem>(floorOptions[0]);

  const { building } = router.query;

  const handleSpotClick = (id: number) => {
    setSelectedSpot(id);
  };

  const handleBookSpot = () => {
    const query = {
      building,
      floor: floor.id,
      spot: selectedSpot,
    };

    router.push({
      pathname: "/review-book",
      query,
    });
  };

  useEffect(() => {
    setSelectedSpot(getRandomUnavailableSpot());
  }, []);

  return (
    <div className="h-[100%] overflow-x-hidden py-2 w-full h-full">
      <section className="flex justify-end m-5">
        <h3>{building} Parking</h3>
      </section>

      <section className="flex justify-around p-4 bg-primary-4 rounded-lg mx-4 my-4">
        <div>
          <h4 className="text-primary-2">Parking lot</h4>
          <h2 className="text-5xl text-primary-1 font-bold pt-1">
            {selectedSpot}
          </h2>
        </div>

        <div>
          <h4 className="text-primary-2">Floor</h4>
          <Select
            data={floorOptions}
            onChange={setFloor}
            value={floor}
            className="min-w-[30px]"
          />
        </div>
      </section>

      <div className="grid place-items-center bg-primary-4 mx-4 my-2 rounded-lg">
        <Stage width={300} height={520}>
          <Layer>
            {parkingSpots.map((spot) => (
              <React.Fragment key={spot.id}>
                <Rect
                  x={spot.x}
                  y={spot.y}
                  width={80}
                  height={80}
                  fill={
                    spot.isAvailable
                      ? selectedSpot === spot.id
                        ? "yellow"
                        : "grey"
                      : "red"
                  }
                />
                <Text
                  x={spot.x}
                  y={spot.y}
                  width={80}
                  height={80}
                  text={spot.id.toString()}
                  align="center"
                  verticalAlign="middle"
                  fontSize={16}
                  fontStyle="bold"
                  fill="black"
                  onClick={() => {
                    if (spot.isAvailable) {
                      handleSpotClick(spot.id);
                    }
                  }}
                  onMouseEnter={(e) => {
                    const stage = e.target.getStage();
                    if (stage) {
                      stage.container().style.cursor = spot.isAvailable
                        ? "pointer"
                        : "not-allowed";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const stage = e.target.getStage();
                    if (stage) {
                      stage.container().style.cursor = "default";
                    }
                  }}
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>

        <Button
          type="submit"
          full
          className="md:mb-4 text-primary-1 md:w-1/5"
          onClick={handleBookSpot}
        >
          Book spot
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
