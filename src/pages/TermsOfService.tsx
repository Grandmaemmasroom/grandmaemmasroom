import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-navy hover:text-navy/80 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-navy/10">
          <h1 className="text-4xl font-bold text-navy mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Effective Date: February 24, 2025</p>

            <p className="mb-6">
              Welcome to Grandma Emmas Room ("we," "us," or "our"), a platform that connects clients 
              seeking caregiving rooms with private room owners offering them. By using our website 
              or services, you agree to these Terms of Service ("Terms"). If you do not agree, 
              please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">1. Our Service</h2>
            <p>
              Grandma Emmas Room is a placement service that facilitates connections between:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Clients:</strong> Individuals seeking caregiving rooms in private homes, 
                categorized into Gold, Diamond, and Platinum tiers.
              </li>
              <li>
                <strong>Owners:</strong> Private individuals listing rooms for caregiving purposes 
                under the same tiers.
              </li>
            </ul>
            <p>
              We are not a care provider, property owner, or employer. We act solely as a platform 
              to match clients with owners based on submitted information.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">2. Eligibility</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">You must be at least 18 years old to use our services.</li>
              <li>Owners must own or have legal authority to list their rooms.</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">3. Fees and Payments</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                <strong>Clients:</strong> No finder's fee is charged. Instead, clients pay an annual 
                subscription fee based on their chosen tier: $150 for Gold, $250 for Diamond, or 
                $550 for Platinum, payable via our third-party payment processor, Stripe. This fee 
                grants access to room matches for one year.
              </li>
              <li className="mb-2">
                <strong>Owners:</strong> A one-time onboarding fee ($50-$100, based on tier) is 
                required to list a room, processed via Stripe.
              </li>
              <li>
                All payments are non-refundable once a subscription is activated or a listing is 
                approved. We do not handle funds directly; Stripe manages all transactions.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">4. User Responsibilities</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                <strong>Clients:</strong> Provide accurate information about your needs and location. 
                You are responsible for vetting and arranging care with owners.
              </li>
              <li className="mb-2">
                <strong>Owners:</strong> Submit truthful room details (e.g., address, tier, amenities) 
                and maintain your listing's accuracy. You are solely responsible for the care provided 
                and compliance with local laws.
              </li>
              <li>
                All users must respect privacy and not misuse contact information obtained through 
                our platform.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">5. Our Role and Liability</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                We connect clients and owners but do not guarantee the quality, safety, or legality 
                of rooms or care services.
              </li>
              <li className="mb-2">
                We are not liable for disputes, damages, or issues arising between clients and owners, 
                including care quality, payment disputes beyond our fees, or property conditions.
              </li>
              <li>
                All arrangements (e.g., care terms, pricing beyond our fees) are between clients and 
                owners directly.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">6. Content and Conduct</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                You may not submit false, offensive, or illegal content (e.g., fake listings, 
                abusive language).
              </li>
              <li>We reserve the right to remove listings or deny service at our discretion.</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">7. Payment Processing</h2>
            <p>
              Payments are handled by Stripe, a third-party service. By paying, you agree to 
              Stripe's terms (available at stripe.com). We are not responsible for payment errors 
              or disputes managed by Stripe.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">8. Termination</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                We may suspend or terminate your access if you violate these Terms or misuse 
                the platform.
              </li>
              <li>
                You may stop using our services at any time, but annual client fees remain 
                non-refundable.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use after changes means you accept 
              the new terms.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">10. Contact Us</h2>
            <p>Questions or concerns? Email us at info@grandmaemmasroom.com.</p>

            <h2 className="text-2xl font-bold text-navy mt-8 mb-4">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Washington State, without regard to conflict 
              of law principles.
            </p>

            <p className="mt-12 text-lg font-semibold text-center text-navy">
              Thank you for choosing Grandma Emmas Room. Let's connect care with comfort!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}