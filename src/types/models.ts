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
