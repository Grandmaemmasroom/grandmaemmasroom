import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Building2, Home, Send, Upload, Search, ListPlus, Check } from 'lucide-react';
import TermsOfService from './pages/TermsOfService';
import { supabase } from './lib/supabase';

const locations = ['Cupertino'];

const careCategories = {
  'Housework': [
    'Light cleaning (floors, bathroom, kitchen)',
    'Bed making and linen changes',
    'General housekeeping (dusting, trash, surfaces)',
  ],
  'Meal Support': [
    'Meal preparation',
    'Kitchen cleanup',
  ],
  'Laundry & Shopping': [
    'Laundry services',
    'Grocery shopping',
    'Other errands',
  ],
  'Personal Care': [
    'Hygiene assistance (bathing, grooming, dressing)',
    'Mobility support (walking, transfers, repositioning)',
    'Toileting and incontinence care',
    'Skin care and prosthesis management',
  ],
  'Medical Support': [
    'Medication assistance',
    'Blood sugar monitoring',
    'Injection administration',
    'Other medical services',
  ],
  'Transportation & Accompaniment': [
    'Medical appointments',
    'Community services',
    'Alternative resources',
  ],
};

const qualificationOptions = [
  'IHHS Worker',
  'Licensed Professional',
  'Registered Nurse',
  'CNA Records',
  'Other Healthcare Professional'
];

const medicalEquipmentOptions = [
  'Oxygen',
  'Wheelchair accessible',
  'Hospital bed',
  'Lift equipment',
  'Walker/mobility aids',
  'Other'
];

interface FormData {
  name: string;
  email: string;
  careNeeds: string[];
  [key: string]: string | string[] | number | boolean | Date | null;
}

