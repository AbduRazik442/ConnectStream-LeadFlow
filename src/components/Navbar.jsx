import { motion } from "framer-motion";
import { AudioWaveform, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"
    >
      <a href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
          <AudioWaveform size={23} className="text-white" />
        </div>

        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-white">
            ConnectStream<span className="text-blue-400">.</span>
          </h1>
          <p className="text-[10px] tracking-[0.22em] text-slate-500">
            BUSINESS AUTOMATION
          </p>
        </div>
      </a>

      <div className="hidden items-center gap-8 md:flex">
        <a href="#solutions" className="text-sm text-slate-400 transition hover:text-white">
          Solutions
        </a>
        <a href="#contact" className="text-sm text-slate-400 transition hover:text-white">
          Contact
        </a>
      </div>

      <a
        href="#contact"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white transition hover:border-blue-400/50 hover:bg-blue-500/10"
      >
        Get Started
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </motion.nav>
  );
};

export default Navbar;