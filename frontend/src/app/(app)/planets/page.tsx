import Planets from '@/components/planets/Planets';
import planetData from '@/services/Planet'
import React from 'react'

export default async function page() {
  const planets = await planetData.getPlanets();
  return <Planets planets={planets} />
}
