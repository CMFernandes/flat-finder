import { useContext } from 'react';

import { AuthContext } from '../context/authContext/AuthContext';

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within a UseAuthContextProvider');
    }

    return context;
};

export default useAuthContext;