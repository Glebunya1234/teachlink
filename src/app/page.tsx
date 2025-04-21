import { Experiences } from "@/gen/Experiences";

export default async function Home() {

  const exp = new Experiences({baseURL:"http://localhost:5204/"})
  exp.experiencesList().then((data)=> {console.log(data.data)})
  return (
   <>Hello world</>
  );
}
