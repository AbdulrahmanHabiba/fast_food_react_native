import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand'

type AuthState = {
    isAuthenticated: false ,
    user: null,
    isLoading: true ,

    setIsAuthenticated: (isAuthenticated: boolean) => void,
    setUser: (user: any) => void,
    setIsLoading: (isLoading: boolean) => void,
 
    fetchAuthenticatedUser: ()=> Promise<void> ;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({isAuthenticated :value}),
    setUser: (user) => set({user}),
    setIsLoading: (value) => set({isLoading: value}),
    fetchAuthenticatedUser: async () => {
        set({isLoading : true})
        try {
            const user = await getCurrentUser()
            if (user) set({isAuthenticated :true , user :user as User})
            else set({isAuthenticated :false , user :null})
        } catch (error) {
            console.log('FetchAuthenticatedUser Error ' ,error )
            set({isAuthenticated :false , user :null})
        }
        finally {
            set({isLoading : false})
        }
    }
  }))

export default useAuthStore ;