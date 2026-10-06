import { About } from "@/components/sections/about";
import { Career } from "@/components/sections/career";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Projects />
      </main>
      <Contact />
    </>
  );
}
