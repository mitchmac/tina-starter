import React, { useEffect, useState } from "react";

export const EnvVarForm = () => {
  const [clientID, setClientID] = useState(null);
  const [organization, setOrganization] = useState(null);

  const updateClientID = (e) => {
    setClientID(e.target.value);
    localStorage.setItem('tinaClientID', e.target.value);
  };

  const updateOrganization = (e) => {
    setOrganization(e.target.value);
    localStorage.setItem('tinaOrganization', e.target.value);
  };

  useEffect(() => {
    setClientID(localStorage.getItem('tinaClientID') ? localStorage.getItem('tinaClientID') : process.env.NEXT_PUBLIC_TINA_CLIENT_ID);
    setOrganization(localStorage.getItem('tinaOrganization') ? localStorage.getItem('tinaOrganization') : process.env.NEXT_PUBLIC_ORGANIZATION_NAME);
  });

  // conditionally render, need a way to hide, pre-filled environment variable?
  // check if the current variables are good?
  if (Boolean(Number(process.env.NEXT_PUBLIC_TINA_HIDE_GUIDE))) {
    return null;
  }
  else {
    return (
      <div>
        <h2>Getting Started with Tina</h2>
        <p>The Tina Cloud Starter requires environment variables to connect to your GitHub repository: </p>
        <ul>
          <li>NEXT_PUBLIC_TINA_CLIENT_ID</li>
          <li>NEXT_PUBLIC_ORGANIZATION_NAME</li>
        </ul>
        <p>Head over to <a href="https://auth.tina.io">Tina</a> and create an App to get these values:</p>
        <div>
          <label>Tina Client ID: </label>
          <input type="text" value={clientID} onChange={updateClientID} size={50}/>
        </div>

        <div>
          <label>Tina Organization: </label>
          <input type="text" value={organization} onChange={updateOrganization} size={50}/>
        </div>
        <p>Remember to add these environment variables to your deployment in the future so that your team can edit content without friction!</p>
        <p>To remove this guide, set NEXT_PUBLIC_TINA_HIDE_GUIDE=1</p>
      </div>
    )
  }

}