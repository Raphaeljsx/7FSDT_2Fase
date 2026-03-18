export interface userType {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface userCreateType {
  name: string;
  email: string;
  password: string;
}

export interface userUpdateType {
  name?: string;
  email?: string;
  password?: string;
}

export interface userLoginType {
  email: string;
  password: string;
}