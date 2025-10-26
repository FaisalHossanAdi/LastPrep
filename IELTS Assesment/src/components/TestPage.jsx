import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Flag, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { questionSets } from '@/data/questionSets';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const TestPage = ({ setNumber, onComplete, onBack }) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  const currentSet = questionSets.find(set => set.id === setNumber);
  const questions = currentSet?.questions || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answerIndex) => {
    if (answers[questionId] !== undefined) {
      toast({
        title: 'উত্তর পরিবর্তন করা যাবে না',
        description: 'একবার উত্তর দিলে তা লক হয়ে যায়।',
        variant: 'destructive',
      });
      return;
    }
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (answers[questions[currentQuestion].id] === undefined) {
      toast({
        title: 'অনুগ্রহ করে উত্তর দিন',
        description: 'পরবর্তী প্রশ্নে যাওয়ার আগে আপনাকে বর্তমান প্রশ্নের উত্তর দিতে হবে।',
        variant: 'destructive',
      });
      return;
    }
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const results = {
      setNumber,
      setTitle: currentSet.title,
      answers,
      questions,
      totalQuestions,
      timeSpent: 600 - timeLeft
    };
    onComplete(results);
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;
  const isCurrentQuestionAnswered = answers[questions[currentQuestion]?.id] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"
    >
      <Helmet>
        <title>{`পরীক্ষা চলছে - Set ${setNumber}`}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bengali-text">সেট {setNumber}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Clock size={20} className="mr-2" />
                  <span className="font-bold text-lg english-text">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm bengali-text">
                <span>প্রশ্ন {currentQuestion + 1} / {totalQuestions}</span>
                <span>উত্তর দেওয়া হয়েছে: {answeredCount} / {totalQuestions}</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/30" />
            </div>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex items-start mb-6">
                    <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-full mr-4 english-text">
                      Q{currentQuestion + 1}
                    </span>
                    <p className="text-lg text-gray-900 flex-1 english-text leading-relaxed">
                      {questions[currentQuestion]?.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {questions[currentQuestion]?.options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={!isCurrentQuestionAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isCurrentQuestionAnswered ? { scale: 0.98 } : {}}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          answers[questions[currentQuestion].id] === index
                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                            : 'border-gray-200'
                        } ${
                          isCurrentQuestionAnswered
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            answers[questions[currentQuestion].id] === index
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`}>
                            {answers[questions[currentQuestion].id] === index && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-gray-900 english-text flex-1">{option}</span>
                          {isCurrentQuestionAnswered && answers[questions[currentQuestion].id] === index && (
                            <Lock className="text-indigo-500" size={16} />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="bengali-text"
              >
                <ChevronLeft className="mr-2" size={20} />
                পূর্ববর্তী
              </Button>

              <div className="flex space-x-3">
                {currentQuestion === totalQuestions - 1 ? (
                  <Button
                    onClick={() => {
                        if (!isCurrentQuestionAnswered) {
                            toast({
                                title: 'অনুগ্রহ করে উত্তর দিন',
                                description: 'জমা দেওয়ার আগে আপনাকে শেষ প্রশ্নের উত্তর দিতে হবে।',
                                variant: 'destructive',
                            });
                        } else {
                            setShowSubmitDialog(true)
                        }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white bengali-text"
                  >
                    <Flag className="mr-2" size={20} />
                    জমা দিন
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!isCurrentQuestionAnswered}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white bengali-text"
                  >
                    পরবর্তী
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="bengali-text">পরীক্ষা জমা দিতে চান?</AlertDialogTitle>
            <AlertDialogDescription className="bengali-text">
              আপনি {answeredCount} টি প্রশ্নের উত্তর দিয়েছেন {totalQuestions} টির মধ্যে। 
              {answeredCount < totalQuestions && ' কিছু প্রশ্নের উত্তর দেওয়া হয়নি।'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bengali-text">বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 bengali-text">
              জমা দিন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default TestPage;