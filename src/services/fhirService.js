import axios from 'axios';

class FhirService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      }
    });
  }

  async searchPatients(params) {
    try {
      const response = await this.client.get('/Patient', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching patients:', error);
      throw error;
    }
  }

  async getPatient(id) {
    try {
      const response = await this.client.get(`/Patient/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting patient:', error);
      throw error;
    }
  }

  async searchResources(resourceType, params) {
    try {
      const response = await this.client.get(`/${resourceType}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error searching ${resourceType}:`, error);
      throw error;
    }
  }
}

export default FhirService;