import { createContext } from 'react';

interface LoadingContextProps {
   loading: boolean;
   toggleLoading: (status: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProps>({
   loading: true,
   toggleLoading: () => { },
});
