import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { questionSets } from '@/data/questionSets';

const HomePage = ({ onStartTest }) => {
  const handleRandomTestStart = () => {
    const randomIndex = Math.floor(Math.random() * questionSets.length);
    const randomSetId = questionSets[randomIndex].id;
    onStartTest(randomSetId);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"
    >
      <Helmet>
        <title>IELTS Assessment Test - আইইএলটিএস মূল্যায়ন পরীক্ষা</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bengali-text">
            আইইএলটিএস মূল্যায়ন পরীক্ষা
          </h1>
          <p className="text-xl text-gray-600 bengali-text">
            আপনার দক্ষতা পরীক্ষা করুন এবং উন্নতির পথ খুঁজে নিন
          </p>
        </motion.div>
        
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-12"
        >
             <Button 
              size="lg"
              className="px-12 py-8 text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bengali-text"
              onClick={handleRandomTestStart}
            >
              এখুনি পরীক্ষা শুরু করুন
            </Button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 bengali-text">10টি সেট</h3>
            <p className="text-gray-600 text-sm bengali-text">প্রতিটি সেটে ৩০টি প্রশ্ন</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 bengali-text">10 মিনিট</h3>
            <p className="text-gray-600 text-sm bengali-text">প্রতিটি সেটের জন্য সময়</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Award className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 bengali-text">তাৎক্ষণিক ফলাফল</h3>
            <p className="text-gray-600 text-sm bengali-text">পরীক্ষা শেষে বিস্তারিত বিশ্লেষণ</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 bengali-text">ব্যক্তিগত পরামর্শ</h3>
            <p className="text-gray-600 text-sm bengali-text">উন্নতির জন্য বিশেষজ্ঞ পরামর্শ</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4 bengali-text">আপনার IELTS শিক্ষক - Band 9.0</h2>
          <p className="text-lg mb-4 bengali-text">
            আমি আপনার ব্যক্তিগত IELTS পরামর্শদাতা। প্রতিটি পরীক্ষার পরে, আমি আপনাকে বিস্তারিত বিশ্লেষণ এবং উন্নতির জন্য কাস্টমাইজড পরামর্শ প্রদান করব।
          </p>
          <ul className="space-y-2 bengali-text">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>আপনার শক্তি এবং দুর্বলতা চিহ্নিত করুন</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>লক্ষ্যযুক্ত অনুশীলন কৌশল পান</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Band 9.0 অর্জনের জন্য বিশেষজ্ঞ টিপস</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;