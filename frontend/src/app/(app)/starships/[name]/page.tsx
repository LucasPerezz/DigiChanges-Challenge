import StarshipDetail from "@/components/starships/StarshipDetail";
import starshipData from "@/services/Starship";
import React from "react";

interface StarshipPageProps {
  params: {
    name: string;
  };
}

export default async function page({ params: { name } }: StarshipPageProps) {
  const starship = await starshipData.getStarshipByName(name);
  return <StarshipDetail starship={starship} />;
}
