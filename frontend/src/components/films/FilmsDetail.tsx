import { Film } from '@/types/types'
import React from 'react'

interface FilmsDetailProps {
    film: Film
}

export default function FilmsDetail({ film }: FilmsDetailProps) {
    return (

        <div className="flex flex-col justify-center items-start w-full container p-10 gap-10 mx-auto">
            <h2 className="text-2xl font-bold">{film.title}</h2>
            <div>
                <ul className="flex flex-col gap-1">
                    {Object.entries(film).map(([key, value]) => {
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
    )
}
