/* eslint-disable react-hooks/exhaustive-deps */
import { calculateRemainingTime } from "@/utils/time";
import React, { useEffect, useState, useRef } from "react";
import cx from "classnames";
import Button from "@/components/core/Button";
import Link from "next/link";

interface Duration {
  id: string;
  name: string;
  value: number;
}

interface Booking {
  id: string;
  name: string;
  platNumber: string;
  duration: Duration;
  building: string;
  floor: string;
  spot: string;
  timestamp: string;
  status: string;
}

function DetailBookingPage() {
  const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [timeUpdates, setTimeUpdates] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("parkingData");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  const endParkingSession = (id: string) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }

    const existingEntries = JSON.parse(
      localStorage.getItem("parkingData") || "[]"
    );

    const updatedEntries = existingEntries.map((entry: { id: string }) => {
      if (entry.id === id) {
        return { ...entry, status: "ended" };
      }
      return entry;
    });

    localStorage.setItem("parkingData", JSON.stringify(updatedEntries));
    setBookingData(updatedEntries);
  };

  useEffect(() => {
    bookingData.forEach((entry) => {
      if (entry.status === "active" && !intervalRefs.current[entry.id]) {
        const interval = setInterval(() => {
          setTimeUpdates((prev) => ({
            ...prev,
            [entry.id]: calculateRemainingTime(
              entry.timestamp,
              entry.duration.value
            ),
          }));
        }, 1000);

        intervalRefs.current[entry.id] = interval;
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [bookingData]);

  return (
    <div className="px-6 py-7 w-full flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-2">Detail booking</h1>
        <Link href="/">
          <Button className="bg-primary-3 text-primary-1 p-2 rounded-md">
            Back to Index
          </Button>
        </Link>
      </div>
      <div className="relative">
        <div className="space-y-4 rounded-lg bg-white p-5">
          <div className="relative z-0 mt-4 min-h-[500px]">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="sticky top-0 z-[3] border-b border-primary-4 bg-white text-base">
                  <tr>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      Name
                    </th>
                    <th className="p-3 text-left font-normal">Plat Number</th>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      Duration
                    </th>
                    <th className="p-3 text-left font-normal">Building</th>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      Floor
                    </th>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      No Spot
                    </th>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      Time Start
                    </th>
                    <th className="whitespace-nowrap p-3 text-left font-normal">
                      Time Remaining
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData?.map((item, i) => (
                    <tr
                      key={i}
                      className={cx(
                        "border-b border-primary-4 text-base font-normal text-primary-1 even:bg-primary-4",
                        (timeUpdates[i] ||
                          calculateRemainingTime(
                            item.timestamp,
                            item.duration.value
                          )) === "Expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-white"
                      )}
                    >
                      <td className="p-3 align-top">{item.name}</td>
                      <td className="p-3 align-top">{item.platNumber}</td>
                      <td className="p-3 align-top">{item.duration.name}</td>
                      <td className="p-3 align-top">{item.building}</td>
                      <td className="p-3 align-top">{item.floor}</td>
                      <td className="flex items-center gap-2 p-3 align-top">
                        {item.spot}
                      </td>
                      <td>
                        {isNaN(new Date(item.timestamp).getTime())
                          ? "Invalid Date"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }).format(new Date(item.timestamp))}
                      </td>
                      <td className="p-3 align-top">
                        {item.status === "ended"
                          ? "Sesi Berakhir"
                          : timeUpdates[i] ||
                            calculateRemainingTime(
                              item.timestamp,
                              item.duration.value
                            )}
                      </td>
                      <td>
                        {item.status === "active" && (
                          <Button
                            size="xs"
                            onClick={() => endParkingSession(item.id)}
                          >
                            End
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBookingPage;
