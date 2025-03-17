import React, { useState, useRef, useEffect } from 'react';
import { Cake, Mail, Instagram, Star, Clock, Upload } from 'lucide-react';
import { translations } from './translations';
import { BentoIcon } from './components/BentoIcon';
import { ClassicCakeIcon } from './components/ClassicCakeIcon';
import { TwoTierCakeIcon } from './components/TwoTierCakeIcon';
import Notification from './components/Notification';

function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const t = translations[language];
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    size: '',
    cakeFlavor: 'vanilla',
    buttercreamFlavor: '',
    description: '',
    inspirationImages: [] as File[],
    delivery: false,
    deliveryAddress: '',
    pickup: true
  });

  useEffect(() => {
    if (!formData.delivery) {
      setFormData(prev => ({ ...prev, pickup: true }));
    }
  }, [formData.delivery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      console.log('Starting form submission...');
      const formElement = formRef.current;
      if (!formElement) {
        console.error('Form element not found');
        return;
      }

      const formDataToSend = new FormData();
      
      // Add FormSubmit configuration
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_subject', 'Nouvelle commande de gâteau');
      formDataToSend.append('_template', 'table');
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'inspirationImages') {
          console.log(`Adding field ${key}:`, value);
          formDataToSend.append(key, value.toString());
        }
      });

      // Add inspiration images
      console.log('Number of images to send:', formData.inspirationImages.length);
      formData.inspirationImages.forEach((file, index) => {
        console.log(`Image ${index} details:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified
        });
        formDataToSend.append('attachment', file);
      });

      // Log all form data before sending
      console.log('Form data to be sent:');
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log('Sending request to FormSubmit...');
      const response = await fetch('https://formsubmit.co/abettanlea@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      try {
        const responseData = JSON.parse(responseText);
        console.log('Response data:', responseData);
      } catch (e) {
        console.log('Response is not JSON:', e);
      }

      // Reset form and show notification
      formElement.reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        size: '',
        cakeFlavor: 'vanilla',
        buttercreamFlavor: '',
        description: '',
        inspirationImages: [],
        delivery: false,
        deliveryAddress: '',
        pickup: true
      });
      setShowNotification(true);

    } catch (error) {
      console.error('Error sending form:', error);
      alert(t.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      if (name === 'delivery') {
        setFormData(prev => ({
          ...prev,
          [name]: checked,
          pickup: !checked
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      inspirationImages: files.slice(0, 1),
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inspirationImages: prev.inspirationImages.filter((_, i) => i !== index),
    }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {showNotification && (
        <Notification
          message={t.form.success}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <span>{language.toUpperCase()}</span>
        </button>
      </div>

      <header className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=2000"
            alt="Background cake"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Cake size={48} className="text-pink-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">{t.hero.subtitle}</p>
          <a href="#order" className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors">
            {t.hero.cta}
          </a>
        </div>
      </header>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-12">{t.portfolio.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              "/images/cake1.jpeg",
              "/images/cake2.jpeg",
              "/images/cake3.jpeg",
              "/images/cake4.jpeg",
              "/images/cake5.jpeg",
              "/images/cake6.jpeg",
              "/images/cake7.jpeg",
              "/images/cake8.jpeg",
              "/images/cake9.jpeg",
              "/images/cake10.jpeg",
              "/images/cake11.jpeg",
              "/images/cake12.jpeg"
            ].map((url, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group aspect-square md:aspect-[3/4]">
                <img
                  src={url}
                  alt={`Cake design ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-12">
            <a 
              href="https://www.instagram.com/lea_abettan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="text-sm md:text-lg">{t.portfolio.followUs}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Star className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.customDesigns}</h3>
              <p className="text-gray-600">{t.features.customDesignsDesc}</p>
            </div>
            <div className="text-center p-6">
              <Cake className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.premiumQuality}</h3>
              <p className="text-gray-600">{t.features.premiumQualityDesc}</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.onTimeDelivery}</h3>
              <p className="text-gray-600">{t.features.onTimeDeliveryDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{t.form.title}</h2>
          <p className="text-center text-lg text-gray-700 mb-12">{t.form.dairyNotice}</p>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">{t.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">{t.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">{t.form.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="date">{t.form.date}</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="delivery"
                  name="delivery"
                  checked={formData.delivery}
                  onChange={handleChange}
                  className="w-4 h-4 text-pink-600"
                />
                <label htmlFor="delivery">{t.form.delivery.option}</label>
              </div>
              
              {formData.delivery ? (
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="deliveryAddress">
                    {t.form.delivery.address}
                  </label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    required={formData.delivery}
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pickup"
                    name="pickup"
                    checked={formData.pickup}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600"
                    disabled
                  />
                  <label htmlFor="pickup">{t.form.delivery.pickup}</label>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t.form.size.label}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-pink-50">
                  <input
                    type="radio"
                    name="size"
                    value="bento"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`flex flex-col items-center ${formData.size === 'bento' ? 'text-pink-600' : 'text-gray-600'}`}>
                    <BentoIcon className="w-8 h-8 mb-2" />
                    <span>{t.form.size.bento}</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-pink-50">
                  <input
                    type="radio"
                    name="size"
                    value="regular"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`flex flex-col items-center ${formData.size === 'regular' ? 'text-pink-600' : 'text-gray-600'}`}>
                    <ClassicCakeIcon className="w-8 h-8 mb-2" />
                    <span>{t.form.size.regular}</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-pink-50">
                  <input
                    type="radio"
                    name="size"
                    value="2tiers"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`flex flex-col items-center ${formData.size === '2tiers' ? 'text-pink-600' : 'text-gray-600'}`}>
                    <TwoTierCakeIcon className="w-8 h-8 mb-2" />
                    <span>{t.form.size.twoTiers}</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="cakeFlavor">{t.form.cakeFlavor.label}</label>
                <select
                  id="cakeFlavor"
                  name="cakeFlavor"
                  value={formData.cakeFlavor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                >
                  <option value="vanilla">{t.form.cakeFlavor.vanilla}</option>
                  <option value="chocolate">{t.form.cakeFlavor.chocolate}</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="buttercreamFlavor">{t.form.buttercreamFlavor.label}</label>
                <input
                  type="text"
                  id="buttercreamFlavor"
                  name="buttercreamFlavor"
                  value={formData.buttercreamFlavor}
                  onChange={handleChange}
                  placeholder={t.form.buttercreamFlavor.placeholder}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">{t.form.description}</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t.form.inspiration.label}</label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-base text-gray-600">{t.form.inspiration.upload}</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    name="attachment"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {formData.inspirationImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.inspirationImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Inspiration ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Sending...' : 'Envoi en cours...'}
                </>
              ) : (
                t.form.submit
              )}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Cake className="w-6 h-6 mr-2" />
                <span className="text-xl font-bold">{t.hero.title}</span>
              </div>
              <p className="text-gray-400">{t.footer.about}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.followUs}</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/lea_abettan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lea Cake Design. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;