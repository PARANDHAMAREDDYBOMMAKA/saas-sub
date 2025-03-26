// store/user-store.ts
import { create } from 'zustand';

interface UserState {
    user: any | null;
    subscription: any | null;
    setUser: (user: any | null) => void;
    setSubscription: (subscription: any | null) => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    subscription: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setSubscription: (subscription) => set({ subscription }),
    setLoading: (loading) => set({ isLoading: loading }),
}));