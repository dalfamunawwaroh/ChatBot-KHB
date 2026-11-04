import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import Problem from "../components/Problem";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Knowledge from "../components/Knowledge";
import Technology from "../components/Technology";
import Ethics from "../components/Ethics";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ChatDemo from "../components/ChatDemo";

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div className="min-h-screen bg-white text-[#10231a] flex flex-col selection:bg-[#bbf7d0] selection:text-[#0b5c30]">
      <Navbar onOpenChat={openChat} />

      <main className="flex-1">
        <Hero onOpenChat={openChat} />
        <StatsStrip />
        <Problem />
        <Features />
        <HowItWorks />
        <Knowledge />
        <Technology />
        <Ethics />
        <FAQ onOpenChat={openChat} />
        <CTA onOpenChat={openChat} />
        <Contact />
      </main>

      <Footer />

      <ChatDemo isOpen={isChatOpen} onClose={closeChat} />

      <button
        type="button"
        onClick={openChat}
        aria-label="Buka asisten halal"
        className="care-btn-spring fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 h-[3rem] pl-4 pr-5 rounded-full text-white text-[0.9rem] font-semibold shadow-[0_16px_36px_-12px_rgba(11,92,48,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
        style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
      >
        <MessageCircle className="w-4.5 h-4.5" />
        <span className="hidden sm:inline">Tanya Asisten</span>
      </button>
    </div>
  );
}
