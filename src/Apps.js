import React from 'react';
import FhirSearch from './components/FhirSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SCDHHS HealthLake FHIR Query</h1>
      </header>
      <main>
        <FhirSearch />
      </main>
      <footer>
        <p>© 2025 SCDHHS HealthLake</p>
      </footer>
    </div>
  );
}

export default App;