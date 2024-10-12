import React from "react";
import { People } from "@/types/types" ;
import peopleData from "@/services/people";
import PeoplePage from "@/components/people/PeoplePage";

export default async function page() {
    const people: People[] = await peopleData.getPeople();

    return <PeoplePage people={people} />
    
}
