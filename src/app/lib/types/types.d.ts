type UserRole = "USER" | "ADMIN";

type User = {
  id: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  photo?: string;
  password: string;
  resetPasswordToken?: string;
  verificationToken?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type MediumApiResponse = {
  title: string;
  pubDate: Date;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
};
