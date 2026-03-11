import Header from "@/shared/components/Header";
import EventSection from "@/features/home/components/EventSection";
import HomeClientWrapper from "@/features/home/components/HomeClientWrapper";

export default function HomePage() {
  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <Header />
      <HomeClientWrapper />
      <EventSection />
    </div>
  );
}
