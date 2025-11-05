require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Resource = require('../models/Resource');
const Program = require('../models/Program');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_wellness';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected for seeding');
  await User.deleteMany();
  await Resource.deleteMany();
  await Program.deleteMany();

  const adminPass = await bcrypt.hash('adminpass', 10);
  const studentPass = await bcrypt.hash('studentpass', 10);

  const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const student = await User.create({ name: 'Student One', email: 'student@example.com', password: studentPass, role: 'student' });

  // Mental Health Resources
  await Resource.create({ 
    title: 'Campus Counseling Services', 
    description: 'Free confidential mental health counseling for students. Individual and group sessions available.', 
    category: 'Mental Health', 
    link: 'https://campus.example/counseling', 
    createdBy: admin._id 
  });
  await Resource.create({ 
    title: 'Stress Management Guide', 
    description: 'Learn effective techniques for managing academic stress, including meditation and time management.', 
    category: 'Mental Health', 
    link: 'https://campus.example/stress', 
    createdBy: admin._id 
  });

  // Nutrition Resources
  await Resource.create({ 
    title: 'Healthy Eating on a Budget', 
    description: 'Tips and recipes for maintaining a balanced diet while saving money. Includes meal prep guides.', 
    category: 'Nutrition', 
    link: 'https://campus.example/budget-meals', 
    createdBy: admin._id 
  });
  await Resource.create({ 
    title: 'Campus Dining Nutrition Guide', 
    description: 'Nutritional information and healthy options available at all campus dining locations.', 
    category: 'Nutrition', 
    link: 'https://campus.example/dining', 
    createdBy: admin._id 
  });

  // Physical Health Resources
  await Resource.create({ 
    title: 'Sleep Hygiene Tips', 
    description: 'Improve your sleep quality with science-backed strategies for better rest.', 
    category: 'Physical Health', 
    link: 'https://campus.example/sleep', 
    createdBy: admin._id 
  });
  await Resource.create({ 
    title: 'Ergonomic Study Setup', 
    description: 'Guide to setting up your study space to prevent neck and back strain.', 
    category: 'Physical Health', 
    link: 'https://campus.example/ergonomics', 
    createdBy: admin._id 
  });

  // Wellness Programs
  const mindful = await Program.create({ 
    title: 'Mindful Mornings', 
    description: '6-week mindfulness and meditation program. Learn techniques for starting your day with clarity and purpose.', 
    category: 'Mental Health', 
    sessions: [
      { date: new Date(), topic: 'Introduction to Mindfulness' },
      { date: new Date(Date.now() + 7*24*60*60*1000), topic: 'Morning Meditation Practices' }
    ],
    members: [student._id] 
  });

  const strength = await Program.create({ 
    title: 'Strength Training Basics', 
    description: '4-week introduction to strength training. Learn proper form and create a sustainable workout routine.', 
    category: 'Fitness', 
    sessions: [
      { date: new Date(), topic: 'Gym Safety and Basic Movements' },
      { date: new Date(Date.now() + 7*24*60*60*1000), topic: 'Upper Body Focus' }
    ]
  });

  const nutritionProg = await Program.create({ 
    title: 'Nutrition for Academic Success', 
    description: '3-week program on eating habits that boost focus and energy. Includes meal planning workshops.', 
    category: 'Nutrition', 
    sessions: [
      { date: new Date(), topic: 'Brain Foods and Study Snacks' },
      { date: new Date(Date.now() + 7*24*60*60*1000), topic: 'Meal Prep 101' }
    ]
  });

  const stressLess = await Program.create({ 
    title: 'Stress-Less Study Group', 
    description: '5-week program combining study skills with stress management techniques. Learn to excel without burning out.', 
    category: 'Mental Health', 
    sessions: [
      { date: new Date(), topic: 'Time Management Strategies' },
      { date: new Date(Date.now() + 7*24*60*60*1000), topic: 'Active Study Methods' }
    ]
  });
  // Add the student to the Mindful Mornings program and save association on the student
  if (mindful && mindful._id) {
    student.joinedPrograms = student.joinedPrograms || [];
    student.joinedPrograms.push(mindful._id);
    await student.save();
  }
  await student.save();

  console.log('Seed complete. Admin: admin@example.com/adminpass, Student: student@example.com/studentpass');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
