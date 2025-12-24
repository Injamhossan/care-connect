import Services from "@/components/home/Services";
import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Cta from "@/components/home/Cta";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </div>
  );
}
