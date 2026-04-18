"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Shield, DollarSign, Users, Loader2, ChevronRight, Star } from "lucide-react";
import PaymentModal from "@/components/escort-apply/PaymentModal";
import { createClient } from "@supabase/supabase-js";

const CITIES = [
  "Kampala", "Entebbe", "Jinja", "Mbarara", "Gulu", "Fort Portal",
  "Mbale", "Tororo", "Mukono", "Masaka", "Lira", "Arua",
];

type Screen = "info" | "form" | "payment" | "success";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BecomeEscortPage = () => {
  const [screen, setScreen] = useState<Screen>("info");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    body_type: "",
    complexion: "",
    location: "",
    phone: "",
    whatsapp: "",
    short_bio: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    setError("");
    if (!form.name || !form.phone || !form.location) {
      setError("Name, phone number, and location are required.");
      return;
    }
    if (form.phone.length < 9) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("escort_applications")
        .insert({
          name: form.name.trim(),
          age: form.age ? parseInt(form.age) : null,
          height: form.height.trim() || null,
          body_type: form.body_type.trim() || null,
          complexion: form.complexion.trim() || null,
          location: form.location,
          phone: form.phone.trim(),
          whatsapp: form.whatsapp.trim() || form.phone.trim(),
          short_bio: form.short_bio.trim() || null,
          description: form.description.trim() || null,
          status: "pending_payment",
        })
        .select("id")
        .single();

      if (dbError) throw dbError;
      setApplicationId(data.id);
      setScreen("payment");
      setShowPaymentModal(true);
    } catch (err: any) {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentVerified = () => {
    setShowPaymentModal(false);
    setScreen("success");
  };

  if (screen === "success") {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <div className="lg:hidden h-16" />
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Application Submitted! 🎉</h1>
          <p className="text-gray-300 mb-2">
            Your payment is being verified. Once confirmed, our team will review your profile and activate it within <strong className="text-pink-400">24 hours</strong>.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            You'll receive a WhatsApp message on <strong className="text-white">{form.phone}</strong> when your profile goes live.
          </p>
          <Button
            className="bg-pink-600 hover:bg-pink-700"
            onClick={() => window.location.href = "/"}
          >
            Go Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:pl-72">
      <div className="lg:hidden h-16" />

      {/* Payment Modal overlay */}
      {showPaymentModal && applicationId && (
        <PaymentModal
          applicationId={applicationId}
          onVerified={handlePaymentVerified}
          onClose={() => {
            setShowPaymentModal(false);
            setScreen("form");
          }}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-600/10 border border-pink-600/30 rounded-full px-4 py-1 text-pink-400 text-sm font-medium mb-4">
            <Star className="h-3.5 w-3.5" />
            Self-Registration Now Available
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Join Hex Escorts UG
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Create your own profile, set your own terms, and start getting clients today. No middlemen.
          </p>
        </div>

        {screen === "info" && (
          <>
            {/* Benefits grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20", title: "Keep 100% Earnings", desc: "Pay a one-time listing fee of UGX 50,000. No commissions ever." },
                { icon: Shield, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", title: "Your Privacy Protected", desc: "Your real name and address are never shared. Full control over your profile." },
                { icon: Users, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20", title: "Quality Clients", desc: "Reach thousands of verified clients browsing the platform every day." },
                { icon: CheckCircle, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20", title: "Go Live Fast", desc: "Submit your profile today. Verified and live within 24 hours." },
              ].map((item) => (
                <Card key={item.title} className={`border ${item.bg}`}>
                  <CardContent className="pt-5 pb-4">
                    <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Process steps */}
            <Card className="mb-8 border-gray-700 bg-gray-900/50">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-white mb-5">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Fill Your Profile", desc: "Enter your details, bio, and services. Takes about 3 minutes." },
                    { step: "2", title: "Pay UGX 50,000", desc: "One-time listing fee via MTN MoMo or Airtel Money." },
                    { step: "3", title: "Submit Transaction ID", desc: "Enter the transaction ID from your payment SMS to confirm." },
                    { step: "4", title: "Go Live in 24hrs", desc: "Our team verifies your payment and activates your profile." },
                  ].map((s, i) => (
                    <div key={s.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-pink-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{s.title}</p>
                        <p className="text-gray-400 text-sm">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-pink-900/30"
                onClick={() => setScreen("form")}
              >
                Create My Profile <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-gray-500 text-xs mt-3">One-time fee: UGX 50,000 · No monthly charges</p>
            </div>
          </>
        )}

        {screen === "form" && (
          <Card className="border-gray-700 bg-gray-900/60">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-white mb-6">Your Profile Details</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="md:col-span-2">
                  <Label className="text-gray-300 text-sm mb-1.5 block">
                    Display Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="The name clients will see (e.g. Sandra)"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">
                    Phone Number <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="e.g. 0771234567"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">WhatsApp Number (if different)</Label>
                  <Input
                    value={form.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="Leave blank if same as above"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">
                    Your City <span className="text-red-400">*</span>
                  </Label>
                  <select
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select city...</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Age */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Age</Label>
                  <Input
                    type="number"
                    min={18}
                    max={60}
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="Must be 18+"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Height */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Height</Label>
                  <Input
                    value={form.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="e.g. 5'6&quot;"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Body Type */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Body Type</Label>
                  <select
                    value={form.body_type}
                    onChange={(e) => handleChange("body_type", e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select...</option>
                    {["Slim", "Athletic", "Curvy", "Thick", "Plus Size"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Complexion */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">Complexion</Label>
                  <select
                    value={form.complexion}
                    onChange={(e) => handleChange("complexion", e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select...</option>
                    {["Light", "Brown", "Dark", "Chocolate", "Caramel"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Short Bio */}
                <div className="md:col-span-2">
                  <Label className="text-gray-300 text-sm mb-1.5 block">Short Bio (shown on profile card)</Label>
                  <Input
                    value={form.short_bio}
                    maxLength={100}
                    onChange={(e) => handleChange("short_bio", e.target.value)}
                    placeholder="One sentence about yourself (max 100 chars)"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label className="text-gray-300 text-sm mb-1.5 block">About You (full description)</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell clients more about your personality, what you offer, your availability, etc."
                    rows={4}
                    className="bg-gray-800 border-gray-600 text-white resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setScreen("info")}
                >
                  ← Back
                </Button>
                <Button
                  className="flex-1 bg-pink-600 hover:bg-pink-700 py-6 text-base"
                  onClick={handleSubmitForm}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving Profile...</>
                  ) : (
                    <>Continue to Payment <ChevronRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
              <p className="text-center text-gray-500 text-xs mt-3">
                Your profile will go into review after payment confirmation.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BecomeEscortPage;
