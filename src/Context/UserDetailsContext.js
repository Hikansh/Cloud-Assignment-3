import React, { createContext, useState } from 'react';

export const userDetailsContext = createContext({ userDetails: null });

export default function UserDetailsContext(props) {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {props.children}
    </userDetailsContext.Provider>
  );
}
