import React from 'react'  
import { useFinancialRecord } from '../../contexts/financial-record-contexts';

const FinancialRecordList = () => {
  const { records } = useFinancialRecord(); 
  
  // Debug logging
  console.log('FinancialRecordList render - records:', records);
  console.log('Records length:', records.length);
  
  return (
    <div className='table-container'>
      <h2>Financial Records</h2>
      {records.length === 0 ? (
        <p>No records found. Add your first financial record above!</p>
      ) : (
        <table className='financial-record-table'>  
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>   
            {records.map((record) => (
              <tr key={record.id || record._id}>
                <td>{record.description}</td>
                <td>${record.amount}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.category}</td>
                <td>{record.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FinancialRecordList