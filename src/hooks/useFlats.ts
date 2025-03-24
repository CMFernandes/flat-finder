import { useContext } from 'react';
import { FlatsContext } from '../context/flatsContext/FlatsContext';

const useFlats = () => {
    const context = useContext(FlatsContext);

    if (!context) {
        throw new Error('useFlats must be used within a FlatsProvider');
    }

    return context;
};

export default useFlats;