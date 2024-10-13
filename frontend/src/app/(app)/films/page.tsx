import Films from '@/components/films/Films';
import filmsData from '@/services/Film'
import { Film } from '@/types/types';
import React from 'react'

export default async function page() {
  const films: Film[] = await filmsData.getFilms();
  return <Films films={films} />
}
