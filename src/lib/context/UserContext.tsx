import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase";

// Define context type
type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
  fetchUserProfile: () => Promise<void>;
  islogged: boolean;
  setIsLogged: (logged: boolean) => void;
};

// Create context with initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState('');
  const [islogged,setIsLogged] = useState(false)
  const fetchUserProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserName(profile.name);
      }
    }
  };

  useEffect(() => {
    
    fetchUserProfile();
  }, [islogged]);

  const value = {
    userName,
    setUserName,
    fetchUserProfile,
    islogged,
    setIsLogged
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;