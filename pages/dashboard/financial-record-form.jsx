import{useState} from 'react'
import {useUser} from "@clerk/clerk-react"
import { useFinancialRecord } from '../../contexts/financial-record-contexts';

const FinancialRecordForm = () => {
  const[description, setDescription] = useState('');
  const[amount, setAmount] = useState('');
  const[category, setCategory] = useState('laundry');
  const[paymentMethod, setPaymentMethod] = useState('cash');
  const[date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const {user} = useUser();
  const {addRecord}=useFinancialRecord();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      console.error("User not logged in.");
      return; // Stop the function execution if user is null
    }
    const financialRecord = {
      description,
      amount: parseFloat(amount),
      date: new Date(date), 
      category,
      paymentMethod,
      userId: user.id 
    };

    // Here you would typically send financialRecord to your backend API
    console.log('Financial Record Submitted:', financialRecord);
    
    // Reset form fields after submission
    addRecord(financialRecord);
    setDescription('');
    setAmount('');
    setCategory('laundry');
    setPaymentMethod('cash');
    setDate(new Date().toISOString().split('T')[0]);
  }
  
  return (
    
    <form onSubmit={handleSubmit}>
      <div className="ListContainer">
      <label>Description  </label>
        <input type="text" required className='input' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      </div>
      <div className="ListContainer">
        <label>Amount  </label>
        <input type="number" required className='input' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
      </div>
      <div className="ListContainer">
        <label>Date  </label>
        <input type="date" required className='input' value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="ListContainer">
        <label>Category  </label>
        <select required className='input' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="laundry">Laundry</option>
          <option value="dryclean">Dry Clean</option>
          <option value="Iron">Iron</option>
          <option value="investment">Wash</option>
        </select>
        </div>
        <div className="ListContainer">
          <label>Payment Method  </label>
          <select required className='input' value={paymentMethod} onChange={(e)=>{setPaymentMethod(e.target.value)}}>
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="online">Online Payment</option>
            </select>
        </div>
        <div className="ListContainer">
          <button type="submit" className='submitButton'>Add List  </button>
          </div>
    </form>
  )
}

export default FinancialRecordForm