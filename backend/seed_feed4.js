import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function seed() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/users.db');
    const db = await open({ filename: dbPath, driver: sqlite3.Database });
    
    const posts = [
      { username: 'Rajesh_Kumar', image_url: 'https://images.unsplash.com/photo-1623512537256-43b9df0996a6?auto=format&fit=crop&q=80', description: 'Just arrived at the magnificent Mysore Palace! The architecture and sheer scale of this place never fail to amaze me. 🏰✨', tag: 'Architecture' },
      { username: 'Meera_Arts', image_url: 'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?auto=format&fit=crop&q=80', description: 'Immersing myself in the beauty of traditional Indian handicrafts. Every piece tells a unique story passed down through generations. 🧵🎨', tag: 'Crafts' },
      { username: 'SpicyBites', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80', description: 'Nothing beats a crispy Masala Dosa accompanied by piping hot sambar. The perfect South Indian breakfast! 🍛🌶️', tag: 'Food' },
      { username: 'Ganga_Travels', image_url: 'https://images.unsplash.com/photo-1571536802807-3cab473954eb?auto=format&fit=crop&q=80', description: 'The evening Aarti at Varanasi. The spiritual energy in the air, the chanting, and the glowing diyas on the river are pure magic. 🪔🙏', tag: 'Spirituality' },
      { username: 'Dancer_Ananya', image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Odissi_performance_by_Sujata_Mohapatra_-_03.jpg', description: 'Refining the Tribhangi posture. The grace of Odissi requires immense dedication, but performing it feels like connecting with the divine. 💃', tag: 'Dance' },
      { username: 'Festive_Vibes', image_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80', description: 'Colors of Holi bringing everyone together in joy! Such a beautiful celebration of spring, love, and new beginnings. 🎨🎉', tag: 'Festivals' },
      { username: 'HistoryNerd', image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80', description: 'Exploring the intricate carvings of the Taj Mahal. A symbol of eternal love and breathtaking Mughal architecture. 🕌❤️', tag: 'History' },
      { username: 'Sangeet_Lover', image_url: 'https://images.unsplash.com/photo-1519652277465-d055a498a587?auto=format&fit=crop&q=80', description: 'Listening to classical Sitar during a peaceful evening. Indian classical music has a profound healing effect on the mind. 🎶🪕', tag: 'Music' },
      { username: 'DesiStyle', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80', description: 'The elegance of a Kanjeevaram silk saree is unmatched. Proudly embracing traditional Indian wear for today’s special occasion! 🥻✨', tag: 'Fashion' },
      { username: 'StreetFoodie', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80', description: 'Pani Puri challenge! The burst of tangy, spicy, and sweet flavors from a street vendor in Mumbai is an absolute must-try. 🤤🔥', tag: 'Food' }
    ];

    for (const p of posts) {
      const exists = await db.get('SELECT id FROM posts WHERE description = ?', [p.description]);
      if (!exists) {
         await db.run(
           'INSERT INTO posts (user_id, username, image_url, description, tag) VALUES (?, ?, ?, ?, ?)',
           [1, p.username, p.image_url, p.description, p.tag]
         );
      }
    }

    await db.close();
    console.log('Seed feed 4 complete.');
}
seed().catch(console.error);
