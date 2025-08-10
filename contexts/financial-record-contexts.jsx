
import {useUser} from "@clerk/clerk-react"
import React, { createContext, useContext, useState, useEffect } from 'react';

export const FinancialRecordContext = createContext(undefined);

// Get API URL from environment variable or use localhost for development
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

 console.log('Environment variable VITE_API_URL:', import.meta.env.VITE_API_URL); // Debug log
console.log('API_BASE_URL after processing:', API_BASE_URL); // Debug log

export const FinancialRecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
  
  const fetchRecords = async () => {
    if (!user) {
      console.log('No user found, skipping fetch');
      return;
    }
    
    console.log('Fetching records for user:', user.id);
    console.log('API URL:', `${API_BASE_URL}/financial-records?userId=${user.id}`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/financial-records?userId=${user.id}`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched records:', data);
        setRecords(data);
      } else {
        console.error('Response not ok:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    console.log('User changed:', user?.id);
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const addRecord = async (record) => {
    console.log('Adding record:', record);
    console.log('API URL:', `${API_BASE_URL}/financial-records`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/financial-records`, {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Add record response status:', response.status);
      console.log('Add record response ok:', response.ok);

      if (response.ok) {
        const newRecord = await response.json();
        console.log('New record added:', newRecord);
        
        // Update the records state with the new record
        setRecords((prev) => {
          const updatedRecords = [...prev, newRecord];
          console.log('Updated records state:', updatedRecords);
          return updatedRecords;
        });
        
        // Also refresh the records from the server to ensure consistency
        setTimeout(() => {
          fetchRecords();
        }, 100);
      } else {
        console.error('Add record failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (err) {
      console.error('Error adding record:', err);
    }
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord, fetchRecords }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => {
  const context = useContext(FinancialRecordContext);
  if (!context) {
    throw new Error("useFinancialRecord must be used within a FinancialRecordContextProvider");
  }
  return context;
};