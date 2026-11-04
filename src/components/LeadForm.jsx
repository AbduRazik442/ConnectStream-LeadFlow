import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    User,
    Building2,
    Mail,
    Phone,
    Globe,
    BriefcaseBusiness,
    MessageSquare,
    ArrowRight,
    LockKeyhole,
    Sparkles,
} from "lucide-react";

import FormField from "./FormField";
import SuccessMessage from "./SuccessMessage";

const industryOptions = [
    "IT & Software",
    "Healthcare",
    "Education",
    "E-commerce",
    "Finance",
    "Retail",
    "Real Estate",
    "Hospitality",
    "Manufacturing",
    "Other",
];

const serviceOptions = [
    "WhatsApp Business API",
    "WhatsApp Chatbot",
    "WhatsApp Marketing",
    "CRM Integration",
    "Business Automation",
    "Other",
];

const LeadForm = () => {
    const initialValues = {
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        website: "",
        industry: "",
        service: "",
        message: "",
    };

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [statusMessage, setStatusMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        // Clear the field error as the user corrects it.
        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));

        setStatusMessage("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Please enter your full name.";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Please enter your company name.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        const phone = formData.phone.trim();
        const phoneDigits = phone.replace(/\D/g, "");

        if (!phone) {
            newErrors.phone = "Phone number is required.";
        } else if (
            !/^\+?[0-9\s().-]+$/.test(phone) ||
            phoneDigits.length < 7 ||
            phoneDigits.length > 15
        ) {
            newErrors.phone = "Please enter a valid international phone number.";
        }

        if (formData.website.trim()) {
            try {
                const url = new URL(formData.website.trim());

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("Invalid protocol");
                }
            } catch {
                newErrors.website = "Please enter a valid website URL.";
            }
        }

        if (!formData.industry) {
            newErrors.industry = "Please select your industry.";
        }

        if (!formData.service) {
            newErrors.service = "Please select an interested service.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setStatusMessage("");

        if (!validateForm()) {
            setStatusMessage("Please correct the highlighted fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to submit your inquiry."
                );
            }

            // Only show success after the backend confirms saving.
            setSubmitted(true);

        } catch (error) {
            setStatusMessage(
                error.message || "Something went wrong. Please try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData(initialValues);
        setErrors({});
        setStatusMessage("");
        setSubmitted(false);
    };

    return (
        <section id="contact" className="relative px-6 pb-24 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-4"
                    >
                        <div className="mb-6 flex items-center gap-2 text-blue-400">
                            <Sparkles size={17} />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                Let's connect
                            </span>
                        </div>

                        <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                            Your next big move starts{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                here.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-8 text-slate-400">
                            Every great business relationship starts with a conversation.
                            Tell us what you're looking to achieve, and let's explore the
                            possibilities together.
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                                    <MessageSquare size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">
                                        Personalized solutions
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Solutions designed around your business needs.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                                    <BriefcaseBusiness size={20} className="text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">
                                        Business-focused approach
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Technology that supports real business growth.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <p className="text-xs leading-6 text-slate-400">
                                "The right technology doesn't just connect people.
                                It creates opportunities."
                            </p>
                            <p className="mt-3 text-xs font-semibold tracking-wide text-blue-400">
                                THE CONNECTSTREAM VISION
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20 blur-xl" />

                        <div className="relative rounded-3xl border border-white/10 bg-[#101827]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <SuccessMessage
                                        key="success"
                                        onReset={handleReset}
                                    />
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="mb-8 flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                                                    Start a conversation
                                                </p>
                                                <h3 className="font-display mt-2 text-2xl font-semibold text-white">
                                                    Tell us about your business.
                                                </h3>
                                                <p className="mt-2 text-sm text-slate-500">
                                                    Fill in the details below to get started.
                                                </p>
                                            </div>

                                            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 sm:flex">
                                                <MessageSquare size={22} className="text-blue-400" />
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <FormField
                                                    label="Full Name"
                                                    name="fullName"
                                                    placeholder="John Doe"
                                                    icon={User}
                                                    required
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    error={errors.fullName}
                                                />

                                                <FormField
                                                    label="Company Name"
                                                    name="companyName"
                                                    placeholder="Your company"
                                                    icon={Building2}
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                    error={errors.companyName}
                                                    required
                                                />

                                                <FormField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@company.com"
                                                    icon={Mail}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    error={errors.email}
                                                    required
                                                />

                                                <FormField
                                                    label="Phone Number"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    icon={Phone}
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    error={errors.phone}
                                                    required
                                                />
                                            </div>

                                            <FormField
                                                label="Company Website"
                                                name="website"
                                                type="url"
                                                placeholder="https://yourcompany.com"
                                                icon={Globe}
                                                value={formData.website}
                                                onChange={handleChange}
                                                error={errors.website}
                                            />

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <FormField
                                                    label="Industry"
                                                    name="industry"
                                                    type="select"
                                                    placeholder="Choose industry"
                                                    icon={BriefcaseBusiness}
                                                    value={formData.industry}
                                                    onChange={handleChange}
                                                    error={errors.industry}
                                                    required
                                                    options={industryOptions.map((item) => ({
                                                        label: item,
                                                        value: item,
                                                    }))}
                                                />

                                                <FormField
                                                    label="Interested Service"
                                                    name="service"
                                                    type="select"
                                                    placeholder="Choose a service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    error={errors.service}
                                                    required
                                                    options={serviceOptions.map((item) => ({
                                                        label: item,
                                                        value: item,
                                                    }))}
                                                />
                                            </div>

                                            <FormField
                                                label="Message / Requirements"
                                                name="message"
                                                type="textarea"
                                                placeholder="Tell us about your requirements and what you want to achieve..."
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                            />

                                            {statusMessage && (
                                                <div
                                                    role="status"
                                                    aria-live="polite"
                                                    className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-6 text-blue-300"
                                                >
                                                    {statusMessage}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Inquiry
                                                        <ArrowRight size={18} />
                                                    </>
                                                )}
                                            </button>

                                            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                                                <LockKeyhole size={13} />
                                                Your information will be handled securely.
                                            </p>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LeadForm;