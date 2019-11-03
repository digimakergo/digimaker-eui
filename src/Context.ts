import React from 'react';

export const ContentContext = React.createContext({
  data: '' as any,
  update:(data:any)=>{}
});
