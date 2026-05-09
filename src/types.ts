export type UserRole = 'admin' | 'provider' | 'customer';

/** Customer accounts: personal vs organization posting leads. */
export type CustomerAccountType = 'individual' | 'company';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  phoneNumber?: string;
  photoURL?: string;
  customerAccountType?: CustomerAccountType;
  /** When `customerAccountType` is `company`. */
  companyName?: string;
  /** When true, user is sent to complete profile after sign-in until they save. */
  needsProfileSetup?: boolean;
}

export interface ProviderProfile {
  userId: string;
  businessName: string;
  description: string;
  categories: string[];
  city: string;
  pincode: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  address: string;
}

export interface Lead {
  id: string;
  customerId: string;
  category: string;
  description: string;
  city: string;
  pincode: string;
  budget: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  createdAt: any;
  customerName: string;
  customerPhone: string;
}

export interface LeadAssignment {
  leadId: string;
  providerId: string;
  status: 'new' | 'accepted' | 'contacted' | 'converted' | 'rejected';
  assignedAt: any;
  notes?: string;
}

export interface Subscription {
  userId: string;
  planId: string;
  status: string;
  leadsUsed: number;
  leadsLimit: number;
  currentPeriodEnd: any;
}

export interface Review {
  id: string;
  providerId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: any;
}