function App() {
  const [activeTab, setActiveTab] = React.useState<'find' | 'list'>('find');
  const [clientFormData, setClientFormData] = React.useState<FormData>({
    name: '',
    email: '',
    location: locations[0],
    careNeeds: [] as string[],
    customCareNeeds: '',
    tier: 'Gold',
  });

  const [ownerFormData, setOwnerFormData] = React.useState<FormData>({
    name: '',
    email: '',
    address: '',
    tier: 'Gold',
    details: '',
    // Room details
    roomType: 'Standard',
    rentAmount: null as number | null,
    depositAmount: null as number | null,
    roomSize: null as number | null,
    showerType: 'Private',
    furnishingType: 'Furnished',
    availableFrom: null as Date | null,
    minStay: null as number | null,
    maxStay: null as number | null,
    utilitiesIncluded: false,
    utilitiesDetails: '',
    internetIncluded: false,
    snacksProvided: false,
    parkingAvailable: false,
    parkingCost: null as number | null,
    airConditioning: false,
    petsAllowed: false,
    petRestrictions: '',
    // Medical Equipment
    medicalEquipment: [] as string[],
    otherMedicalEquipment: '',
    // Professional qualifications
    qualifications: [] as string[],
    qualificationDetails: '',
    currentlyEmployed: false,
    yearsExperience: null as number | null,
    currentEmployer: '',
    referencesAvailable: false
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent, type: 'client' | 'owner') => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (type === 'client') {
        const { error } = await supabase
          .from('client_forms')
          .insert([{
            name: clientFormData.name,
            email: clientFormData.email,
            location: clientFormData.location,
            care_needs: clientFormData.careNeeds,
            custom_care_needs: clientFormData.customCareNeeds,
            tier: clientFormData.tier
          }]);

        if (error) throw error;

        // Reset form
        setClientFormData({
          name: '',
          email: '',
          location: locations[0],
          careNeeds: [],
          customCareNeeds: '',
          tier: 'Gold'
        });
      } else {
        const { error } = await supabase
          .from('owner_forms')
          .insert([{
            name: ownerFormData.name,
            email: ownerFormData.email,
            address: ownerFormData.address,
            tier: ownerFormData.tier,
            details: ownerFormData.details,
            // Room details
            room_type: ownerFormData.roomType,
            rent_amount: ownerFormData.rentAmount,
            deposit_amount: ownerFormData.depositAmount,
            room_size: ownerFormData.roomSize,
            shower_type: ownerFormData.showerType,
            furnishing_type: ownerFormData.furnishingType,
            available_from: ownerFormData.availableFrom,
            min_stay: ownerFormData.minStay,
            max_stay: ownerFormData.maxStay,
            utilities_included: ownerFormData.utilitiesIncluded,
            utilities_details: ownerFormData.utilitiesDetails,
            internet_included: ownerFormData.internetIncluded,
            snacks_provided: ownerFormData.snacksProvided,
            parking_available: ownerFormData.parkingAvailable,
            parking_cost: ownerFormData.parkingCost,
            air_conditioning: ownerFormData.airConditioning,
            pets_allowed: ownerFormData.petsAllowed,
            pet_restrictions: ownerFormData.petRestrictions,
            // Medical Equipment
            medical_equipment: ownerFormData.medicalEquipment,
            other_medical_equipment: ownerFormData.otherMedicalEquipment,
            // Professional qualifications
            qualifications: ownerFormData.qualifications,
            qualification_details: ownerFormData.qualificationDetails,
            currently_employed: ownerFormData.currentlyEmployed,
            years_experience: ownerFormData.yearsExperience,
            current_employer: ownerFormData.currentEmployer,
            references_available: ownerFormData.referencesAvailable
          }]);

        if (error) throw error;

        // Reset form
        setOwnerFormData({
          name: '',
          email: '',
          address: '',
          tier: 'Gold',
          details: '',
          // Room details
          roomType: 'Standard',
          rentAmount: null,
          depositAmount: null,
          roomSize: null,
          showerType: 'Private',
          furnishingType: 'Furnished',
          availableFrom: null,
          minStay: null,
          maxStay: null,
          utilitiesIncluded: false,
          utilitiesDetails: '',
          internetIncluded: false,
          snacksProvided: false,
          parkingAvailable: false,
          parkingCost: null,
          airConditioning: false,
          petsAllowed: false,
          petRestrictions: '',
          // Medical Equipment
          medicalEquipment: [],
          otherMedicalEquipment: '',
          // Professional qualifications
          qualifications: [],
          qualificationDetails: '',
          currentlyEmployed: false,
          yearsExperience: null,
          currentEmployer: '',
          referencesAvailable: false
        });
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/terms"
        element={<TermsOfService />}
      />
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section
              className="hero-parallax"
            >
              <div
                className="hero-background"
                style={{
                  backgroundImage: 'url("https://i.imgur.com/X6mkxUv.jpeg")'
                }}
              />
              <div className="hero-content">
                <h1 className="text-5xl font-bold mb-4">
                  Grandma Emma's Room
                </h1>
                <p className="text-lg sm:text-xl mb-8">
                  Connecting clients with premium caregiving rooms—Gold, Diamond, and Platinum tiers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
                  <a
                    href="#find-room"
                    className="bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Home className="w-5 h-5" />
                    Find a Room
                  </a>
                  <a
                    href="#list-room"
                    onClick={() => setActiveTab('list')}
                    className="bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Building2 className="w-5 h-5" />
                    List Your Room
                  </a>
                </div>
              </div>
            </section>

            {/* Tiers Section */}
            <section className="py-20 px-8 bg-gray-50">
              <h2 className="text-4xl font-bold text-center mb-12">Explore Our Premium Tiers</h2>
              <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Gold',
                    price: '150',
                    image:
                      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                    description: 'Affordable comfort',
                  },
                  {
                    name: 'Diamond',
                    price: '250',
                    image:
                      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                    description: 'Enhanced care & space',
                  },
                  {
                    name: 'Platinum',
                    price: '550',
                    image:
                      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                    description: 'Luxury living & top-tier care',
                  },
                ].map((tier) => (
                  <div
                    key={tier.name}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                  >
                    <img
                      src={tier.image}
                      alt={`${tier.name} tier room`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-gray-600 mb-4">{tier.description}</p>
                      <p className="text-xl font-bold text-navy">
                        Starting at ${tier.price}
                        <span className="text-sm font-normal text-gray-600">/year</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-8">* Annual subscription, billed yearly</p>
            </section>

            {/* Client Form Section */}
            <main className="flex-grow bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-center mb-12">
                  <div className="inline-flex rounded-full bg-gray-100 p-1.5 shadow-sm">
                    <button
                      onClick={() => setActiveTab('find')}
                      className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === 'find'
                          ? 'bg-white text-navy shadow-sm'
                          : 'text-gray-500 hover:text-navy'
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      Find Your Care Home
                    </button>
                    <button
                      onClick={() => setActiveTab('list')}
                      className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === 'list'
                          ? 'bg-white text-navy shadow-sm'
                          : 'text-gray-500 hover:text-navy'
                      }`}
                    >
                      <ListPlus className="w-4 h-4" />
                      List Your Room
                    </button>
                  </div>
                </div>
                <div className="relative">
                  {/* Find Room Section */}
                  <section 
                    id="find-room" 
                    className={`bg-white rounded-2xl shadow-xl p-6 lg:p-8 transition-all duration-500 max-w-2xl mx-auto w-full ${
                      activeTab === 'find' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-full hidden'
                    }`}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-navy">Find Your Care Home</h2>
                    <form
                      onSubmit={(e) => handleSubmit(e, 'client')}
                      className="space-y-6"
                      aria-disabled={isSubmitting}
                    >
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                          {submitError}
                        </div>
                      )}
                      {submitSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          Form submitted successfully! We'll be in touch soon.
                        </div>
                      )}
                      <div className="grid gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                            value={clientFormData.name}
                            onChange={(e) =>
                              setClientFormData({ ...clientFormData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                            value={clientFormData.email}
                            onChange={(e) =>
                              setClientFormData({ ...clientFormData, email: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <select
                            id="location"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                            value={clientFormData.location}
                            onChange={(e) =>
                              setClientFormData({ ...clientFormData, location: e.target.value })
                            }
                          >
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="careNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                            {clientFormData.tier === 'Platinum' 
                              ? 'Describe your care needs in detail'
                              : 'What type of care do you need? (Select all that apply)'}
                          </label>
                          {clientFormData.tier !== 'Platinum' ? (
                            <div className="mt-2 space-y-4 border rounded-lg p-4">
                              {Object.entries(careCategories).map(([category, services]) => (
                                <div key={category} className="space-y-2">
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 bg-navy rounded-full mr-2" />
                                    <span className="font-medium text-gray-900">{category}</span>
                                  </div>
                                  <div className="ml-6 space-y-2">
                                    {services.map((service) => (
                                      <label key={service} className="flex items-start space-x-2 cursor-pointer">
                                        <div className="flex items-center h-5">
                                          <input
                                            type="checkbox"
                                            value={service}
                                            checked={clientFormData.careNeeds.includes(service)}
                                            onChange={(e) => {
                                              const updatedNeeds = e.target.checked
                                                ? [...clientFormData.careNeeds, service]
                                                : clientFormData.careNeeds.filter(need => need !== service);
                                              setClientFormData({ ...clientFormData, careNeeds: updatedNeeds });
                                            }}
                                            className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                          />
                                        </div>
                                        <span className="text-sm text-gray-700">{service}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-2">
                              <textarea
                                id="customCareNeeds"
                                rows={8}
                                minLength={500}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={clientFormData.customCareNeeds}
                                onChange={(e) =>
                                  setClientFormData({ ...clientFormData, customCareNeeds: e.target.value })
                                }
                                placeholder="Please describe your care needs in detail. Consider including:
- Specific services you require
- Preferred schedule and timeline
- Any medical conditions or special requirements
- Dietary preferences or restrictions
- Mobility assistance needs
- Social and recreational preferences
- Any other important considerations

Your detailed description helps us match you with the perfect care solution."
                              />
                              <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>Minimum 500 characters required</span>
                                <span>{clientFormData.customCareNeeds.length} / 500</span>
                              </div>
                            </div>
                          )}
                          {clientFormData.tier !== 'Platinum' && (
                            <p className="mt-2 text-sm text-gray-500">
                              Note: These services are covered under In-Home Supportive Services (IHSS)
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Tier
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            {['Gold', 'Diamond', 'Platinum'].map((tier) => (
                              <label
                                key={tier}
                                className="flex items-center space-x-2 cursor-pointer relative"
                              >
                                <input
                                  type="radio"
                                  name="tier"
                                  value={tier}
                                  checked={clientFormData.tier === tier}
                                  onChange={(e) => {
                                    const newTier = e.target.value;
                                    setClientFormData(prev => ({
                                      ...prev,
                                      tier: newTier,
                                      // Reset care needs when switching to/from Platinum
                                      careNeeds: newTier === 'Platinum' ? [] : prev.careNeeds,
                                      customCareNeeds: newTier !== 'Platinum' ? '' : prev.customCareNeeds
                                    }));
                                  }}
                                  className="text-navy focus:ring-navy"
                                />
                                <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                  {tier}
                                  {tier === 'Platinum' && (
                                    <span className="text-xs text-navy whitespace-nowrap sm:ml-1">(Custom Care Plan)</span>
                                  )}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-8 w-full bg-navy text-white py-3 px-6 rounded-lg hover:bg-navy/90 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Get Matched Now
                          </>
                        )}
                      </button>
                    </form>
                  </section>
                  
                  {/* List Room Section */}
                  <section 
                    id="list-room" 
                    className={`bg-white rounded-2xl shadow-xl p-6 lg:p-8 transition-all duration-500 max-w-2xl mx-auto w-full ${
                      activeTab === 'list' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-full hidden'
                    }`}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-navy">
                      List Your Room with Grandma Emmas Room
                    </h2>
                    <div>
                      <form
                        onSubmit={(e) => handleSubmit(e, 'owner')}
                        className="space-y-6"
                        aria-disabled={isSubmitting}
                      >
                        {submitError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {submitError}
                          </div>
                        )}
                        {submitSuccess && (
                          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            Form submitted successfully! We'll be in touch soon.
                          </div>
                        )}
                        
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-navy">Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                id="ownerName"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.name}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, name: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                id="ownerEmail"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.email}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, email: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Room Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              required
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                              value={ownerFormData.address}
                              onChange={(e) =>
                                setOwnerFormData({ ...ownerFormData, address: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="ownerTier" className="block text-sm font-medium text-gray-700 mb-1">
                              Tier
                            </label>
                            <select
                              id="ownerTier"
                              required
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                              value={ownerFormData.tier}
                              onChange={(e) =>
                                setOwnerFormData({ ...ownerFormData, tier: e.target.value })
                              }
                            >
                              {['Gold', 'Diamond', 'Platinum'].map((tier) => (
                                <option key={tier} value={tier}>
                                  {tier}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        {/* Room Details */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold text-navy">Room Details</h3>
                          
                          <div>
                            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                              Room Type
                            </label>
                            <select
                              id="roomType"
                              required
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                              value={ownerFormData.roomType}
                              onChange={(e) =>
                                setOwnerFormData({ ...ownerFormData, roomType: e.target.value })
                              }
                            >
                              <option value="Standard">Standard Room</option>
                              <option value="Master">Master Bedroom</option>
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                Monthly rent amount ($)
                              </label>
                              <input
                                type="number"
                                id="rentAmount"
                                required
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.rentAmount || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, rentAmount: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                Security deposit amount ($)
                              </label>
                              <input
                                type="number"
                                id="depositAmount"
                                required
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.depositAmount || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, depositAmount: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="roomSize" className="block text-sm font-medium text-gray-700 mb-1">
                                Room size (sq ft)
                              </label>
                              <input
                                type="number"
                                id="roomSize"
                                required
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.roomSize || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, roomSize: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="showerType" className="block text-sm font-medium text-gray-700 mb-1">
                                Shower Type
                              </label>
                              <select
                                id="showerType"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.showerType}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, showerType: e.target.value })
                                }
                              >
                                <option value="Private">Private</option>
                                <option value="Share">Shower share</option>
                                <option value="Beach">Shower beach</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="furnishingType" className="block text-sm font-medium text-gray-700 mb-1">
                                Furnishing
                              </label>
                              <select
                                id="furnishingType"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.furnishingType}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, furnishingType: e.target.value })
                                }
                              >
                                <option value="Furnished">Furnished</option>
                                <option value="Unfurnished">Unfurnished</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">
                                Available from (date)
                              </label>
                              <input
                                type="date"
                                id="availableFrom"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                onChange={(e) => {
                                  const date = e.target.value ? new Date(e.target.value) : null;
                                  setOwnerFormData({ ...ownerFormData, availableFrom: date });
                                }}
                              />
                            </div>
                            <div>
                              <label htmlFor="minStay" className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum stay (months)
                              </label>
                              <input
                                type="number"
                                id="minStay"
                                required
                                min="1"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.minStay || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, minStay: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                            <div>
                              <label htmlFor="maxStay" className="block text-sm font-medium text-gray-700 mb-1">
                                
                              </label>
                              <input
                                type="number"
                                id="maxStay"
                                min={ownerFormData.minStay || 1}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.maxStay || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, maxStay: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="mb-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={ownerFormData.utilitiesIncluded}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, utilitiesIncluded: e.target.checked })
                                    }
                                    className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                  />
                                  <span className="text-sm text-gray-700">Utilities included</span>
                                </label>
                              </div>
                              {ownerFormData.utilitiesIncluded && (
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Specify which utilities"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                    value={ownerFormData.utilitiesDetails}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, utilitiesDetails: e.target.value })
                                    }
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={ownerFormData.internetIncluded}
                                  onChange={(e) =>
                                    setOwnerFormData({ ...ownerFormData, internetIncluded: e.target.checked })
                                  }
                                  className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                />
                                <span className="text-sm text-gray-700">Internet included</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={ownerFormData.snacksProvided}
                                  onChange={(e) =>
                                    setOwnerFormData({ ...ownerFormData, snacksProvided: e.target.checked })
                                  }
                                  className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                />
                                <span className="text-sm text-gray-700">Snacks provided</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={ownerFormData.airConditioning}
                                  onChange={(e) =>
                                    setOwnerFormData({ ...ownerFormData, airConditioning: e.target.checked })
                                  }
                                  className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                />
                                <span className="text-sm text-gray-700">Air conditioning</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="mb-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={ownerFormData.parkingAvailable}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, parkingAvailable: e.target.checked })
                                    }
                                    className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                  />
                                  <span className="text-sm text-gray-700">Parking available</span>
                                </label>
                              </div>
                              {ownerFormData.parkingAvailable && (
                                <div>
                                  <label htmlFor="parkingCost" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cost per month ($)
                                  </label>
                                  <input
                                    type="number"
                                    id="parkingCost"
                                    min="0"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                    value={ownerFormData.parkingCost || ''}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, parkingCost: parseInt(e.target.value) || null })
                                    }
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="mb-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={ownerFormData.petsAllowed}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, petsAllowed: e.target.checked })
                                    }
                                    className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                  />
                                  <span className="text-sm text-gray-700">Pets allowed</span>
                                </label>
                              </div>
                              {ownerFormData.petsAllowed && (
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Any restrictions?"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                    value={ownerFormData.petRestrictions}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, petRestrictions: e.target.value })
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Medical Equipment */}
                          <div className="space-y-4 border-t pt-6">
                            <h3 className="text-lg font-semibold text-navy">Medical Equipment</h3>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available medical equipment (select all that apply):
                              </label>
                              <div className="space-y-2 border rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {medicalEquipmentOptions.map((equipment) => (
                                    <label key={equipment} className="flex items-start space-x-2 cursor-pointer">
                                      <div className="flex items-center h-5">
                                        <input
                                          type="checkbox"
                                          value={equipment}
                                          checked={ownerFormData.medicalEquipment.includes(equipment)}
                                          onChange={(e) => {
                                            const updatedEquipment = e.target.checked
                                              ? [...ownerFormData.medicalEquipment, equipment]
                                              : ownerFormData.medicalEquipment.filter(eq => eq !== equipment);
                                            setOwnerFormData({ ...ownerFormData, medicalEquipment: updatedEquipment });
                                          }}
                                          className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                        />
                                      </div>
                                      <span className="text-sm text-gray-700">{equipment}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              
                              {ownerFormData.medicalEquipment.includes('Other') && (
                                <div className="mt-3">
                                  <label htmlFor="otherMedicalEquipment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Please specify other medical equipment:
                                  </label>
                                  <input
                                    type="text"
                                    id="otherMedicalEquipment"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                    value={ownerFormData.otherMedicalEquipment}
                                    onChange={(e) =>
                                      setOwnerFormData({ ...ownerFormData, otherMedicalEquipment: e.target.value })
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Room Details
                            </label>
                            <textarea
                              id="details"
                              required
                              rows={4}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                              value={ownerFormData.details}
                              onChange={(e) =>
                                setOwnerFormData({ ...ownerFormData, details: e.target.value })
                              }
                              placeholder="Describe your room in detail including amenities, atmosphere, etc."
                            />
                          </div>
                        </div>
                        
                        {/* Professional Qualifications */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold text-navy">Professional Qualifications</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select one or more qualifications:
                            </label>
                            <div className="space-y-2 border rounded-lg p-4">
                              {qualificationOptions.map((qualification) => (
                                <label key={qualification} className="flex items-start space-x-2 cursor-pointer">
                                  <div className="flex items-center h-5">
                                    <input
                                      type="checkbox"
                                      value={qualification}
                                      checked={ownerFormData.qualifications.includes(qualification)}
                                      onChange={(e) => {
                                        const updatedQualifications = e.target.checked
                                          ? [...ownerFormData.qualifications, qualification]
                                          : ownerFormData.qualifications.filter(q => q !== qualification);
                                        setOwnerFormData({ ...ownerFormData, qualifications: updatedQualifications });
                                      }}
                                      className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                    />
                                  </div>
                                  <span className="text-sm text-gray-700">{qualification}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          {(ownerFormData.qualifications.includes('Licensed Professional') || 
                             ownerFormData.qualifications.includes('Other Healthcare Professional')) && (
                            <div>
                              <label htmlFor="qualificationDetails" className="block text-sm font-medium text-gray-700 mb-1">
                                Please specify:
                              </label>
                              <input
                                type="text"
                                id="qualificationDetails"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.qualificationDetails}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, qualificationDetails: e.target.value })
                                }
                              />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={ownerFormData.currentlyEmployed}
                                  onChange={(e) =>
                                    setOwnerFormData({ ...ownerFormData, currentlyEmployed: e.target.checked })
                                  }
                                  className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                />
                                <span className="text-sm text-gray-700">Currently employed in this role</span>
                              </label>
                            </div>
                            <div>
                              <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                                Years of experience in your field
                              </label>
                              <input
                                type="number"
                                id="yearsExperience"
                                required
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.yearsExperience || ''}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, yearsExperience: parseInt(e.target.value) || null })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="currentEmployer" className="block text-sm font-medium text-gray-700 mb-1">
                                Current employer (optional)
                              </label>
                              <input
                                type="text"
                                id="currentEmployer"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy"
                                value={ownerFormData.currentEmployer}
                                onChange={(e) =>
                                  setOwnerFormData({ ...ownerFormData, currentEmployer: e.target.value })
                                }
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={ownerFormData.referencesAvailable}
                                  onChange={(e) =>
                                    setOwnerFormData({ ...ownerFormData, referencesAvailable: e.target.checked })
                                  }
                                  className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy"
                                />
                                <span className="text-sm text-gray-700">Professional references available</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        {/* Photo Upload */}
                        <div className="border-t pt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo Upload (Optional)
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-navy hover:text-navy/90">
                                  <span>Upload a file</span>
                                  <input type="file" className="sr-only" accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          type="submit"
                          className="mt-8 w-full bg-navy text-white py-3 px-6 rounded-lg hover:bg-navy/90 flex items-center justify-center gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Submit Your Listing
                            </>
                          )}
                        </button>
                        <p className="text-sm text-gray-600 text-center mt-4">
                          * One-time onboarding fee: $50-$100 based on tier
                        </p>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-navy text-white py-6 px-8 mt-auto">
              <div className="max-w-7xl mx-auto">
                <div className="text-center">
                  <p className="mb-4">
                    Grandma Emmas Room - Connecting care with comfort.
                    <br />
                    Contact: <a href="mailto:info@grandmaemmasroom.com" className="underline">info@grandmaemmasroom.com</a>
                  </p>
                  <div className="flex justify-center gap-8">
                    <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    <Link to="#" className="hover:underline">Privacy Policy</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        }
      />
    </Routes>
  );
}

export default App;