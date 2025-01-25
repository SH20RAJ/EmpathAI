import { db } from './index.js';
import { resources } from './schema/schema.js';

const initialResources = [
  {
    title: "Understanding Anxiety",
    description: "Learn about the different types of anxiety and effective coping strategies.",
    category: "Mental Health",
    tags: ["anxiety", "stress", "coping"],
    readTime: "5 min",
    content: `
      # Understanding Anxiety

      Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. This guide will help you understand and manage anxiety effectively.

      ## Types of Anxiety
      1. Generalized Anxiety Disorder (GAD)
      2. Social Anxiety
      3. Panic Disorder
      4. Specific Phobias

      ## Common Symptoms
      - Excessive worry
      - Restlessness
      - Difficulty concentrating
      - Sleep problems
      - Physical symptoms (rapid heartbeat, sweating)

      ## Coping Strategies
      1. Deep breathing exercises
      2. Progressive muscle relaxation
      3. Regular exercise
      4. Mindfulness meditation
      5. Cognitive Behavioral Therapy (CBT) techniques

      Remember: It's okay to seek professional help when anxiety becomes overwhelming.
    `,
  },
  {
    title: "Mindfulness Meditation Guide",
    description: "A beginner's guide to mindfulness meditation with practical exercises.",
    category: "Wellness",
    tags: ["meditation", "mindfulness", "relaxation"],
    readTime: "8 min",
    content: `
      # Mindfulness Meditation Guide

      Mindfulness meditation is a powerful practice that can help reduce stress, improve focus, and enhance overall well-being.

      ## What is Mindfulness?
      Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment.

      ## Benefits
      - Reduced stress and anxiety
      - Improved focus and concentration
      - Better emotional regulation
      - Enhanced self-awareness
      - Better sleep quality

      ## Getting Started
      1. Find a quiet space
      2. Set a timer (start with 5-10 minutes)
      3. Focus on your breath
      4. Notice when your mind wanders
      5. Gently return focus to your breath

      ## Daily Practice Tips
      - Start small and be consistent
      - Practice at the same time each day
      - Use guided meditations initially
      - Be patient with yourself
    `,
  },
  {
    title: "Building Healthy Relationships",
    description: "Tips for developing and maintaining meaningful relationships in your life.",
    category: "Relationships",
    tags: ["relationships", "communication", "boundaries"],
    readTime: "6 min",
    content: `
      # Building Healthy Relationships

      Strong, healthy relationships are fundamental to our well-being and happiness.

      ## Key Components
      1. Effective Communication
      2. Trust and Honesty
      3. Healthy Boundaries
      4. Mutual Respect
      5. Quality Time

      ## Communication Skills
      - Active listening
      - Express feelings clearly
      - Use "I" statements
      - Practice empathy
      - Regular check-ins

      ## Setting Boundaries
      - Identify your limits
      - Communicate boundaries clearly
      - Respect others' boundaries
      - Be consistent
      - Learn to say "no"

      Remember: Healthy relationships require ongoing effort and commitment from all parties involved.
    `,
  },
];

async function seedResources() {
  console.log('Seeding resources...');

  try {
    for (const resource of initialResources) {
      await db.insert(resources).values({
        id: crypto.randomUUID(),
        ...resource,
      });
      console.log(`Added resource: ${resource.title}`);
    }

    console.log('Resources seeded successfully');
  } catch (error) {
    console.error('Error seeding resources:', error);
    process.exit(1);
  }
}

seedResources();
