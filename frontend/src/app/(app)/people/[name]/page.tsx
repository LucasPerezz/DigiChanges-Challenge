import PeopleDetail from "@/components/people/PeopleDetail";
import peopleData from "@/services/people";
import React from "react";

interface pageProps {
  params: {
    name: string;
  };
}

export default async function page({ params: { name } }: pageProps) {
  const person = await peopleData.getPeopleById(name);
  return <PeopleDetail person={person} />;
}
