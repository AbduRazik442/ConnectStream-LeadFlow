import { AudioWaveform, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
            <AudioWaveform size={19} className="text-white" />
          </div>
          <span className="font-display font-semibold text-white">
            ConnectStream.
          </span>
        </a>

        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ConnectStream. All rights reserved.
        </p>

        <a
          href="#contact"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-blue-400"
        >
          Let's connect
          <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;