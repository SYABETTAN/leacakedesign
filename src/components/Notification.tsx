import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Disparaît après 5 secondes

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm border border-green-200">
        <div className="flex items-center space-x-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
            <p className="text-sm text-gray-600">
              {message.includes('Thank you') 
                ? 'We will get back to you soon!'
                : 'Nous reviendrons vers vous rapidement !'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 