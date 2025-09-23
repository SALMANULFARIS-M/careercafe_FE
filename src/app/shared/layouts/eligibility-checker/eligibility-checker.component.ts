import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Option {
  label: string;
  points: number;
  icon?: string;
}

interface Question {
  text: string;
  options: Option[];
}
@Component({
  selector: 'app-eligibility-checker',
  imports: [CommonModule],
  templateUrl: './eligibility-checker.component.html',
  styleUrl: './eligibility-checker.component.css'
})
export class EligibilityCheckerComponent {
  step = 0; // track current question
  result: { score: number; interpretation: string } | null = null;

  answers: Record<string, any> = {
    academic: null,
    english: null,
    work_experience: null,
    finance: null,
    course_fit: null,
    backlogs: 0
  };

  questions: { key: string; q: Question }[] = [
    {
      key: 'academic',
      q: {
        text: 'What is your highest qualification percentage/CGPA?',
        options: [
          { label: '80%+ / CGPA > 8.0', points: 40 },
          { label: '70–79% / CGPA 7.0–7.9', points: 30 },
          { label: '60–69% / CGPA 6.0–6.9', points: 20 },
          { label: 'Below 60%', points: 10 }
        ]
      }
    },
    {
      key: 'english',
      q: {
        text: 'What is your English test score?',
        options: [
          { label: 'IELTS 7.0+ / TOEFL 95+ / PTE 65+', points: 25 },
          { label: 'IELTS 6.5 / TOEFL 85+ / PTE 58+', points: 20 },
          { label: 'IELTS 6.0 / TOEFL 75+ / PTE 50+', points: 15 },
          { label: 'Below requirement', points: 5 },
          { label: 'Planning to take test', points: 10 }
        ]
      }
    },
    {
      key: 'work_experience',
      q: {
        text: 'How much relevant work experience do you have?',
        options: [
          { label: '3+ years', points: 15 },
          { label: '1–2 years', points: 10 },
          { label: 'Internship / <1 year', points: 5 },
          { label: 'None', points: 0 }
        ]
      }
    },
    {
      key: 'finance',
      q: {
        text: 'What is your approximate budget?',
        options: [
          { label: 'Above ₹25 Lakhs / Fully Funded', points: 10 },
          { label: '₹15–25 Lakhs', points: 7 },
          { label: '₹10–15 Lakhs', points: 5 },
          { label: 'Below ₹10 Lakhs', points: 2 }
        ]
      }
    },
    {
      key: 'course_fit',
      q: {
        text: 'Does your chosen course match your background?',
        options: [
          { label: 'Strongly matches', points: 10 },
          { label: 'Somewhat related', points: 7 },
          { label: 'Unrelated', points: 3 }
        ]
      }
    }
  ];

  nextStep() {
    if (this.step < this.questions.length) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 0) this.step--;
  }

  calculateEligibility() {
    let score = 0;
    this.questions.forEach((item) => {
      if (this.answers[item.key]) score += this.answers[item.key].points;
    });

    score -= Math.min(this.answers['backlogs'] * 5, 10);

    let interpretation = '';
    if (score >= 80) interpretation = 'Excellent: High chance of admission in top universities.';
    else if (score >= 60) interpretation = 'Good: Eligible for many universities; improve English or finances.';
    else if (score >= 40) interpretation = 'Moderate: Limited options; consider pathway/foundation programs.';
    else interpretation = 'Low: Needs academic/English improvement before applying.';

    this.result = { score, interpretation };
    this.step = this.questions.length + 1; // move to result screen
  }
resetForm() {
  this.answers = {
    academic: null,
    english: null,
    work_experience: null,
    finance: null,
    course_fit: null,
    backlogs: 0
  };
  this.result = null;
  this.step = 0;
}

}
