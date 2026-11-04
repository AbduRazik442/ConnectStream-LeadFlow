import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";

const SuccessMessage = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[580px] flex-col items-center justify-center text-center"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle2 size={48} className="text-emerald-400" />
        </div>
        <Sparkles className="absolute -right-4 -top-2 text-blue-400" size={22} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Interface preview
      </p>

      <h3 className="font-display mt-4 text-3xl font-semibold text-white">
        Thank you for reaching out!
      </h3>

      <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
        This is how the confirmation screen will look after a successful
        submission. Google Sheets integration is coming in the next milestone.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-9 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        <ArrowLeft size={16} />
        Back to form
      </button>
    </motion.div>
  );
};

export default SuccessMessage;