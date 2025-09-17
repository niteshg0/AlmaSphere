import { useState } from 'react';
// import { toast } from 'react-toastify';



export const useRazorpayPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById('razorpay-script');
      
      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (paymentData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      // console.log("response", response, "data", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      return data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donation/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment verification failed');
      }

      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  const processPayment = async (options) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      const paymentData= {
        rollNumber: options.rollNumber,
        amount: options.amount,
        donationType: options.donationType,
        message: options.message,
      }

      // Create order
      const orderData = await createOrder(paymentData);

      // Razorpay options
      const razorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Alumni Association',
        description: `${options.description || 'Donation'}`,
        order_id: orderData?.orderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verificationResult = await verifyPayment(response);
            
            if (verificationResult.success) {
              // toast.success('Payment successful! Your subscription is now active.');
              options.onSuccess?.(verificationResult);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            // toast.error(error.message || 'Payment verification failed');
            options.onError?.(error);
          }
        },
        prefill: {
          name: 'User', // You can get this from user session
          email: 'user@example.com', // You can get this from user session
          contact: '9999999999', // You can get this from user session
        },
        theme: {
          color: '#FF6600',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            // toast.info('Payment cancelled');
          },
        },
      };

      // Create Razorpay instance and open
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

    } catch (error) {
      console.error('Payment processing error:', error);
      // toast.error(error.message || 'Payment processing failed');
      options.onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
  };
};
