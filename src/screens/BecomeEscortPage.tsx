"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, ChevronRight, Star, Crown } from "lucide-react";
import PaymentModal from "@/components/escort-apply/PaymentModal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Screen = "plan" | "form" | "success";
type Plan = "ordinary" | "vip";

const BecomeEscortPage = () => {
  const [screen, setScreen] = useState<Screen>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan>("ordinary");
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
    services: "Dating, Companionship",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.location) {
      setError("Name, phone number, and location are required.");
      return;
    }
    if (form.phone.trim().length < 9) {
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
          body_type: form.body_type || null,
          complexion: form.complexion || null,
          location: form.location,
          phone: form.phone.trim(),
          whatsapp: form.whatsapp.trim() || form.phone.trim(),
          short_bio: form.short_bio.trim() || null,
          description: form.description.trim() || null,
          services: form.services.split(",").map(s => s.trim()).filter(Boolean),
          status: "pending_payment",
          plan: selectedPlan,
        })
        .select("id")
        .single();

      if (dbError) throw dbError;
      setApplicationId(data.id);
      setShowPaymentModal(true);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentVerified = () => {
    setShowPaymentModal(false);
    setScreen("success");
  };

  const PRICE = selectedPlan === "vip" ? 40000 : 20000;

  // --- SUCCESS SCREEN ---
  if (screen === "success") {
    return (
      <div className="container mx-auto px-4 py-12 lg:pl-72">
        <div className="lg:hidden h-16" />
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">🎉 Application Submitted!</h1>
          <p className="text-gray-300 mb-2">
            Your payment is being verified. Once confirmed, your profile will go live in{" "}
            <strong className="text-pink-400">5–10 minutes</strong>.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            You'll receive a WhatsApp message on{" "}
            <strong className="text-white">{form.phone}</strong> when your profile is live.
          </p>
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => (window.location.href = "/")}>
            Go Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:pl-72">
      <div className="lg:hidden h-16" />

      {showPaymentModal && applicationId && (
        <PaymentModal
          applicationId={applicationId}
          planAmount={PRICE}
          planName={selectedPlan === "vip" ? "VIP" : "Ordinary"}
          onVerified={handlePaymentVerified}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Become an Escort</h1>
          <p className="text-gray-400 text-sm">Fill in your details below, choose a plan, and go live in 5–10 minutes.</p>
        </div>

        {/* Plan Selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {/* Ordinary */}
          <button
            onClick={() => setSelectedPlan("ordinary")}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selectedPlan === "ordinary"
                ? "border-pink-500 bg-pink-500/10"
                : "border-gray-700 bg-gray-900/40 hover:border-gray-500"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-pink-400" />
                <span className="font-bold text-white">Ordinary</span>
              </div>
              {selectedPlan === "ordinary" && (
                <CheckCircle className="h-5 w-5 text-pink-400" />
              )}
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              UGX 20,000<span className="text-sm font-normal text-gray-400"> / week</span>
            </p>
            <ul className="text-gray-400 text-sm space-y-1 mt-2">
              <li>✓ Profile listed on the site</li>
              <li>✓ Clients can contact you directly</li>
              <li>✓ Live in 5–10 minutes</li>
            </ul>
          </button>

          {/* VIP */}
          <button
            onClick={() => setSelectedPlan("vip")}
            className={`text-left p-5 rounded-xl border-2 transition-all relative overflow-hidden ${
              selectedPlan === "vip"
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-gray-700 bg-gray-900/40 hover:border-yellow-400/50"
            }`}
          >
            <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
              POPULAR
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="font-bold text-white">VIP</span>
              </div>
              {selectedPlan === "vip" && (
                <CheckCircle className="h-5 w-5 text-yellow-400" />
              )}
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              UGX 40,000<span className="text-sm font-normal text-gray-400"> / week</span>
            </p>
            <ul className="text-gray-400 text-sm space-y-1 mt-2">
              <li>✓ <strong className="text-yellow-400">Featured at the top</strong> of search</li>
              <li>✓ Gold VIP badge on your profile</li>
              <li>✓ Get 3× more client views</li>
              <li>✓ Live in 5–10 minutes</li>
            </ul>
          </button>
        </div>

        {/* Profile Form — styled like admin panel */}
        <Card className="border-gray-700 bg-gray-900/60">
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold text-white mb-5">Your Profile Details</h2>

            <div className="space-y-4">
              {/* Profile Image upload hint */}
              <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/20 text-blue-300 text-xs">
                💡 Photo uploads are done by our team after you submit. Just focus on filling in your details — we will contact you on WhatsApp to get your photos.
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="col-span-2 space-y-2">
                  <Label>Display Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="The name clients will see (e.g. Sandra)"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    min={18}
                    max={60}
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="Must be 18+"
                  />
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input
                    value={form.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="e.g. 5'6&quot;"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Select value={form.location} onValueChange={(v) => handleChange("location", v)}>
                    <SelectTrigger><SelectValue placeholder="Select city..." /></SelectTrigger>
                    <SelectContent>
                      {["Kampala", "Entebbe", "Jinja", "Mbarara", "Gulu", "Fort Portal", "Mbale", "Tororo", "Mukono", "Masaka", "Lira", "Arua"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="e.g. 0771234567"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label>WhatsApp (if different)</Label>
                  <Input
                    value={form.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="Leave blank if same as above"
                  />
                </div>

                {/* Body Type */}
                <div className="space-y-2">
                  <Label>Body Type</Label>
                  <Select value={form.body_type} onValueChange={(v) => handleChange("body_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {["Slim", "Athletic", "Curvy", "Thick", "Plus Size"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Complexion */}
                <div className="space-y-2">
                  <Label>Complexion</Label>
                  <Select value={form.complexion} onValueChange={(v) => handleChange("complexion", v)}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {["Light", "Brown", "Dark", "Chocolate", "Caramel"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Short Bio */}
                <div className="col-span-2 space-y-2">
                  <Label>Short Bio (shown on profile card)</Label>
                  <Input
                    value={form.short_bio}
                    maxLength={100}
                    onChange={(e) => handleChange("short_bio", e.target.value)}
                    placeholder="One sentence about yourself (max 100 chars)"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2 space-y-2">
                  <Label>About You (full description)</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell clients more about your personality, availability, etc."
                    rows={4}
                  />
                </div>

                {/* Services */}
                <div className="col-span-2 space-y-2">
                  <Label>Services (comma-separated)</Label>
                  <Input
                    value={form.services}
                    onChange={(e) => handleChange("services", e.target.value)}
                    placeholder="e.g. Dating, Companionship, Massage"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Selected plan summary */}
              <div className={`p-3 rounded-lg border text-sm ${
                selectedPlan === "vip"
                  ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-300"
                  : "bg-pink-500/10 border-pink-500/30 text-pink-300"
              }`}>
                <strong>{selectedPlan === "vip" ? "VIP Plan" : "Ordinary Plan"}</strong> — UGX {(selectedPlan === "vip" ? 40000 : 20000).toLocaleString()} / week
                {" · "}Goes live in <strong>5–10 minutes</strong>
              </div>

              <Button
                className="w-full bg-pink-600 hover:bg-pink-700 py-6 text-base"
                onClick={handleSubmitForm}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                ) : (
                  <>Continue to Payment (UGX {(PRICE).toLocaleString()}) <ChevronRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BecomeEscortPage;
