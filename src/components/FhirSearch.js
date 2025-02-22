import React, { useState } from 'react';
import FhirService from '../services/fhirService';

const FhirSearch = () => {
  const [searchParams, setSearchParams] = useState({
    family: '',
    given: '',
    birthdate: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fhirService = new FhirService(process.env.REACT_APP_FHIR_SERVER_URL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fhirService.searchPatients(searchParams);
      setResults(response.entry || []);
    } catch (err) {
      setError('Failed to search patients. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="family">Family Name:</label>
          <input
            type="text"
            id="family"
            name="family"
            value={searchParams.family}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="given">Given Name:</label>
          <input
            type="text"
            id="given"
            name="given"
            value={searchParams.given}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">Birth Date:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={searchParams.birthdate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="results">
        {results.map(entry => (
          <div key={entry.resource.id} className="patient-card">
            <h3>{entry.resource.name?.[0]?.family}, {entry.resource.name?.[0]?.given?.join(' ')}</h3>
            <p>Birth Date: {entry.resource.birthDate}</p>
            <p>Gender: {entry.resource.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FhirSearch;