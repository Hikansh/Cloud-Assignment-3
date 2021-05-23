import React, { createContext, useState } from 'react';

export const authContext = createContext({ user: null });

export default function UserContext(props) {
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
}
