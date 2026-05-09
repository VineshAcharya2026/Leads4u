import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORIES } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  ClipboardList, 
  MapPin, 
  Phone
} from 'lucide-react';

export function LeadSubmissionPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    city: '',
    pincode: '',
    urgency: 'medium',
    budget: '',
    customerName: user?.displayName || '',
    customerPhone: '',
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please login to submit a request');
      navigate('/auth?mode=login');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        customerId: user.uid,
        status: 'open',
        createdAt: serverTimestamp(),
      });
      setStep(4);
      toast.success('Your request has been posted!');
    } catch (error: any) {
      toast.error('Failed to post request: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-500">Step {step} of 3</span>
              <span className="text-sm font-medium text-[#1a3c6e]">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#1a3c6e]" 
                initial={{ width: 0 }}
                animate={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-2">What service do you need?</h1>
              <p className="text-slate-500 mb-8">Select a category to get started.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.flatMap(c => c.subcategories).map((sc) => (
                  <button
                    key={sc.slug}
                    onClick={() => {
                      setFormData({ ...formData, category: sc.slug });
                      nextStep();
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.category === sc.slug 
                        ? 'border-[#f97316] bg-orange-50 text-[#f97316]' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-sm">{sc.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Tell us more details</h1>
              <p className="text-slate-500 mb-8">Help professionals understand your requirements better.</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the work in detail</Label>
                  <Textarea 
                    id="description" 
                    placeholder="E.g. I need interior painting for a 3BHK apartment. Required within 2 weeks."
                    className="min-h-[120px] rounded-xl"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>How urgent is this?</Label>
                    <Select 
                      value={formData.urgency} 
                      onValueChange={(val: any) => setFormData({ ...formData, urgency: val })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Flexible</SelectItem>
                        <SelectItem value="medium">Next few days</SelectItem>
                        <SelectItem value="high">Immediate / Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                    <Input 
                      id="budget" 
                      placeholder="e.g. ₹5000" 
                      className="rounded-xl"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <Button variant="ghost" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} disabled={!formData.description} className="bg-[#1a3c6e] hover:bg-[#152e55] gap-2 rounded-xl px-8">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Almost there!</h1>
              <p className="text-slate-500 mb-8">Confirm your contact information for the matched pros.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input 
                      id="name" 
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="John Doe"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="phone" 
                        type="tel"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="9876543210"
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="city" 
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Mumbai"
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input 
                      id="pincode" 
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="400001"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <Button variant="ghost" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !formData.customerPhone || !formData.city} 
                  className="bg-[#f97316] hover:bg-[#ea580c] gap-2 rounded-xl px-12 h-12 text-lg font-bold shadow-lg shadow-orange-200"
                >
                  {loading ? 'Submitting...' : 'Post Request'} <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-green-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 text-balanced">Request Posted Successfully!</h1>
              <p className="text-xl text-slate-500 mb-10 text-pretty">
                We're matching you with the best professionals. You'll receive up to 3 quotes shortly.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#1a3c6e] text-white rounded-xl h-12 px-8 font-bold"
                >
                  View My Requests
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="rounded-xl h-12 px-8 font-bold"
                >
                  Go to Homepage
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
