import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="page-background relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-[20%] h-96 w-96 rounded-full bg-blue-600/[0.06] blur-[120px]" />

        <div className="absolute -right-40 top-[55%] h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LeadForm />
        <Footer />
      </div>
    </main>
  );
}

export default App;