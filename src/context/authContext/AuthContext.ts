import { createContext } from "react"
import { UserAuthContext } from "../../types/userAuthContext"
import { UserData } from "../../types/userData"


export const AuthContext = createContext<UserAuthContext>({
    currentUser: null,
    setCurrentUser: () => {},
    hasLoggedIn: false,
    isLoading: false,
    login: async () => Promise.resolve({} as UserData),
    logout: async () => Promise.resolve(),
    signUp: async () => Promise.resolve({} as UserData ),
  })
