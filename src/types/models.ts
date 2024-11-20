export type UUID = string;

export interface Session {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  user?: {
    id?: UUID;
    username?: string;
    email?: string;
    role?: string;
    email_confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata?: {
      provider?: string;
      providers?: string[];
    };
    user_metadata?: {
      email?: string;
      email_verified?: boolean;
      phone_verified?: boolean;
      sub?: UUID;
    };
  };
}

export interface Link {
  id?: string;
  original_url: string;
  short_url: string;
  user_id: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Click {
  id: string;
  link_id: string;
  ip_address?: string | null;
  created_at: string;
}
