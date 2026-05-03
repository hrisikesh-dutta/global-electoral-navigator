import React, { createContext, useContext, useState } from 'react';

const JourneyContext = createContext();

export const useJourney = () => useContext(JourneyContext);

export const JourneyProvider = ({ children }) => {
  // state: 'ONBOARDING', 'DASHBOARD'
  const [appState, setAppState] = useState('ONBOARDING');
  const [profile, setProfile] = useState({
    userName: '',
    country: '',
    state: '',
    language: 'English',
  });

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    setAppState('DASHBOARD');
  };

  return (
    <JourneyContext.Provider value={{ appState, setAppState, profile, updateProfile, completeOnboarding }}>
      {children}
    </JourneyContext.Provider>
  );
};
