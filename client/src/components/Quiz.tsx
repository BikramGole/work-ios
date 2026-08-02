import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
}

export default function Quiz({ question, options }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (id: string) => {
    if (!answered) {
      setSelected(id);
      setAnswered(true);
    }
  };

  const selectedOption = options.find(opt => opt.id === selected);
  const isCorrect = selectedOption?.correct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded p-6"
    >
      <h4 className="font-semibold mb-4">{question}</h4>
      <div className="space-y-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded border-2 text-left transition-all duration-200 ${
              selected === option.id
                ? option.correct
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-red-500 bg-red-500/10'
                : 'border-border hover:border-primary/50 bg-secondary'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{option.text}</span>
              {selected === option.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {option.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={1.5} />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" strokeWidth={1.5} />
                  )}
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      {answered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 p-3 rounded text-sm ${
            isCorrect
              ? 'bg-green-500/10 text-green-300 border border-green-500/30'
              : 'bg-red-500/10 text-red-300 border border-red-500/30'
          }`}
        >
          {isCorrect ? '✓ Correct!' : '✗ Try again!'}
        </motion.div>
      )}
    </motion.div>
  );
}
