require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');
const { ObjectId } = require('mongodb');

(async () => {
  const db = await connect();

  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =========================
  // USERS
  // =========================
  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await db.collection('users').insertOne({
    name: "Ali Khan",
    email: "ali@test.com",
    passwordHash,
    createdAt: new Date()
  });

  const user2 = await db.collection('users').insertOne({
    name: "Sara Ahmed",
    email: "sara@test.com",
    passwordHash,
    createdAt: new Date()
  });

  const user1Id = user1.insertedId;
  const user2Id = user2.insertedId;

  // =========================
  // PROJECTS
  // =========================
  const p1 = await db.collection('projects').insertOne({
    ownerId: user1Id,
    name: "AI Chat App",
    description: "Build chatbot system",
    archived: false,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    ownerId: user1Id,
    name: "Web Portfolio",
    description: "Personal website",
    archived: false,
    createdAt: new Date()
  });

  const p3 = await db.collection('projects').insertOne({
    ownerId: user2Id,
    name: "Mobile App",
    description: "Flutter project",
    archived: false,
    createdAt: new Date()
  });

  const p4 = await db.collection('projects').insertOne({
    ownerId: user2Id,
    name: "Data Analysis",
    description: "Python analytics",
    archived: false,
    createdAt: new Date()
  });

  // =========================
  // TASKS
  // =========================
  await db.collection('tasks').insertMany([
    {
      ownerId: user1Id,
      projectId: p1.insertedId,
      title: "Design UI",
      status: "todo",
      priority: 2,
      tags: ["ui", "design"],
      subtasks: [
        { title: "Wireframe", done: false },
        { title: "Mockup", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p1.insertedId,
      title: "Setup backend",
      status: "in-progress",
      priority: 3,
      tags: ["backend"],
      subtasks: [
        { title: "Express setup", done: true },
        { title: "MongoDB connect", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      projectId: p2.insertedId,
      title: "Create homepage",
      status: "done",
      priority: 1,
      tags: ["frontend"],
      subtasks: [
        { title: "HTML", done: true },
        { title: "CSS", done: true }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p3.insertedId,
      title: "Build login screen",
      status: "todo",
      priority: 3,
      tags: ["mobile"],
      subtasks: [
        { title: "UI design", done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p4.insertedId,
      title: "Clean dataset",
      status: "in-progress",
      priority: 2,
      tags: ["data"],
      subtasks: [
        { title: "Remove nulls", done: false }
      ],
      createdAt: new Date()
    }
  ]);

  // =========================
  // NOTES
  // =========================
  await db.collection('notes').insertMany([
    {
      ownerId: user1Id,
      projectId: p1.insertedId,
      title: "AI Ideas",
      content: "Use GPT for responses",
      tags: ["ai", "ideas"],
      createdAt: new Date()
    },
    {
      ownerId: user1Id,
      title: "General Note",
      content: "Study MongoDB aggregation",
      tags: ["study"],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p3.insertedId,
      title: "Mobile tips",
      content: "Use Flutter widgets",
      tags: ["mobile"],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      title: "Random ideas",
      content: "App monetization",
      tags: ["ideas"],
      createdAt: new Date()
    },
    {
      ownerId: user2Id,
      projectId: p4.insertedId,
      title: "Data notes",
      content: "Use pandas cleaning",
      tags: ["data"],
      createdAt: new Date()
    }
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
})();
