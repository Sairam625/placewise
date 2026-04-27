/**
 * PlaceWise API Service
 * 
 * This file contains stub functions for the frontend to call.
 * Once the MongoDB credentials and backend are set up, you can replace
 * the mock data returns with actual fetch() or axios() calls.
 */

// Replace this with your actual backend URL once deployed
const BASE_URL = 'http://localhost:5000/api'; 

/**
 * Authentication
 */
export const authService = {
  login: async (email, password) => {
    console.log(`Mocking login for ${email}`);
    // Example of future actual call:
    // const response = await fetch(`${BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // return response.json();
    return { success: true, token: 'mock-jwt-token', user: { name: 'Rohan', email } };
  },

  signup: async (name, email, password) => {
    console.log(`Mocking signup for ${name}`);
    return { success: true, token: 'mock-jwt-token' };
  }
};

/**
 * Companies Data
 */
export const companyService = {
  getCompanies: async () => {
    console.log('Mocking fetch companies...');
    return [
      { id: 1, name: 'Infosys', type: 'service', openJobs: 48 },
      { id: 2, name: 'Google', type: 'product', openJobs: 52 },
    ];
  },
  
  getCompanyPrep: async (companyId) => {
    console.log(`Mocking fetch prep data for company ${companyId}`);
    return { rounds: 3, stages: [] };
  }
};

/**
 * Assessments and Reports
 */
export const assessmentService = {
  getReport: async (userId, quizId) => {
    console.log(`Mocking fetch report for user ${userId}, quiz ${quizId}`);
    return {
      score: 16,
      total: 20,
      timeTaken: '12m 45s',
      accuracy: 80,
      breakdown: []
    };
  }
};

/**
 * Admin Data
 */
export const adminService = {
  getDashboardStats: async () => {
    console.log('Mocking fetch admin stats...');
    return {
      totalUsers: 14592,
      activeCompanies: 128,
      questionBank: 8450,
      systemHealth: 99.9
    };
  }
};
