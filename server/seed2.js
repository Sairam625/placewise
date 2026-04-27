const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

const moreQuestions = [
  { title: "Probability of rolling sum of 7", category: "aptitude", company: "General", difficulty: "Medium", content: "What is the probability of rolling a sum of 7 with two fair six-sided dice?" },
  { title: "Percentage increase", category: "aptitude", company: "TCS", difficulty: "Easy", content: "If the price of a book is increased by 25% and then decreased by 20%, what is the net change in price?" },
  { title: "Average of consecutive numbers", category: "aptitude", company: "Wipro", difficulty: "Easy", content: "The average of 5 consecutive odd numbers is 61. What is the difference between the highest and lowest numbers?" },

  { title: "Find the error: Grammar", category: "verbal", company: "Cognizant", difficulty: "Easy", content: "Find the error: 'Neither the manager nor the employees was aware of the new policy.'" },
  { title: "Antonyms: Ephemeral", category: "verbal", company: "General", difficulty: "Medium", content: "Which word is the most opposite in meaning to 'Ephemeral'? A) Transient, B) Eternal, C) Fragile, D) Weak" },
  { title: "Reading Comprehension Strategy", category: "verbal", company: "Infosys", difficulty: "Medium", content: "Read the passage and infer the author's primary tone regarding renewable energy policies." },

  { title: "Number Series 2", category: "logical", company: "Accenture", difficulty: "Easy", content: "What comes next: 1, 4, 9, 16, 25, ?" },
  { title: "Syllogism", category: "logical", company: "TCS", difficulty: "Medium", content: "Statements: All dogs are cats. Some cats are birds. Conclusion: Some dogs are birds. True or False?" },
  { title: "Direction Sense", category: "logical", company: "Capgemini", difficulty: "Easy", content: "A man walks 5km East, turns right and walks 4km, turns left and walks 5km. Which direction is he facing now?" },

  { title: "Detect Cycle in a Graph", category: "coding", company: "Amazon", difficulty: "Medium", content: "Write a function to detect if a directed graph has a cycle." },
  { title: "Valid Parentheses", category: "coding", company: "Microsoft", difficulty: "Easy", content: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid." },
  { title: "Longest Increasing Subsequence", category: "coding", company: "Google", difficulty: "Hard", content: "Given an integer array nums, return the length of the longest strictly increasing subsequence." },

  { title: "Accenture Past Array Question", category: "previous", company: "Accenture", difficulty: "Medium", content: "Find the second largest element in an array without sorting it." },
  { title: "Cognizant SQL Query", category: "previous", company: "Cognizant", difficulty: "Medium", content: "Write a SQL query to find the second highest salary from an Employee table." },

  { title: "Company Info: Amazon Leadership Principles", category: "company", company: "Amazon", difficulty: "Easy", content: "Name 5 of Amazon's 16 Leadership Principles and explain how you have demonstrated one of them." },
  { title: "Mock Test: Service Based", category: "mock", company: "General", difficulty: "Medium", content: "1 Hour test containing 40 questions of aptitude, logical, and basic coding suitable for service-based IT companies." }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    
    await Question.insertMany(moreQuestions);
    console.log('Successfully seeded 16 MORE questions!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding data', err);
    process.exit(1);
  });
