const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

const questions = [
  {
    title: "Reverse a Linked List",
    category: "coding",
    company: "Microsoft",
    difficulty: "Medium",
    content: "Given the head of a singly linked list, reverse the list, and return the reversed list."
  },
  {
    title: "Time and Work Problem",
    category: "aptitude",
    company: "TCS",
    difficulty: "Easy",
    content: "A can do a piece of work in 10 days, and B can do the same work in 15 days. How long will they take if both work together?"
  },
  {
    title: "Find the missing number",
    category: "logical",
    company: "Cognizant",
    difficulty: "Easy",
    content: "Find the missing number in the series: 2, 5, 10, 17, ?, 37"
  },
  {
    title: "Synonyms: Aberration",
    category: "verbal",
    company: "Wipro",
    difficulty: "Medium",
    content: "Which of the following is the closest synonym to the word 'Aberration'? A) Normalcy, B) Deviation, C) Beauty, D) Truth"
  },
  {
    title: "Two Sum",
    category: "coding",
    company: "Amazon",
    difficulty: "Easy",
    content: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  },
  {
    title: "System Design: URL Shortener",
    category: "company",
    company: "Google",
    difficulty: "Hard",
    content: "Design a URL shortener like bit.ly. What components are necessary? How would you scale the database?"
  },
  {
    title: "TCS Ninja Mock Test 1",
    category: "mock",
    company: "TCS",
    difficulty: "Medium",
    content: "Complete 60 questions covering Quants, Logical, and Verbal in 90 minutes. Start test?"
  },
  {
    title: "Infosys Previous Year Coding Question",
    category: "previous",
    company: "Infosys",
    difficulty: "Medium",
    content: "Write a program to find the longest substring without repeating characters in a given string."
  },
  {
    title: "Train Speed Calculation",
    category: "aptitude",
    company: "Accenture",
    difficulty: "Easy",
    content: "A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is?"
  },
  {
    title: "Blood Relations",
    category: "logical",
    company: "Capgemini",
    difficulty: "Medium",
    content: "Pointing to a photograph of a boy Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?"
  },
  {
    title: "Merge Intervals",
    category: "coding",
    company: "Goldman Sachs",
    difficulty: "Medium",
    content: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals."
  },
  {
    title: "Sentence Correction",
    category: "verbal",
    company: "Deloitte",
    difficulty: "Easy",
    content: "Identify the error: 'He is one of the best players who has ever lived.'"
  },
  {
    title: "Wipro Previous Paper - Quant",
    category: "previous",
    company: "Wipro",
    difficulty: "Medium",
    content: "A bag contains 6 red, 4 white, and 8 blue balls. If three balls are drawn at random, find the probability that one is red and two are white."
  },
  {
    title: "Dynamic Programming: Knapsack",
    category: "coding",
    company: "Amazon",
    difficulty: "Hard",
    content: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack."
  },
  {
    title: "Full Mock Test: Product Based",
    category: "mock",
    company: "General",
    difficulty: "Hard",
    content: "Comprehensive 2-hour mock test mimicking the difficulty of top product-based companies."
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    await Question.deleteMany({});
    console.log('Cleared existing questions');
    
    await Question.insertMany(questions);
    console.log('Successfully seeded 15 questions!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding data', err);
    process.exit(1);
  });
