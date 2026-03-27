import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function seed() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/users.db');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    const events = [
      // Music Shows (5)
      { title: 'Sufi Night - Qawaali by Nizami Bandhu', category: 'Music Shows', date: '2026-04-10', location: 'Mumbai', description: 'Divine sufi music and qawaali.', price: 999, language: 'Hindi' },
      { title: 'Carnatic Classical Vocal - TM Krishna', category: 'Music Shows', date: '2026-04-12', location: 'Chennai', description: 'An enchanting evening of pure Carnatic ragas.', price: 500, language: 'Tamil' },
      { title: 'Baul Sangeet Festival', category: 'Music Shows', date: '2026-04-14', location: 'Kolkata', description: 'Experience the mystical folk music of Bengal.', price: 200, language: 'Bengali' },
      { title: 'Ghazal Maestro Night', category: 'Music Shows', date: '2026-04-18', location: 'Delhi', description: 'A tribute to Jagjit Singh featuring rising ghazal stars.', price: 1200, language: 'Urdu' },
      { title: 'Rajasthani Folk & Manganiyar Magic', category: 'Music Shows', date: '2026-04-22', location: 'Jaipur', description: 'Desert melodies that transport you to the dunes.', price: 400, language: 'Rajasthani' },

      // Dance & Performances (5)
      { title: 'Baithak Live - Kathak Performance', category: 'Dance & Performances', date: '2026-04-15', location: 'Mumbai', description: 'Witness the breathtaking twirls of classical Kathak.', price: 500, language: 'Hindi' },
      { title: 'Bharatanatyam Recital by Rukmini', category: 'Dance & Performances', date: '2026-04-17', location: 'Bangalore', description: 'A vibrant storytelling session through ancient dance.', price: 600, language: 'Tamil' },
      { title: 'Odissi Enigma - Grace in Motion', category: 'Dance & Performances', date: '2026-04-20', location: 'Bhubaneswar', description: 'An exploration of the divine Tribhangi posture.', price: 300, language: 'Odia' },
      { title: 'Kathakali Story Play: The Epic', category: 'Dance & Performances', date: '2026-04-24', location: 'Kochi', description: 'Elaborate makeup and ancient theatrical storytelling.', price: 800, language: 'Malayalam' },
      { title: 'Bhangra & Giddha Extravaganza', category: 'Dance & Performances', date: '2026-04-26', location: 'Chandigarh', description: 'High-energy harvest dances of Punjab.', price: 250, language: 'Punjabi' },

      // Workshops (5)
      { title: 'Pottery Workshop at Sukoon', category: 'Workshops', date: '2026-04-25', location: 'Hyderabad', description: 'Learn hand-building and wheel-throwing techniques.', price: 499, language: 'English' },
      { title: 'Madhubani Art Masterclass', category: 'Workshops', date: '2026-04-28', location: 'Patna', description: 'Learn the intricate motifs of Mithila painting.', price: 799, language: 'Hindi' },
      { title: 'Sitar Basics Workshop', category: 'Workshops', date: '2026-05-02', location: 'Pune', description: 'Introduction to string instruments and ragas.', price: 1500, language: 'English' },
      { title: 'Ayurvedic Cooking Immersion', category: 'Workshops', date: '2026-05-05', location: 'Mysore', description: 'Discover the balance of doshas through spices.', price: 900, language: 'English' },
      { title: 'Kalaripayattu Martial Arts Intro', category: 'Workshops', date: '2026-05-10', location: 'Trivandrum', description: 'Learn the basics of the oldest surviving martial art.', price: 400, language: 'Malayalam' },

      // Comedy Shows (5)
      { title: 'Desi Humor Night - Standup', category: 'Comedy Shows', date: '2026-04-11', location: 'Delhi', description: 'A hilarious take on Indian middle-class life.', price: 499, language: 'Hindi' },
      { title: 'South Indian Sarcasm', category: 'Comedy Shows', date: '2026-04-16', location: 'Chennai', description: 'Standup focusing on filtering coffee and logic.', price: 399, language: 'English' },
      { title: 'Bambaiya Local Laughs', category: 'Comedy Shows', date: '2026-04-21', location: 'Mumbai', description: 'Observational comedy about local trains and rains.', price: 599, language: 'Hindi' },
      { title: 'Nawabi Nuskhe Comedy', category: 'Comedy Shows', date: '2026-04-27', location: 'Lucknow', description: 'Tehzeeb meets modern satirical comedy.', price: 299, language: 'Urdu' },
      { title: 'The Great Indian Roast', category: 'Comedy Shows', date: '2026-05-03', location: 'Bangalore', description: 'Unfiltered, unapologetic comedy special.', price: 899, language: 'English' },

      // Exhibitions (5)
      { title: 'Mughal Heritage Artifacts Expo', category: 'Exhibitions', date: '2026-04-09', location: 'Agra', description: 'Rare manuscripts and jewelry from the era.', price: 100, language: 'English' },
      { title: 'Handloom & Textiles of India', category: 'Exhibitions', date: '2026-04-13', location: 'Surat', description: 'Showcasing weaves from Banarasi to Kanjeevaram.', price: 50, language: 'Hindi' },
      { title: 'Modern Indian Masters - Art Gallery', category: 'Exhibitions', date: '2026-04-19', location: 'Mumbai', description: 'Paintings from M.F. Husain and Amrita Sher-Gil.', price: 0, language: 'English' },
      { title: 'Tribal Crafts Bazaar', category: 'Exhibitions', date: '2026-04-23', location: 'Ranchi', description: 'Support indigenous artisans and craft makers.', price: 0, language: 'Hindi' },
      { title: 'Chronicles of Chola Dynasty', category: 'Exhibitions', date: '2026-04-29', location: 'Madurai', description: 'Bronze sculptures and historical archaelogy.', price: 150, language: 'Tamil' },

      // Spirituality & Wellness (5)
      { title: 'Sri Rama Navami Kalyana Mahotsavam', category: 'Spirituality & Wellness', date: '2026-04-20', location: 'Hyderabad', description: 'Celebrate the grand festival with soulful chants.', price: 250, language: 'Telugu' },
      { title: 'Himalayan Yoga Retreat', category: 'Spirituality & Wellness', date: '2026-05-01', location: 'Rishikesh', description: 'A rejuvenating weekend of asanas and dhyana.', price: 5000, language: 'English' },
      { title: 'Vipassana Intro Session', category: 'Spirituality & Wellness', date: '2026-05-06', location: 'Igatpuri', description: 'Learn the ancient meditation technique of silence.', price: 0, language: 'Hindi' },
      { title: 'Ganga Aarti Experience', category: 'Spirituality & Wellness', date: '2026-05-08', location: 'Varanasi', description: 'Immersive spiritual gathering at the Dashashwamedh Ghat.', price: 50, language: 'Hindi' },
      { title: 'Sufi Whirling Meditation', category: 'Spirituality & Wellness', date: '2026-05-12', location: 'Ajmer', description: 'Connect to the divine through rhythmic motion.', price: 300, language: 'Urdu' },

      // Meetups (5)
      { title: 'Indian Literature Book Club', category: 'Meetups', date: '2026-04-14', location: 'Delhi', description: 'Discussing contemporary Indian authors and poets.', price: 0, language: 'English' },
      { title: 'Regional Filmmakers Mixer', category: 'Meetups', date: '2026-04-18', location: 'Hyderabad', description: 'Networking event for indie directors and writers.', price: 150, language: 'Telugu' },
      { title: 'Heritage Walk - Old City', category: 'Meetups', date: '2026-04-24', location: 'Ahmedabad', description: 'Weekend heritage walk exploring ancient pols.', price: 200, language: 'Gujarati' },
      { title: 'NRI Returnees Connect', category: 'Meetups', date: '2026-04-30', location: 'Bangalore', description: 'A support and networking group for returning Indians.', price: 300, language: 'English' },
      { title: 'Culinary Enthusiasts Potluck', category: 'Meetups', date: '2026-05-04', location: 'Kolkata', description: 'Bring your family\'s secret recipe dish to share!', price: 0, language: 'Bengali' }
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
    
    // Feed Posts
    const posts = [
      { username: 'Aarav123', image_url: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80', description: 'Just witnessed the most mesmerizing sunset at the Ghats of Varanasi. The spiritual energy here is unexplainable! 🌺✨', tag: 'Spirituality' },
      { username: 'Priya_Dances', image_url: 'https://images.unsplash.com/photo-1583120614539-715af8f13b19?auto=format&fit=crop&q=80', description: 'Backstage before our Odissi performance tonight! The heavy jewelry is worth it for the art. #CulturalDance #Odissi', tag: 'Dance' },
      { username: 'FoodieTraveller', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80', description: 'Nothing beats authentic South Indian filter coffee in a traditional steel tumbler on a rainy morning. ☕🌧️', tag: 'Food' },
      { username: 'CultureConnect_Official', image_url: 'https://images.unsplash.com/photo-1605333190886-0ac3777d13eb?auto=format&fit=crop&q=80', description: 'ANNOUNCEMENT: The grand cultural fest is happening next month in Jaipur! Book your tickets early on our Events Board. 🎉🎟️', tag: 'Announcement' },
      { username: 'Rohan_Clicks', image_url: 'https://images.unsplash.com/photo-1564507592227-0b0f5c06a33f?auto=format&fit=crop&q=80', description: 'The incredible architecture of Hampi. It feels like stepping right into the 14th century Vijayanagara Empire! 🏛️', tag: 'Architecture' }
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
    console.log('Seed 3 complete.');
}
seed().catch(console.error);
