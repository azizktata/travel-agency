"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Select({
  options,
  type = "voyage",
}: {
  options: string[];
  type: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    if (value !== 0) {
      router.push(pathname + "?" + createQueryString(name, value));
    }
    if (value == 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(pathname + "?" + params.toString());
    }
  }
  const currentType = searchParams.get("Type") || false;
  return (
    <div className="select-container">
      {type === "voyage" ? (
        <select onChange={handleChange} name="Type" className="filter-select">
          <option value={0}>tous les voyages</option>
          <option
            selected={currentType === "voyage-organise"}
            value="voyage-organise"
          >
            Organisés
          </option>
          <option
            selected={currentType === "voyage-carte"}
            value="voyage-carte"
          >
            A la carte
          </option>
        </select>
      ) : (
        <select onChange={handleChange} name="etoile" className="filter-select">
          <option value={0}>tous les hotels</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      )}

      <select
        onChange={handleChange}
        name="destination"
        className="filter-select"
      >
        <option value={0}>tous les destinations</option>
        {options?.map((destination: string) => (
          <option key={destination} value={destination}>
            {destination}
          </option>
        ))}
      </select>
    </div>
  );
}
