import React from 'react';

const PatientCard = ({ patient }) => {
  const getName = () => {
    const name = patient.name?.[0];
    if (!name) return 'Unknown';
    
    const family = name.family || '';
    const given = name.given?.join(' ') || '';
    return `${family}, ${given}`.trim();
  };

  return (
    <div className="patient-card">
      <h3>{getName()}</h3>
      <div className="patient-details">
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>Birth Date:</strong> {patient.birthDate || 'Unknown'}</p>
        <p><strong>Gender:</strong> {patient.gender || 'Unknown'}</p>
        <p><strong>Active:</strong> {patient.active ? 'Yes' : 'No'}</p>
      </div>
      {patient.address && patient.address[0] && (
        <div className="patient-address">
          <h4>Address</h4>
          <p>{patient.address[0].line?.join(', ')}</p>
          <p>{patient.address[0].city}, {patient.address[0].state} {patient.address[0].postalCode}</p>
          <p>{patient.address[0].country}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;