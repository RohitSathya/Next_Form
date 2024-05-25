import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect } from "react";

function Homepage() {
    const router = useRouter();
    useEffect(()=>{
        router.push('/signup')
    },[])
  return (
    <>
    </>
  );
}

export default Homepage;
