
import {useUser} from "@clerk/clerk-react"
import React, { createContext, useContext, useState, useEffect } from 'react';

export const FinancialRecordContext = createContext(undefined);

export const FinancialRecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
  
  const fetchRecords = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`http://localhost:3001/financial-records?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched records:', data);
        setRecords(data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const addRecord = async (record) => {
    try {
      const response = await fetch("http://localhost:3001/financial-records", {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
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