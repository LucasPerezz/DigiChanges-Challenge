<<<<<<< HEAD
import Films from '@/components/films/Films';
import filmsData from '@/services/Film'
import { Film } from '@/types/types';
import React from 'react'

export default async function page() {
  const films: Film[] = await filmsData.getFilms();
  return <Films films={films} />
=======
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
}
