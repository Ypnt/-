import AccountSearch from './AccountSearch';
import AccountList from './AccountList';
import React from 'react';
export default function Account() {
  return (
    <React.Fragment>
      <AccountSearch></AccountSearch>
      <AccountList></AccountList>
    </React.Fragment>
  );
}
