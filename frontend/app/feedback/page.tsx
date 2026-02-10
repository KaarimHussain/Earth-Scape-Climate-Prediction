"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { submitFeedback } from "@/lib/api";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function FeedbackPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Send to Next.js Backend (which sends email via Nodemailer)
            await submitFeedback(name, email, message, rating);

            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
            setRating(5);
        } catch (err: any) {
            console.error("Error submitting feedback:", err);
            setError("Failed to submit feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden font-sans bg-[#050505] bg-secondary">
            <Navbar />

            <div className="container mx-auto px-5 pt-40 pb-20 relative z-10 flex flex-col items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium tracking-tight text-white leading-none drop-shadow-2xl font-ahsing">
                        FEEDBACK
                    </h1>
                    <span className="block text-xl md:text-3xl font-light text-white/60 mt-4 tracking-[0.2em] uppercase font-sans">
                        User Experience
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-xl bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h2 className="text-2xl text-white font-medium mb-2">Thank You!</h2>
                            <p className="text-white/60 font-light mb-8">Your feedback has been transmitted to our team.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors border-b border-emerald-500/30 hover:border-emerald-500"
                            >
                                Submit another response
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                            <div>
                                <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 block ml-1">Overall Experience</label>
                                <div className="flex justify-center gap-3 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`transition-all duration-300 transform hover:scale-110 p-2 ${star <= rating ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "text-white/10 hover:text-white/30"
                                                }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill={star <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-center text-white/30 text-xs font-mono">{rating === 5 ? "Excellent" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : "Very Poor"}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">Personal Details</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm font-light"
                                            placeholder="Full Name"
                                            required
                                        />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm font-light"
                                            placeholder="Email Address"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block ml-1">Your Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm font-light h-40 resize-none"
                                        placeholder="Share your thoughts, suggestions, or report issues..."
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-medium py-4 rounded-xl mt-4 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:shadow-none"
                            >
                                {loading ? "Transmitting..." : "Submit Feedback"}
                            </button>
                            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                        </form>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
