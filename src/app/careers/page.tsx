"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ArrowRight, X, UploadCloud, CheckCircle, FileText, Send, Loader2, AlertTriangle } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  requirements: string[];
  salaryRange?: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs?active=true");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setSuccessMsg("");
    setErrorMsg("");
    setFormData({ fullName: "", email: "", phone: "", coverLetter: "" });
    setResumeFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const formPayload = new FormData();
      formPayload.append("jobId", selectedJob!._id);
      formPayload.append("jobTitle", selectedJob!.title);
      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("coverLetter", formData.coverLetter);
      formPayload.append("resume", resumeFile);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formPayload,
      });

      if (res.ok) {
        setSuccessMsg("Your application has been submitted successfully!");
        setTimeout(() => {
          setSelectedJob(null);
        }, 3000);
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error || "Failed to submit application.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pt-[72px]">


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Join the <span className="text-sky-300">Maasewa</span> Family
          </h1>
          <p className="text-sky-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We are always looking for compassionate nurses, expert caregivers, and dedicated professionals to help us bring world-class healthcare to every home.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="flex-1 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Open Positions</h2>
            <div className="w-20 h-1.5 bg-sky-500 rounded-full mx-auto" />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Openings Right Now</h3>
              <p className="text-slate-500">Please check back later or contact us directly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700">
                        {job.jobType}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-slate-500 text-sm mb-4 gap-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {job.salaryRange}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requirements</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                            <span className="line-clamp-1">{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-sky-500 text-xs font-medium ml-3.5">
                            +{job.requirements.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-sky-500 text-slate-700 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setSelectedJob(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative"
                >
                  {/* Modal Header */}
                  <div className="bg-sky-50 px-6 py-5 border-b border-sky-100 flex items-center justify-between">
                    <div>
                      <p className="text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">Applying for</p>
                      <h3 className="text-xl font-extrabold text-slate-800">{selectedJob.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      disabled={isSubmitting}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shadow-sm disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    {successMsg ? (
                      <div className="py-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-800 mb-2">Application Sent!</h4>
                        <p className="text-slate-500 max-w-sm">
                          {successMsg} Our HR team will review your profile and get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                            <input
                              required
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800"
                              placeholder="Jane Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                            <input
                              required
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800"
                            placeholder="jane@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cover Letter (Optional)</label>
                          <textarea
                            value={formData.coverLetter}
                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800"
                            placeholder="Tell us why you're a great fit..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resume / CV (PDF or DOCX)</label>
                          <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${resumeFile ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                              {resumeFile ? (
                                <>
                                  <FileText className="w-8 h-8 text-sky-500 mb-2" />
                                  <p className="text-sm font-semibold text-sky-700">{resumeFile.name}</p>
                                  <p className="text-xs text-sky-500 mt-1">Click to change file</p>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                                  <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                </>
                              )}
                            </div>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setResumeFile(file);
                              }}
                            />
                          </label>
                        </div>

                        {errorMsg && (
                          <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100 flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>Submit Application <Send className="w-4 h-4" /></>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </main>
  );
}
