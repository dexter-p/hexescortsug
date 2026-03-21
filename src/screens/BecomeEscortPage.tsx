"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, CheckCircle, Shield, DollarSign, Users } from "lucide-react";

const BecomeEscortPage = () => {
  const handlePhoneCall = () => {
    window.location.href = "tel:+256707683295";
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:pl-72">
      <div className="lg:hidden h-16"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Become an Escort with Hex Escorts UG</h1>
          <p className="text-lg text-muted-foreground">
            Join Uganda's premier escort platform and connect with quality clients while maintaining your independence and privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold">Earn More</h3>
              </div>
              <p className="text-muted-foreground">
                Set your own rates and keep 100% of your earnings. No hidden fees or commissions on your bookings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">Stay Safe</h3>
              </div>
              <p className="text-muted-foreground">
                Our verification process ensures you connect with genuine clients while maintaining your privacy and security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-semibold">Quality Clients</h3>
              </div>
              <p className="text-muted-foreground">
                Access to verified, respectful clients who value professional companionship services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold">Full Control</h3>
              </div>
              <p className="text-muted-foreground">
                Manage your own schedule, choose your clients, and maintain complete control over your services.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Registration Requirements</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Age Requirement:</strong> Must be 18 years and above
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Contact Information:</strong> Valid phone number and email address
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Location:</strong> Must be based in Uganda or willing to travel within Uganda
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Professional Attitude:</strong> Commitment to providing quality, respectful service
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">How to Register</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-white mb-2">Step 1: Contact Us</h3>
                <p>Call or message us using the contact information below to express your interest.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-white mb-2">Step 2: Initial Interview</h3>
                <p>Complete a brief phone interview where we'll discuss your expectations and answer any questions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-white mb-2">Step 3: Profile Creation</h3>
                <p>Work with our team to create an attractive, professional profile that highlights your services.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-white mb-2">Step 4: Go Live</h3>
                <p>Once approved, your profile goes live and you can start connecting with clients immediately.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Contact our registration team today to begin your journey with Hex Escorts UG.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handlePhoneCall}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  size="lg"
                >
                  <Phone className="h-5 w-5" />
                  Call +256 707 683 295
                </Button>
                
                <Button 
                  className="bg-[#25D366] hover:bg-[#128C7E] flex items-center gap-2 text-white"
                  size="lg"
                  onClick={() => window.open(`whatsapp://send?phone=256707683295&text=${encodeURIComponent("Hi, I'd like to register as an escort on Hex Escorts UG")}`, '_blank')}
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p><strong>Registration Hotline:</strong> +256 707 683 295</p>
                <p><strong>WhatsApp:</strong> +256 707 683 295</p>
                <p><strong>Available:</strong> 24/7 for inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BecomeEscortPage;
