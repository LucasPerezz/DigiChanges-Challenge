<<<<<<< HEAD
"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      {router.push('/people')}
=======

export default function Home() {
  return (
    <>
      Hola mundo
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
    </>
  );
}
