import React, { useState } from "react";

export default function SchemePage() {
    const [schemes, setSchemes] = useState([]);

    async function fetchSchemesForUser(userId) {
        const response = await fetch(`/api/users/${userId}/schemes`);
        const data = await response.json();
        setSchemes(data);
      }

      React.useEffect(() => {
        fetchSchemesForUser(userId);
      }, [userId]);
      
      return (
        <div>
          {schemes.map(scheme => (
            <div key={scheme.id}>
              <h2>{scheme.name}</h2>
              <p>{scheme.description}</p>
            </div>
          ))}
        </div>
      );
        
      
}
