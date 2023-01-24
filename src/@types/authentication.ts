
// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

//export type AuthUser = null | Record<string, any>;

export type AuthUser = null | Record<string, any>;


export type IAuthUser = {
  id: string;
  displayName: string;
  role: string;
  photoURL: string;
  email: string;
  phoneNumber: string;
}


export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};


export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, PhoneNumber:string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => void;
  resetPassword: (
     token: string, 
     password: string,
     confirmPassword: string,
     email: string,
  ) => void;
  updateProfile: VoidFunction;
  completeProfile: (data: any) => void;
};



export enum AppRole {
  Client= "client",
  Admin= "admin",
  Lawyer= "lawyer"
}

export type IAppRole = "Client"|"Admin"|"Lawyer";
