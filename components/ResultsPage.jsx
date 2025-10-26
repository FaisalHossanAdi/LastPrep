import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, TrendingUp, BookOpen, Target, Lightbulb, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ResultsPage = ({ results, onBackToHome }) => {
  const { answers, questions, totalQuestions, setTitle, timeSpent } = results;
  
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  
  const getScoreBand = (percentage) => {
    if (percentage >= 90) return { band: '9.0', label: 'Expert', color: 'text-green-600' };
    if (percentage >= 80) return { band: '8.0-8.5', label: 'Very Good', color: 'text-green-500' };
    if (percentage >= 70) return { band: '7.0-7.5', label: 'Good', color: 'text-blue-600' };
    if (percentage >= 60) return { band: '6.0-6.5', label: 'Competent', color: 'text-blue-500' };
    if (percentage >= 50) return { band: '5.0-5.5', label: 'Modest', color: 'text-yellow-600' };
    return { band: '4.0-4.5', label: 'Limited', color: 'text-orange-600' };
  };

  const scoreBand = getScoreBand(scorePercentage);

  const getPersonalizedAdvice = () => {
    const advice = [];
    
    if (scorePercentage >= 80) {
      advice.push({
        icon: <Target className="text-green-600" size={24} />,
        title: 'চমৎকার পারফরম্যান্স!',
        description: 'আপনি অসাধারণ দক্ষতা প্রদর্শন করেছেন। এই মান বজায় রাখতে নিয়মিত অনুশীলন চালিয়ে যান।',
        tips: [
          'উচ্চ-স্তরের একাডেমিক টেক্সট পড়ুন',
          'জটিল বিষয়ে রচনা লিখুন',
          'নেটিভ স্পিকারদের সাথে কথোপকথন করুন'
        ]
      });
    } else if (scorePercentage >= 60) {
      advice.push({
        icon: <TrendingUp className="text-blue-600" size={24} />,
        title: 'ভালো অগ্রগতি!',
        description: 'আপনি সঠিক পথে আছেন। কিছু ক্ষেত্রে আরও উন্নতির সুযোগ রয়েছে।',
        tips: [
          'প্রতিদিন 30 মিনিট ইংরেজি পড়ুন',
          'নতুন শব্দভান্ডার শিখুন এবং ব্যবহার করুন',
          'গ্রামার নিয়ম পুনরায় পর্যালোচনা করুন',
          'লিসেনিং অনুশীলন বাড়ান'
        ]
      });
    } else {
      advice.push({
        icon: <BookOpen className="text-orange-600" size={24} />,
        title: 'মৌলিক দক্ষতা শক্তিশালী করুন',
        description: 'আপনার ভিত্তি মজবুত করার জন্য নিবিড় অনুশীলন প্রয়োজন।',
        tips: [
          'প্রতিদিন মৌলিক গ্রামার অনুশীলন করুন',
          'সহজ টেক্সট থেকে শুরু করুন এবং ধীরে ধীরে কঠিন করুন',
          'প্রতিদিন 10টি নতুন শব্দ শিখুন',
          'ইংরেজি সাবটাইটেল সহ ভিডিও দেখুন',
          'একজন টিউটরের সাহায্য নিন'
        ]
      });
    }

    const categoryAnalysis = analyzeCategoryPerformance();
    if (categoryAnalysis.weakAreas.length > 0) {
      advice.push({
        icon: <Lightbulb className="text-purple-600" size={24} />,
        title: 'দুর্বল ক্ষেত্রগুলিতে ফোকাস করুন',
        description: 'নিম্নলিখিত ক্ষেত্রগুলিতে বিশেষ মনোযোগ দিন:',
        tips: categoryAnalysis.weakAreas.map(area => `${area} এর জন্য লক্ষ্যযুক্ত অনুশীলন করুন`)
      });
    }

    return advice;
  };

  const analyzeCategoryPerformance = () => {
    const weakAreas = [];
    
    if (setTitle.includes('Grammar') && scorePercentage < 70) {
      weakAreas.push('ব্যাকরণ এবং শব্দভান্ডার');
    }
    if (setTitle.includes('Reading') && scorePercentage < 70) {
      weakAreas.push('পড়ার বোঝাপড়া');
    }
    if (setTitle.includes('Listening') && scorePercentage < 70) {
      weakAreas.push('শোনার দক্ষতা');
    }
    if (setTitle.includes('Writing') && scorePercentage < 70) {
      weakAreas.push('লেখার দক্ষতা');
    }
    if (setTitle.includes('Speaking') && scorePercentage < 70) {
      weakAreas.push('কথা বলার দক্ষতা');
    }

    return { weakAreas };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} মিনিট ${secs} সেকেন্ড`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"
    >
      <Helmet>
        <title>{`পরীক্ষার ফলাফল - Set ${results.setNumber}`}</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2 bengali-text">পরীক্ষার ফলাফল</h1>
            <p className="text-xl opacity-90 english-text">{setTitle}</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2 english-text">
                  {correctAnswers}
                </div>
                <div className="text-gray-700 font-semibold bengali-text">সঠিক উত্তর</div>
                <CheckCircle className="mx-auto mt-4 text-green-600" size={32} />
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center">
                <div className="text-5xl font-bold text-red-600 mb-2 english-text">
                  {wrongAnswers}
                </div>
                <div className="text-gray-700 font-semibold bengali-text">ভুল উত্তর</div>
                <XCircle className="mx-auto mt-4 text-red-600" size={32} />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className={`text-5xl font-bold mb-2 english-text ${scoreBand.color}`}>
                  {scoreBand.band}
                </div>
                <div className="text-gray-700 font-semibold bengali-text">IELTS Band</div>
                <div className="text-sm text-gray-600 mt-2 english-text">{scoreBand.label}</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2 bengali-text">
                <span className="font-semibold">সামগ্রিক স্কোর</span>
                <span className="font-bold english-text">{scorePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={scorePercentage} className="h-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="font-semibold bengali-text">মোট প্রশ্ন:</span>
                <span className="ml-2 english-text">{totalQuestions}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="font-semibold bengali-text">সময় ব্যয়:</span>
                <span className="ml-2 bengali-text">{formatTime(timeSpent)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 bengali-text">
            বিস্তারিত উত্তর পর্যালোচনা
          </h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <motion.div
                  key={question.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className={`border-2 rounded-2xl p-6 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="text-white" size={20} />
                      ) : (
                        <XCircle className="text-white" size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-gray-900 mr-3 english-text">Q{index + 1}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        } bengali-text`}>
                          {isCorrect ? 'সঠিক' : 'ভুল'}
                        </span>
                      </div>
                      <p className="text-gray-900 english-text">{question.question}</p>
                      
                      <div className="space-y-2 mt-4">
                        {question.options.map((option, optIndex) => {
                          const isUserAnswer = userAnswer === optIndex;
                          const isCorrectAnswer = question.correctAnswer === optIndex;
                          
                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg ${
                                isCorrectAnswer
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : isUserAnswer
                                  ? 'bg-red-100 border-2 border-red-500'
                                  : 'bg-white border border-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="english-text">{option}</span>
                                {isCorrectAnswer && (
                                  <span className="text-green-700 font-semibold text-sm bengali-text">
                                    সঠিক উত্তর
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="text-red-700 font-semibold text-sm bengali-text">
                                    আপনার উত্তর
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Lightbulb className="text-purple-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 bengali-text">
              আপনার জন্য ব্যক্তিগত পরামর্শ
            </h2>
          </div>

          <div className="space-y-6">
            {getPersonalizedAdvice().map((advice, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4">{advice.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 bengali-text">
                      {advice.title}
                    </h3>
                    <p className="text-gray-700 mb-4 bengali-text">{advice.description}</p>
                    <ul className="space-y-2">
                      {advice.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          <span className="text-gray-700 bengali-text">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3 bengali-text">মনে রাখবেন:</h3>
            <ul className="space-y-2 bengali-text">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>নিয়মিত অনুশীলন সাফল্যের চাবিকাঠি</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>ভুল থেকে শিখুন এবং উন্নতি করুন</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>প্রতিটি দক্ষতা ক্ষেত্রে সমান মনোযোগ দিন</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>ধৈর্য ধরুন - উন্নতি সময় নেয়</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Button
            onClick={onBackToHome}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 bengali-text"
          >
            <Home className="mr-2" size={24} />
            হোম পেজে ফিরে যান
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;