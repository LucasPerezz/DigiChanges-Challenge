import PlanetDetail from "@/components/planets/PlanetDetail";
import planetData from "@/services/Planet";
import React from "react";

interface PlanetPageProps {
  params: {
    name: string;
  };
}

export default async function page({ params: { name } }: PlanetPageProps) {
  const planet = await planetData.getPlanetsByName(name);
  return <PlanetDetail planet={planet} />;
}
