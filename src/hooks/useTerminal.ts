import { useContext } from 'react';
import { TerminalContext } from '../components/TerminalProvider';

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};