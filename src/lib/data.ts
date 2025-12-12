// Mock data until a database is connected

export type FormState = {
    message: string;
    errors?: Record<string, string[] | undefined>;
    success: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  aiHint: string;
  date: string;
  content: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  social: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
  aiHint: string;
  order: number;
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
  aiHint: string;
  order: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
  ipAddress?: string | null;
};

export type DemoRequest = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  requestedAt: Date;
  ipAddress?: string | null;
};
