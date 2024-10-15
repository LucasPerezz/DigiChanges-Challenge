import Starships from "@/components/starships/Starships";
import starshipData from "@/services/Starship";
import React from "react";

export default async function page() {
  const starships = await starshipData.getStarships();
  return <Starships starships={starships} />;
}
