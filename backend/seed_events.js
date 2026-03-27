import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function seed() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/database.sqlite');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    const events = [
      {
        title: 'Sufi Night - Qawaali by Nizami Bandhu',
        date: '2026-04-10',
        location: 'St. Andrews Auditorium, Mumbai',
        description: 'Experience an evening of divine sufi music and qawaali by the legendary Nizami Bandhu. A soulful journey into the roots of Indian classical sufi tradition.',
        username: 'BookMyShow',
        category: 'Music Shows',
        price: 999,
        language: 'Hindi'
      },
      {
        title: 'Baithak Live - Kathak Performance',
        date: '2026-04-15',
        location: 'Shanmukhananda Hall, Mumbai',
        description: 'Baithak live by Akanksha Grover. Witness the breathtaking twirls, rhythmic footwork, and expressive storytelling of classical Kathak.',
        username: 'BookMyShow',
        category: 'Dance & Performances',
        price: 500,
        language: 'Hindi'
      },
      {
        title: 'Sri Rama Navami Kalyana Mahotsavam',
        date: '2026-04-20',
        location: 'ASBL RTC x Roads, Hyderabad',
        description: 'Soulful performances by Sunitha Garu & Team to celebrate the grand Sri Rama Navami. Engage in cultural traditions, spirituality, and divine musical performances.',
        username: 'BookMyShow',
        category: 'Spirituality & Wellness',
        price: 250,
        language: 'Telugu'
      },
      {
        title: 'Pottery Workshop at Sukoon Cafe',
        date: '2026-04-25',
        location: 'Sukoon Lake Side Bistro, Hyderabad',
        description: 'Dive into the ancient art of pottery. Learn hand-building and wheel-throwing techniques while immersing yourself in traditional Indian crafts.',
        username: 'BookMyShow',
        category: 'Workshops',
        price: 499,
        language: 'English'
      }
    ];

    for (const ev of events) {
      await db.run(
        'INSERT INTO events (title, date, location, description, username, category, price, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ev.title, ev.date, ev.location, ev.description, ev.username, ev.category, ev.price, ev.language]
      );
      console.log('Inserted:', ev.title);
    }
    await db.close();
}

seed().catch(console.error);
