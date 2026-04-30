import 'dotenv/config';
import bcrypt from 'bcrypt';
import { db, initializeDatabase } from './database.js';
import { userQueries, journalQueries } from './helpers.js';

const saltRounds = 10;

async function seed() {
  try {
    console.log('🌱 Starting seed script...');

    // Initialize database (create tables)
    initializeDatabase();
    console.log('✅ Tables created');

    // Drop existing data
    db.prepare('DELETE FROM journals').run();
    db.prepare('DELETE FROM users').run();

    // Create test user
    const password = 'password123';
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const userResult = userQueries.create('testuser@example.com', hashedPassword);
    const userId = userResult.lastInsertRowid;
    console.log(`✅ Test user created (ID: ${userId})`);
    console.log(`   Email: testuser@example.com`);
    console.log(`   Password: ${password}`);

    // Create test journals
    const testJournals = [
      {
        title: 'My First Reflection',
        entry: 'Today was a beautiful day. I spent time thinking about my goals and what truly matters to me. I realized that taking care of my mental health is just as important as my physical health. I am grateful for the people in my life who support me.'
      },
      {
        title: 'Afternoon Thoughts',
        entry: 'Had an amazing meditation session this evening. I felt so calm and centered. The practice of mindfulness is really changing how I approach my daily challenges. I feel more patient and compassionate with myself.'
      },
      {
        title: 'Gratitude Practice',
        entry: 'Today I am grateful for:\n1. My health and the ability to move my body\n2. My supportive family and friends\n3. The beauty of nature around me\n4. The opportunities to grow and learn\n5. The simple moments of peace and quiet\n\nIt is amazing how practicing gratitude shifts my perspective.'
      },
      {
        title: 'Learning Journey',
        entry: 'Started a new course today. It is challenging but exciting. I remind myself that growth happens outside my comfort zone. Every mistake is a learning opportunity. I am proud of myself for taking this step.'
      },
      {
        title: 'Evening Reflection',
        entry: 'As I wrap up this week, I want to acknowledge my progress. I have been consistent with my meditation practice and journaling. I notice I am more aware of my thoughts and emotions. Tomorrow is a new day, full of possibilities.'
      }
    ];

    testJournals.forEach((journal) => {
      journalQueries.create(userId as number, journal.title, journal.entry);
    });
    console.log(`✅ ${testJournals.length} test journals created`);

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Email: testuser@example.com');
    console.log('   Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();