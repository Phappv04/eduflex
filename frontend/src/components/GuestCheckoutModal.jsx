import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { courseService } from '../services/courseService';
import { AuthContext } from '../contexts/AuthContext';

const GuestCheckoutModal = ({ course, onClose }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [checkoutData, setCheckoutData] = useState({ fullName: '', email: '' });
  const [processing, setProcessing] = useState(false);

  const handleGuestCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await courseService.guestCheckout({
        fullName: checkoutData.fullName,
        email: checkoutData.email,
        courseId: course.id
      });
      login(res.data.token);
      navigate(`/learn/${course.slug}`);
    } catch (err) {
      alert('Checkout failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Guest Checkout</h3>
        <p className="text-slate-500 mb-6">Enter your details to get instant access. No password required!</p>
        <form onSubmit={handleGuestCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input required type="text" value={checkoutData.fullName} onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input required type="email" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
          </div>
          <button disabled={processing} type="submit" className={`w-full py-3 rounded-lg font-bold text-white transition-colors mt-4 ${processing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {processing ? 'Processing...' : `Pay $${course.price} & Start Learning`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestCheckoutModal;
