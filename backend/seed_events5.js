import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function seed() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/users.db');
    const db = await open({ filename: dbPath, driver: sqlite3.Database });

    const events = [
      // Talks & Conferences (5)
      { title: 'TEDx - Reviving Lost Art Forms of India', category: 'Talks & Conferences', date: '2026-04-12', location: 'IIT Delhi, New Delhi', description: 'Renowned scholars discuss fading Indian art traditions and the efforts to revive them for future generations.', price: 0, language: 'English' },
      { title: 'Indian Classical Music - A Global Perspective', category: 'Talks & Conferences', date: '2026-04-19', location: 'NCPA, Mumbai', description: 'A panel of international musicologists explore how Indian ragas have influenced world music over centuries.', price: 300, language: 'English' },
      { title: 'Heritage Conservation Summit 2026', category: 'Talks & Conferences', date: '2026-04-26', location: 'India Habitat Centre, Delhi', description: 'Architects and historians come together to discuss preserving India\'s crumbling historical monuments.', price: 500, language: 'Hindi' },
      { title: 'Dravidian Literature & Identity Conference', category: 'Talks & Conferences', date: '2026-05-03', location: 'University of Madras, Chennai', description: 'A deep dive into Tamil, Telugu, Kannada and Malayalam literary traditions and their cultural significance.', price: 150, language: 'Tamil' },
      { title: 'Crafting the Future - Handloom Entrepreneurs Talk', category: 'Talks & Conferences', date: '2026-05-10', location: 'Taj Vivanta, Varanasi', description: 'Young handloom entrepreneurs share how they are modernizing traditional weaving while preserving heritage.', price: 200, language: 'Hindi' },

      // Food & Culture (5)
      { title: 'Chettinad Cuisine Festival', category: 'Food & Culture', date: '2026-04-14', location: 'The Park Hotel, Chennai', description: 'A 3-day culinary extravaganza showcasing the bold, aromatic spices and unique dishes of Tamil Nadu\'s Chettinad region.', price: 1200, language: 'Tamil' },
      { title: 'Street Food Walk - Chandni Chowk', category: 'Food & Culture', date: '2026-04-18', location: 'Chandni Chowk, Old Delhi', description: 'Guided walk through India\'s most legendary food street. Taste parathas, jalebis, chaat, and more from century-old shops.', price: 399, language: 'Hindi' },
      { title: 'Bengali Sweet Making Workshop', category: 'Food & Culture', date: '2026-04-22', location: 'Balaram Mullick, Kolkata', description: 'Learn to make authentic Rasgulla, Sandesh, and Mishti Doi from the masters of Bengali sweets.', price: 800, language: 'Bengali' },
      { title: 'Biryani Trail - Hyderabad Edition', category: 'Food & Culture', date: '2026-04-28', location: 'Old City, Hyderabad', description: 'A food tour exploring the finest Hyderabadi Dum Biryani spots, from royal kitchens to hidden street gems.', price: 599, language: 'Telugu' },
      { title: 'Farm-to-Table: Konkan Coastal Cuisine', category: 'Food & Culture', date: '2026-05-05', location: 'Malvan, Maharashtra', description: 'A weekend immersion into coastal Maharashtrian cooking with fresh seafood, kokum, and coconut-based curries.', price: 1500, language: 'Marathi' },

      // Theatre & Arts (5)
      { title: 'Ramayana - A Contemporary Theatre Retelling', category: 'Theatre & Arts', date: '2026-04-16', location: 'Prithvi Theatre, Mumbai', description: 'A modern theatrical interpretation of the great Indian epic, blending traditional costumes with avant-garde staging.', price: 700, language: 'Hindi' },
      { title: 'Kerala Shadow Puppet Show (Tholpavakoothu)', category: 'Theatre & Arts', date: '2026-04-20', location: 'Thrissur, Kerala', description: 'Ancient shadow puppetry from Kerala depicting scenes from the Ramayana with handcrafted leather figures.', price: 200, language: 'Malayalam' },
      { title: 'Nautanki Revival Night', category: 'Theatre & Arts', date: '2026-04-25', location: 'Ravindra Natya Mandir, Lucknow', description: 'Experience the forgotten art of Nautanki - a vibrant North Indian folk theatre tradition full of music and drama.', price: 250, language: 'Hindi' },
      { title: 'Warli Art Live Painting Exhibition', category: 'Theatre & Arts', date: '2026-05-01', location: 'Jehangir Art Gallery, Mumbai', description: 'Watch tribal Warli artists create stunning wall paintings live, and take home your own canvas creation.', price: 100, language: 'English' },
      { title: 'Theyyam - Living Gods of Malabar', category: 'Theatre & Arts', date: '2026-05-08', location: 'Kannur, Kerala', description: 'Witness the spectacular ritual art form Theyyam with its elaborate body painting, headdresses, and divine performances.', price: 0, language: 'Malayalam' }
    ];

    for (const ev of events) {
      const exists = await db.get('SELECT id FROM events WHERE title = ?', [ev.title]);
      if (!exists) {
         await db.run(
           'INSERT INTO events (user_id, title, date, location, description, username, category, price, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
           [1, ev.title, ev.date, ev.location, ev.description, 'BookMyShow', ev.category, ev.price, ev.language]
         );
      }
    }

    // Delete comedy shows events from DB
    await db.run("DELETE FROM events WHERE category = 'Comedy Shows'");
    // Delete kids & family events if any exist
    await db.run("DELETE FROM events WHERE category = 'Kids & Family'");

    await db.close();
    console.log('Seed 5 complete - Added 15 events, removed Comedy Shows & Kids & Family.');
}
seed().catch(console.error);
