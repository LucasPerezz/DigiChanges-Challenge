<<<<<<< HEAD
import Planets from '@/components/planets/Planets';
import planetData from '@/services/Planet'
import React from 'react'

export default async function page() {
  const planets = await planetData.getPlanets();
  return <Planets planets={planets} />
=======
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
}
