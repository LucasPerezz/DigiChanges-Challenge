import FilmsDetail from '@/components/films/FilmsDetail'
import filmsData from '@/services/Film'
import React from 'react'

interface PageProps {
  params: {
    title: string
  }
}

export default async function page({params: {title}}: PageProps) {
  const film = await filmsData.getFilmByName(title);
  return <FilmsDetail film={film} />
}
