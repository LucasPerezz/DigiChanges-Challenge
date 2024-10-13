import { People } from "@/types/types";
import React from "react";

interface PeopleDetailProps {
  person: People;
}

export default function PeopleDetail({ person }: PeopleDetailProps) {
  console.log(person);
  return (
    <div className="flex flex-col justify-center items-start w-full container p-10 gap-10 mx-auto">
      <h2 className="text-2xl font-bold">{person.name}</h2>
      <div>
        <ul className="flex flex-col gap-1">
          {Object.entries(person).map(([key, value]) => {
            if (!Array.isArray(value) && key !== "__v" && key !== "_id")
              return (
                <li key={key} className="text-lg">
                  <span className="font-bold">{key.toUpperCase()}</span>: <span>{value}</span>
                </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
}
