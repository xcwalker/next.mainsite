import { Home_Hero } from "@/components/home/hero";
import { Home_Repos } from "@/components/home/repos";
import Horizontal from "@/components/home/horizontal";
// Other
import Background from "@/components/home/background";

export default function Home() {
  return (
    <>
      <Background />
      <Home_Hero />
      {/* <Horizontal /> */}
      <Home_Repos />
    </>
  );
}
