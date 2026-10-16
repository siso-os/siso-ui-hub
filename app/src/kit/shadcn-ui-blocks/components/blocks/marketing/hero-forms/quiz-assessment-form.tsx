import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import { Checkbox } from '../../../ui/checkbox';
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  TrophyIcon,
  RotateCwIcon,
  HelpCircleIcon,
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple' | 'text';
  options?: {
    id: string;
    text: string;
    isCorrect?: boolean;
  }[];
  answerExplanation?: string;
}

export default function HeroFormQuizAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft] = useState(300); // 5 minutes in seconds
  const [showExplanation, setShowExplanation] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: 'Which of the following is a core principle of user-centered design?',
      type: 'single',
      options: [
        {
          id: 'a',
          text: 'Focusing on aesthetics above all else',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Prioritizing technical complexity',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'Involving users throughout the design process',
          isCorrect: true,
        },
        { id: 'd', text: 'Minimizing development costs', isCorrect: false },
      ],
      answerExplanation:
        'User-centered design requires involving users throughout the entire design process to ensure the final product meets their needs and expectations.',
    },
    {
      id: 2,
      text: 'Which of these tools would you use for collaborative wireframing?',
      type: 'multiple',
      options: [
        { id: 'a', text: 'Figma', isCorrect: true },
        { id: 'b', text: 'Microsoft Word', isCorrect: false },
        { id: 'c', text: 'Miro', isCorrect: true },
        { id: 'd', text: 'Adobe Photoshop', isCorrect: false },
      ],
      answerExplanation:
        'Both Figma and Miro offer robust collaboration features that make them excellent choices for team wireframing sessions.',
    },
    {
      id: 3,
      text: 'What is the primary goal of a usability test?',
      type: 'single',
      options: [
        {
          id: 'a',
          text: 'To showcase the design to stakeholders',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'To identify and fix user experience issues',
          isCorrect: true,
        },
        { id: 'c', text: 'To finalize the visual design', isCorrect: false },
        {
          id: 'd',
          text: 'To compare with competitor products',
          isCorrect: false,
        },
      ],
      answerExplanation:
        'Usability testing aims to identify issues in the user experience by observing real users interacting with the product, allowing designers to make improvements.',
    },
    {
      id: 4,
      text: 'Which accessibility guideline is crucial for color usage in UI design?',
      type: 'single',
      options: [
        {
          id: 'a',
          text: 'Always use bright colors to attract attention',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Ensure sufficient color contrast for text readability',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Use as many colors as possible to differentiate elements',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Avoid using color entirely to prevent issues',
          isCorrect: false,
        },
      ],
      answerExplanation:
        'Sufficient color contrast between text and background is essential for readability, particularly for users with visual impairments or color blindness.',
    },
    {
      id: 5,
      text: 'Explain how you would approach designing a new feature for a mobile app. What steps would you take from concept to implementation?',
      type: 'text',
      answerExplanation:
        'A strong approach would include user research, defining requirements, sketching and wireframing, prototyping, usability testing, iteration based on feedback, and collaboration with developers during implementation.',
    },
  ];

  // Calculate progress percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Format time remaining (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle selection for single choice questions
  const handleSingleChoice = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion]!.id]: value,
    });
  };

  // Handle selection for multiple choice questions
  const handleMultipleChoice = (value: string) => {
    const currentAnswers =
      (answers[questions[currentQuestion]!.id] as string[]) || [];
    let newAnswers: string[];

    if (currentAnswers.includes(value)) {
      newAnswers = currentAnswers.filter((item) => item !== value);
    } else {
      newAnswers = [...currentAnswers, value];
    }

    setAnswers({
      ...answers,
      [questions[currentQuestion]!.id]: newAnswers,
    });
  };

  // Handle text input for open-ended questions
  const handleTextInput = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion]!.id]: value,
    });
  };

  // Calculate score for results
  const calculateScore = () => {
    let score = 0;
    let totalPossible = 0;

    questions.forEach((question) => {
      if (question.type === 'text') return; // Skip text questions for scoring

      const userAnswer = answers[question.id];

      if (question.type === 'single' && question.options) {
        totalPossible++;
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (correctOption && userAnswer === correctOption.id) {
          score++;
        }
      }

      if (question.type === 'multiple' && question.options) {
        totalPossible++;
        const correctOptions = question.options
          .filter((option) => option.isCorrect)
          .map((option) => option.id);

        const userAnswers = (userAnswer as string[]) || [];
        const allCorrect = correctOptions.every((id) =>
          userAnswers.includes(id)
        );
        const noIncorrect = userAnswers.every(
          (id) =>
            question.options?.find((option) => option.id === id)?.isCorrect
        );

        if (
          allCorrect &&
          noIncorrect &&
          userAnswers.length === correctOptions.length
        ) {
          score++;
        }
      }
    });

    return { score, totalPossible };
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const currentQuestionData = questions[currentQuestion]!;
  const hasAnswered =
    answers[currentQuestionData.id] !== undefined &&
    (currentQuestionData.type !== 'multiple' ||
      (answers[currentQuestionData.id] as string[])?.length > 0);

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="bg-grid-slate-100 dark:bg-grid-slate-800/10 absolute inset-0 bg-[size:40px_40px] opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-4xl">
            {!showResults ? (
              <Card className="border shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      UX Design Assessment
                    </div>
                    <div className="text-muted-foreground flex items-center text-sm">
                      <ClockIcon className="mr-1 h-4 w-4" />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold">
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>

                  <CardDescription>
                    <Progress value={progress} className="mt-2 h-2" />
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-xl font-medium">
                        {currentQuestionData.text}
                      </h3>

                      {/* Single Choice Question */}
                      {currentQuestionData.type === 'single' &&
                        currentQuestionData.options && (
                          <RadioGroup
                            value={
                              (answers[currentQuestionData.id] as string) || ''
                            }
                            onValueChange={handleSingleChoice}
                            className="space-y-3"
                          >
                            {currentQuestionData.options.map((option) => (
                              <div
                                key={option.id}
                                className="hover:bg-muted/50 flex items-center space-x-2 rounded-lg border p-4 transition-colors"
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={`option-${option.id}`}
                                />
                                <Label
                                  htmlFor={`option-${option.id}`}
                                  className="flex-grow cursor-pointer"
                                >
                                  {option.text}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}

                      {/* Multiple Choice Question */}
                      {currentQuestionData.type === 'multiple' &&
                        currentQuestionData.options && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground mb-2 text-sm">
                              Select all that apply
                            </p>
                            {currentQuestionData.options.map((option) => (
                              <div
                                key={option.id}
                                className="hover:bg-muted/50 flex items-center space-x-2 rounded-lg border p-4 transition-colors"
                                onClick={() => handleMultipleChoice(option.id)}
                              >
                                <Checkbox
                                  id={`option-${option.id}`}
                                  checked={(
                                    (answers[
                                      currentQuestionData.id
                                    ] as string[]) || []
                                  ).includes(option.id)}
                                  onCheckedChange={() =>
                                    handleMultipleChoice(option.id)
                                  }
                                />
                                <Label
                                  htmlFor={`option-${option.id}`}
                                  className="flex-grow cursor-pointer"
                                >
                                  {option.text}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Text Question */}
                      {currentQuestionData.type === 'text' && (
                        <div className="space-y-2">
                          <Label htmlFor="text-answer" className="sr-only">
                            Your answer
                          </Label>
                          <textarea
                            id="text-answer"
                            rows={6}
                            placeholder="Type your answer here..."
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            value={
                              (answers[currentQuestionData.id] as string) || ''
                            }
                            onChange={(e) => handleTextInput(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Explanation section (shown after answering) */}
                    {showExplanation &&
                      currentQuestionData.answerExplanation && (
                        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                          <h4 className="mb-1 font-medium">Explanation:</h4>
                          <p className="text-muted-foreground text-sm">
                            {currentQuestionData.answerExplanation}
                          </p>
                        </div>
                      )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-6">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>

                    {!showExplanation &&
                      currentQuestionData.answerExplanation && (
                        <Button
                          variant="outline"
                          onClick={() => setShowExplanation(true)}
                          disabled={!hasAnswered}
                        >
                          <HelpCircleIcon className="mr-1 h-4 w-4" />
                          Show Explanation
                        </Button>
                      )}
                  </div>

                  <Button onClick={handleNextQuestion} disabled={!hasAnswered}>
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Submit Assessment'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border shadow-lg">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <TrophyIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>

                  <CardTitle className="text-2xl font-bold">
                    Assessment Complete!
                  </CardTitle>

                  <CardDescription className="text-lg">
                    {(() => {
                      const { score, totalPossible } = calculateScore();
                      const percentage = (score / totalPossible) * 100;

                      let message = 'Thank you for completing the assessment.';
                      if (percentage >= 80) {
                        message +=
                          ' Great job! You demonstrated excellent knowledge.';
                      } else if (percentage >= 60) {
                        message +=
                          ' Good work! You have a solid understanding of the concepts.';
                      } else {
                        message +=
                          ' Thanks for your effort. Consider reviewing the material.';
                      }

                      return message;
                    })()}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="mb-4 font-medium">Your Results</h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Score
                          </span>
                          <div className="text-lg font-semibold">
                            {(() => {
                              const { score, totalPossible } = calculateScore();
                              return `${score}/${totalPossible}`;
                            })()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Percentage
                            </span>
                            <div className="text-lg font-semibold">
                              {(() => {
                                const { score, totalPossible } =
                                  calculateScore();
                                return `${Math.round(
                                  (score / totalPossible) * 100
                                )}%`;
                              })()}
                            </div>
                          </div>

                          <Progress
                            value={(() => {
                              const { score, totalPossible } = calculateScore();
                              return (score / totalPossible) * 100;
                            })()}
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Time Taken
                          </span>
                          <div className="font-semibold">
                            {formatTime(300 - timeLeft)}
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-2 pt-4 sm:flex-row">
                          <div className="text-muted-foreground text-sm">
                            Your answers have been submitted. You can now view
                            your certificate or retake the assessment.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-6 sm:flex-row">
                  <Button
                    className="w-full sm:w-auto"
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    <RotateCwIcon className="mr-2 h-4 w-4" />
                    Retake Assessment
                  </Button>

                  <Button className="w-full sm:w-auto">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
