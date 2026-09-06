"use client"

import { useState } from "react"
import { Button } from "@/components/UI/button"
import { X, Heart, Zap, Check, X as XIcon, Trophy, Link } from "lucide-react"
import { cn } from "@/lib/utils" 

// --- MOCK QUIZ DATA ---
const quizData = [
  {
    id: 1,
    subject: "Matematika",
    question: "Jika x + 5 = 12, berapakah nilai x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    id: 2,
    subject: "Sains & IPA",
    question: "Proses tumbuhan membuat makanannya sendiri dengan bantuan cahaya matahari disebut?",
    options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"],
    correctAnswer: "Fotosintesis",
  },
]

export default function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = quizData[currentStep]
  const isCorrect = selectedOption === currentQuestion?.correctAnswer

  const handleCheck = () => {
    if (!selectedOption) return
    
    setIsChecked(true)
    if (isCorrect) {
      setXp((prev) => prev + 10) // Earn 10 XP for correct answer
    } else {
      setHearts((prev) => Math.max(0, prev - 1)) // Lose a heart
    }
  }

  const handleContinue = () => {
    if (currentStep < quizData.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption(null)
      setIsChecked(false)
    } else {
      setIsFinished(true)
    }
  }

  // --- GAME OVER SCREEN ---
  if (hearts === 0) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background p-4 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h1 className="font-heading text-3xl font-extrabold">Nyawamu Habis!</h1>
        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
          Jangan menyerah! Ulangi pelajaran ini untuk memperkuat pemahamanmu.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" asChild><Link href="/courses">Kembali ke Kursus</Link></Button>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    )
  }

  // --- COMPLETION SCREEN ---
  if (isFinished) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background p-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 mb-4 animate-bounce">
          <Trophy className="h-10 w-10" />
        </div>
        <h1 className="font-heading text-4xl font-extrabold">Kursus Selesai!</h1>
        <p className="text-muted-foreground mt-2 mb-2">Kerja bagus, Budi!</p>
        
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
          <Zap className="h-5 w-5 fill-current" />
          <span className="font-bold">+{xp} XP Didapatkan!</span>
        </div>

        <Button asChild size="lg" className="font-heading">
          <Link href="/dashboard">Kembali ke Dashboard</Link>
        </Button>
      </div>
    )
  }

  // --- MAIN QUIZ INTERFACE ---
  return (
    <main className="flex flex-col min-h-svh bg-background">
      
      {/* Top Bar: Close, Progress, Hearts */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4">
          <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-6 w-6" />
          </Link>
          
          {/* Progress Bar */}
          <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep) / quizData.length) * 100}%` }}
            ></div>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 font-bold text-rose-500">
            <Heart className="h-5 w-5 fill-current" />
            <span>{hearts}</span>
          </div>
        </div>
      </header>

      {/* Question Area */}
      <div className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 flex flex-col">
        
        {/* Subject Badge */}
        <span className="inline-flex self-start px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full mb-4">
          {currentQuestion.subject}
        </span>

        {/* Question */}
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold mb-8">
          {currentQuestion.question}
        </h1>

        {/* Options Grid */}
        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          {currentQuestion.options.map((option) => {
            // Logic for coloring the options based on state
            const isSelected = selectedOption === option
            const isCorrectOption = isChecked && option === currentQuestion.correctAnswer
            const isIncorrectOption = isChecked && isSelected && !isCorrect

            return (
              <button
                key={option}
                disabled={isChecked}
                onClick={() => setSelectedOption(option)}
                className={cn(
                  "flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 text-left font-semibold transition-all",
                  // Default State
                  !isChecked && !isSelected && "border-border hover:border-primary/50 hover:bg-primary/5",
                  // Selected State (Before Checking)
                  !isChecked && isSelected && "border-primary bg-primary/10 text-primary",
                  // Correct State (After Checking)
                  isCorrectOption && "border-emerald-500 bg-emerald-500/10 text-emerald-700",
                  // Incorrect State (After Checking)
                  isIncorrectOption && "border-rose-500 bg-rose-500/10 text-rose-700",
                )}
              >
                <span className="text-lg">{option}</span>
                
                {/* Icons for feedback */}
                {isCorrectOption && <Check className="h-6 w-6 text-emerald-500" />}
                {isIncorrectOption && <XIcon className="h-6 w-6 text-rose-500" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Action Bar & Feedback */}
      <footer className={cn(
        "border-t border-border transition-all duration-300",
        // Change background based on correct/incorrect
        !isChecked && "bg-background",
        isChecked && isCorrect && "bg-emerald-500/10 border-emerald-500/20",
        isChecked && !isCorrect && "bg-rose-500/10 border-rose-500/20",
      )}>
        <div className="mx-auto max-w-3xl px-4 py-5">
          
          {/* Feedback Message (Hidden until checked) */}
          {isChecked && (
            <div className="mb-4 flex items-center gap-3">
              {isCorrect ? (
                <>
                  <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-emerald-700">Benar Sekali! 🎉</p>
                    <p className="text-sm font-medium text-emerald-600">Kamu mendapatkan +10 XP</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-full bg-rose-500 text-white flex items-center justify-center">
                    <XIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-rose-700">Kurang tepat...</p>
                    <p className="text-sm font-medium text-rose-600">Jawaban yang benar adalah <b>{currentQuestion.correctAnswer}</b></p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Button */}
          {!isChecked ? (
            <Button 
              size="lg" 
              className="w-full font-heading text-base" 
              disabled={!selectedOption}
              onClick={handleCheck}
            >
              Periksa Jawaban
            </Button>
          ) : (
            <Button 
              size="lg" 
              className={cn(
                "w-full font-heading text-base",
                isCorrect ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
              )}
              onClick={handleContinue}
            >
              Lanjutkan
            </Button>
          )}
        </div>
      </footer>
    </main>
  )
}