
export interface ReviewType {
  name: string;
  rating: number;
  comment: string;
}

export interface ProfileType {
  id: string;
  name: string;
  age?: number;
  height?: string;
  bodyType?: string;
  complexion?: string;
  location: string;
  rating: number;
  profileImage: string;
  images: string[];
  videos?: string[];
  shortBio: string;
  description: string;
  phone?: string;
  email?: string;
  instagram?: string;
  services?: string[];
  reviews?: ReviewType[];
}
