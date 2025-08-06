import React from 'react'
import { useUser, useClerk } from '@clerk/clerk-react';
import { useFinancialRecord } from '../../contexts/financial-record-contexts';
import FinancialRecordForm from './financial-record-form';
import FinancialRecordList from './financial-record-list';
import ExpenseChart from './expense-chart';

const Dashboard = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const { records } = useFinancialRecord();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className='dashboard-container'>
            <div className="dashboard-header">
                <h1>Welcome {user?.firstName} to the app</h1>
                <button 
                    className="signout-button" 
                    onClick={handleSignOut}
                    title="Sign Out"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Sign Out
                </button>
            </div>
            
            <div className="dashboard-content">
                <div className="left-panel">
                    <FinancialRecordForm />
                    <FinancialRecordList />
                </div>
                <div className="right-panel">
                    <ExpenseChart records={records} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;