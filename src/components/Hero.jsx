import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  MessageCircle,
  Workflow,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: MessageCircle,
    title: "WhatsApp Solutions",
    description: "Connect with customers instantly.",
  },
  {
    icon: Bot,
    title: "Smart Automation",
    description: "Automate repetitive business tasks.",
  },
  {
    icon: Workflow,
    title: "CRM Integration",
    description: "Bring your customer data together.",
  },
];

const Hero = () => {
  return (
    <section
      id="solutions"
      className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20"
    >
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2">
          <Sparkles size={15} className="text-blue-400" />
          <span className="text-xs font-medium tracking-wide text-blue-300">
            SMARTER CONNECTIONS. BETTER BUSINESS.
          </span>
        </div>

        <h1 className="font-display max-w-2xl text-5xl font-semibold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Turn conversations into{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            customers.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
          Your business deserves more than ordinary communication.
          Discover smarter WhatsApp solutions, seamless CRM integrations,
          and powerful automation built for growth.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:shadow-blue-500/30"
          >
            Let's Talk Business
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck size={18} className="text-emerald-400" />
            Let's build something better
          </div>
        </div>

        <div className="mt-14 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="group"
              >
                <Icon
                  size={22}
                  className="mb-4 text-blue-400 transition-transform group-hover:scale-110"
                />
                <h3 className="text-sm font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-indigo-600/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                The ConnectStream Approach
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-white">
                One connected ecosystem.
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
              <Workflow className="text-blue-400" size={23} />
            </div>
          </div>

          <div className="relative mt-10 space-y-4">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10">
                  <MessageCircle className="text-emerald-400" size={23} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Customer conversations
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    WhatsApp Business API
                  </p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-px bg-gradient-to-b from-emerald-400/50 to-blue-400/50" />
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.06] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10">
                  <Bot className="text-blue-400" size={23} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Intelligent automation
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Chatbots & workflows
                  </p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-blue-400" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-8 w-px bg-gradient-to-b from-blue-400/50 to-violet-400/50" />
            </div>

            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-400/10">
                  <Workflow className="text-violet-400" size={23} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Business growth
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    CRM & connected systems
                  </p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-violet-400" />
              </div>
            </div>
          </div>

          <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-xs text-slate-500">
              Connected communication. Simplified.
            </p>
            <Sparkles size={17} className="text-blue-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;