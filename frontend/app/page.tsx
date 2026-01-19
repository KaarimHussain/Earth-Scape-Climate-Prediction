import Hero from "@/components/home/hero";
import OurApproach from "@/components/home/our-approach";
import Features from "@/components/home/features";
import InteractiveData from "@/components/home/interactive-data";
import Impact from "@/components/home/impact";
import UseCases from "@/components/home/use-cases";
import Insights from "@/components/home/insights";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <div className="bg-secondary">
        <Navbar />
        <Hero />
        <OurApproach />
        <Features />
        <InteractiveData />
        <Impact />
        <UseCases />
        <Insights />
        <Footer />
      </div>
    </>
  );
}
