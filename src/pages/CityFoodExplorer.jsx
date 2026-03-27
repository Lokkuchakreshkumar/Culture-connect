import { useState, useEffect } from 'react';

const cityFoodData = [
  // ── Andhra Pradesh (all major cities) ──────────────────────────────────────
  { id: 1,  city: 'Visakhapatnam', state: 'Andhra Pradesh', emoji: '🌊', color: '#0ea5e9',
    foods: ['Bamboo Chicken', 'Chepa Pulusu', 'Pesarattu', 'Bobbatlu', 'Royyala Iguru', 'Pulihora'],
    description: 'Vizag blends coastal seafood with tribal forest flavors. Bamboo Chicken — marinated chicken cooked inside bamboo over open fire — is the city\'s most iconic dish.' },
  { id: 2,  city: 'Vijayawada', state: 'Andhra Pradesh', emoji: '🌶️', color: '#ef4444',
    foods: ['Gongura Mutton', 'Kaja Sweets', 'Pulihora', 'Punugulu', 'Pesarattu', 'Mirchi Bajji'],
    description: 'Vijayawada is the spice capital of Andhra. Gongura (sorrel leaf) pickle and Gongura Mutton are legendary. Kaja sweets from the city are famous across the state.' },
  { id: 3,  city: 'Guntur', state: 'Andhra Pradesh', emoji: '🔥', color: '#f97316',
    foods: ['Guntur Mirchi Chicken', 'Gongura Pachadi', 'Pesarattu', 'Mirchi Bajji', 'Natu Kodi Pulusu', 'Ragi Sangati'],
    description: 'Guntur is the chilli capital of India. Guntur Sannam chillies make every dish explosively spicy. Mirchi Bajji here is the spiciest you will ever taste.' },
  { id: 4,  city: 'Tirupati', state: 'Andhra Pradesh', emoji: '🛕', color: '#a855f7',
    foods: ['Tirupati Laddu (Prasadam)', 'Chicken Pakoda', 'Pulihora', 'Daddojanam', 'Pesarattu', 'Chakra Pongal', 'Vada'],
    description: 'Tirupati\'s Venkateswara Laddu is India\'s most sacred food offering. The city\'s street-side Chicken Pakoda — crispy battered chicken fritters seasoned with local spices — is a favorite among pilgrims before the temple climb.' },
  { id: 5,  city: 'Kakinada', state: 'Andhra Pradesh', emoji: '🦐', color: '#14b8a6',
    foods: ['Kakinada Kaja', 'Royyala Vepudu', 'Chepa Vepudu', 'Pesarattu', 'Pulihora', 'Bobbatlu'],
    description: 'Kakinada is famous for its unique layered sweet Kaja and fresh prawn fry from the Godavari delta. Its seafood is regarded as the freshest in coastal Andhra.' },
  { id: 6,  city: 'Rajahmundry', state: 'Andhra Pradesh', emoji: '🌊', color: '#3b82f6',
    foods: ['Godavari Fish Curry', 'Punugulu', 'Bobbatlu', 'Pulihora', 'Pesarattu', 'Chalka Roti'],
    description: 'On the banks of the Godavari, Rajahmundry\'s fish curry made with fresh river fish and raw mango is an unforgettable taste of riverine Andhra cuisine.' },
  { id: 7,  city: 'Nellore', state: 'Andhra Pradesh', emoji: '🐟', color: '#06b6d4',
    foods: ['Nellore Fish Curry', 'Malai Kaja', 'Nellore Ghee Karam Dosa', 'Pot Biryani', 'Royyala Vepudu', 'Pesarattu', 'Gongura Chicken', 'Ulava Charu'],
    description: 'Nellore\'s fiery fish curry is distinct — cooked with Nellore chillies and tamarind. The creamy Malai Kaja sweet, buttery Ghee Karam Dosa, and slow-cooked Pot Biryani make Nellore a true food destination.' },
  { id: 8,  city: 'Kurnool', state: 'Andhra Pradesh', emoji: '🏰', color: '#8b5cf6',
    foods: ['Uggani Bajji', 'Bellam Thalikalu', 'Gongura Pickle', 'Jolada Rotte', 'Natu Kodi Curry', 'Boti Curry', 'Ragi Mudda'],
    description: 'Kurnool\'s Rayalaseema cuisine is bold and rustic. Uggani Bajji — puffed rice soaked in spicy tamarind water served with crispy bajji — is the city\'s most beloved street snack, eaten for breakfast citywide.' },
  { id: 9,  city: 'Kadapa', state: 'Andhra Pradesh', emoji: '🌿', color: '#22c55e',
    foods: ['Boti Curry', 'Rayalaseema Natu Kodi', 'Gongura Pachadi', 'Ragi Sangati', 'Pulihora', 'Vankaya Kura'],
    description: 'Kadapa\'s cuisine is deeply influenced by Rayalaseema culture. The famous Boti Curry (goat entrails) and free-range chicken dishes are intensely spiced and flavorful.' },
  { id: 10, city: 'Anantapur', state: 'Andhra Pradesh', emoji: '🥜', color: '#eab308',
    foods: ['Jolada Rotte', 'Palli Chutney', 'Ugadi Pachadi', 'Natu Kodi Pulusu', 'Gongura Mutton', 'Ragi Mudda'],
    description: 'Anantapur is India\'s second-largest groundnut-producing district, reflected in its cuisine. Peanut chutneys and coarse grain breads with country chicken are everyday staples.' },
  { id: 11, city: 'Eluru', state: 'Andhra Pradesh', emoji: '🍬', color: '#ec4899',
    foods: ['Eluru Kaju Katli', 'Pesarattu', 'Bobbatlu', 'Chepa Pulusu', 'Pulihora', 'Paddu'],
    description: 'Eluru is celebrated for its melt-in-the-mouth Kaju Katli. The city sits in the fertile Krishna delta making it rich in fresh fish, coconut, and rice-based dishes.' },
  { id: 12, city: 'Ongole', state: 'Andhra Pradesh', emoji: '🐂', color: '#f59e0b',
    foods: ['Ongole Beef Roast', 'Pesarattu', 'Gongura Chicken', 'Royyala Curry', 'Pulihora', 'Ulava Charu'],
    description: 'Ongole, home of the famous Ongole cattle breed, has a rich tradition of beef and mutton preparations spiced with local Andhra chillies and tamarind.' },
  { id: 13, city: 'Chittoor', state: 'Andhra Pradesh', emoji: '🥭', color: '#84cc16',
    foods: ['Punugulu', 'Pesarattu', 'Ragi Dosa', 'Mango Pachadi', 'Vada Curry', 'Chegodilu'],
    description: 'Chittoor, the mango capital of Andhra, has vibrant mango-based chutneys and pickles. Its border location with Tamil Nadu gives the local cuisine a unique mixed flavor.' },
  { id: 14, city: 'Srikakulam', state: 'Andhra Pradesh', emoji: '🎋', color: '#10b981',
    foods: ['Srikakulam Bobbattu', 'Bamboo Chicken', 'Chepa Pulusu', 'Pesarattu', 'Sankati', 'Ulava Charu'],
    description: 'Srikakulam\'s tribal-influenced cuisine features bamboo-cooked dishes and a sweeter variant of Bobbattu. Fresh hillstream fish cooked with tribal spices is extraordinary.' },
  { id: 15, city: 'Vizianagaram', state: 'Andhra Pradesh', emoji: '🏛️', color: '#6366f1',
    foods: ['Bamboo Chicken', 'Pesarattu', 'Tribal Fish Curry', 'Ragi Mudda', 'Chepa Vepudu', 'Bobbatlu'],
    description: 'Vizianagaram\'s royal and tribal heritage blend together in its cuisine — bamboo-cooked meats and tribal forest ingredients create dishes unique to this northern Andhra city.' },
  { id: 16, city: 'Machilipatnam', state: 'Andhra Pradesh', emoji: '🐠', color: '#0891b2',
    foods: ['Bandar Badam Milk', 'Machilipatnam Fish Curry', 'Royyala Biryani', 'Chepa Pulusu', 'Pesarattu', 'Kakinada Kaja', 'Pulihora'],
    description: 'Machilipatnam is famed for its Bandar Badam Milk — a rich, chilled almond-milk drink that is a GI-tagged local specialty beloved across Andhra Pradesh. Its prawn biryani and port-fresh fish curries complete the experience.' },
  { id: 17, city: 'Proddatur', state: 'Andhra Pradesh', emoji: '🌾', color: '#d97706',
    foods: ['Jolada Rotte', 'Natu Kodi Curry', 'Gongura Pappu', 'Ragi Sangati', 'Boti Curry', 'Vankaya Kura'],
    description: 'Proddatur\'s Rayalaseema cuisine is all about coarse-grain breads, fiery curries, and the beloved Gongura Pappu — a lentil dish with tangy red sorrel leaves.' },
  { id: 18, city: 'Nandyal', state: 'Andhra Pradesh', emoji: '🌶️', color: '#b45309',
    foods: ['Nandyal Seerla Stew', 'Jolada Rotte', 'Gongura Mutton', 'Ragi Mudda', 'Pesarattu', 'Chegodilu'],
    description: 'Nandyal sits in the heart of Rayalaseema and serves some of the most authentic rustic Andhra meals — hearty, spicy, and cooked over wood fire for maximum flavor.' },

  // ── Telangana ──────────────────────────────────────────────────────────────
  { id: 19, city: 'Hyderabad', state: 'Telangana', emoji: '👑', color: '#f59e0b',
    foods: ['Hyderabadi Dum Biryani', 'Haleem', 'Double Ka Meetha', 'Lukhmi', 'Irani Chai', 'Qubani Ka Meetha'],
    description: 'Hyderabad\'s Dum Biryani is India\'s most iconic rice dish — slow-cooked in a sealed pot with saffron, fried onions, and aged Basmati. Haleem during Ramzan is legendary.' },
  { id: 20, city: 'Warangal', state: 'Telangana', emoji: '🏰', color: '#7c3aed',
    foods: ['Sakinalu', 'Jonna Rotte', 'Chegodilu', 'Golichina Mamsam', 'Pesarattu', 'Pulihora'],
    description: 'Warangal\'s ancient Kakatiya heritage lives on in its crispy Sakinalu rice spirals and Jonna Rotte sorghum bread. Golichina Mamsam (dry-fried mutton) is a local marvel.' },

  // ── Tamil Nadu ─────────────────────────────────────────────────────────────
  { id: 21, city: 'Chennai', state: 'Tamil Nadu', emoji: '🌅', color: '#dc2626',
    foods: ['Chettinad Chicken Curry', 'Filter Coffee', 'Idli-Sambar', 'Kothu Parotta', 'Murukku', 'Pongal'],
    description: 'Chennai\'s cuisine spans from refined temple food to fiery street snacks. The filter coffee ritual, Chettinad spice mastery, and crispy Murukku define everyday Tamil life.' },
  { id: 22, city: 'Madurai', state: 'Tamil Nadu', emoji: '🛕', color: '#9333ea',
    foods: ['Jigarthanda', 'Kari Dosai', 'Mutton Kuzhambu', 'Parotta', 'Kal Dosai', 'Kavuni Arisi'],
    description: 'Madurai\'s Jigarthanda — a chilled concoction of milk, almond resin, basil seeds, and ice cream — is a legendary cooling drink perfect for the scorching temple-city heat.' },
  { id: 23, city: 'Coimbatore', state: 'Tamil Nadu', emoji: '🏭', color: '#2563eb',
    foods: ['Kongu Biryani', 'Seeraga Samba Sadam', 'Nool Puttu', 'Kavuni Arisi Payasam', 'Aattukal Soup', 'Kari Dosai'],
    description: 'Coimbatore\'s Kongu cuisine is a hidden treasure — simple, wholesome food using fine two-grain Seeraga Samba rice, local farm vegetables, and minimal oil.' },

  // ── Karnataka ──────────────────────────────────────────────────────────────
  { id: 24, city: 'Bengaluru', state: 'Karnataka', emoji: '🌿', color: '#16a34a',
    foods: ['Masala Dosa', 'Rava Idli', 'Bisi Bele Bath', 'Filter Coffee', 'Akki Roti', 'Vangi Bath'],
    description: 'Bengaluru\'s iconic breakfast culture — crispy Masala Dosa paired with filter coffee — is a daily ritual for millions. MTR\'s Rava Idli was born here during World War II.' },
  { id: 25, city: 'Mysuru', state: 'Karnataka', emoji: '👑', color: '#ea580c',
    foods: ['Mysore Pak', 'Mysore Masala Dosa', 'Obbattu', 'Chiroti', 'Mysore Rasam', 'Kesari Bath'],
    description: 'Mysuru\'s royal culinary legacy gives us the melt-in-your-mouth Mysore Pak and the legendary Mysore Masala Dosa with its unique red chilli-garlic chutney.' },
  { id: 26, city: 'Mangaluru', state: 'Karnataka', emoji: '🌊', color: '#0891b2',
    foods: ['Chicken Ghee Roast', 'Neer Dosa', 'Kori Rotti', 'Prawn Sukka', 'Kadubu', 'Fish Moilee'],
    description: 'Mangaluru\'s coastal cuisine is a treasure — the Chicken Ghee Roast with its deep crimson masala coating is the city\'s crown jewel, beloved across Karnataka.' },

  // ── Kerala ─────────────────────────────────────────────────────────────────
  { id: 27, city: 'Kochi', state: 'Kerala', emoji: '⚓', color: '#0d9488',
    foods: ['Karimeen Pollichathu', 'Prawn Moilee', 'Appam & Stew', 'Fish Molee', 'Banana Chips', 'Kerala Porotta'],
    description: 'Kochi\'s spice-trade heritage shapes its cuisine — the Pearl Spot fish grilled in banana leaf (Karimeen Pollichathu) is an absolute must-try coastal masterpiece.' },
  { id: 28, city: 'Kozhikode', state: 'Kerala', emoji: '🍲', color: '#c2410c',
    foods: ['Malabar Biryani', 'Malabar Parotta', 'Halwa (Kozhikodan)', 'Pathiri', 'Fish Fry', 'Kappa Biryani'],
    description: 'Kozhikode\'s Malabar Biryani and legendary Kozhikodan Halwa have made this city one of India\'s most important culinary destinations. The sweets here are truly extraordinary.' },

  // ── Maharashtra ────────────────────────────────────────────────────────────
  { id: 29, city: 'Mumbai', state: 'Maharashtra', emoji: '🌆', color: '#475569',
    foods: ['Vada Pav', 'Pav Bhaji', 'Bhel Puri', 'Misal Pav', 'Bombay Sandwich', 'Keema Pav'],
    description: 'Mumbai never sleeps, and neither does its food. The Vada Pav — a spiced potato fritter in a soft bun — is the city\'s heartbeat. Pav Bhaji on Marine Drive is iconic.' },
  { id: 30, city: 'Pune', state: 'Maharashtra', emoji: '🎓', color: '#0f766e',
    foods: ['Misal Pav', 'Sabudana Khichdi', 'Puran Poli', 'Thalipeeth', 'Shrikhand', 'Kolhapuri Misal'],
    description: 'Pune\'s food identity is built around the fiery Misal Pav — sprouted moth beans in spicy gravy, topped with farsan, onion, and lemon. Every shop has its own secret recipe.' },
  { id: 31, city: 'Kolhapur', state: 'Maharashtra', emoji: '🔥', color: '#b91c1c',
    foods: ['Tambda Rassa', 'Pandhra Rassa', 'Kolhapuri Chicken', 'Misal', 'Sol Kadhi', 'Mutton Sukka'],
    description: 'Kolhapur\'s legendary Tambda (red) and Pandhra (white) Rassa are fiery and creamy curries that form a unique duo found nowhere else in India — a true culinary experience.' },
  { id: 32, city: 'Nagpur', state: 'Maharashtra', emoji: '🍊', color: '#d97706',
    foods: ['Saoji Chicken', 'Tarri Poha', 'Varhadi Mutton', 'Orange Barfi', 'Zunka Bhakar', 'Patodi Rassa'],
    description: 'Nagpur is the orange capital of India, but its ferociously spiced Saoji Chicken Curry — a 6-lakh residents\' favorite — is what truly makes this city\'s food scene extraordinary.' },

  // ── Gujarat ────────────────────────────────────────────────────────────────
  { id: 33, city: 'Ahmedabad', state: 'Gujarat', emoji: '🦁', color: '#ca8a04',
    foods: ['Fafda-Jalebi', 'Dhokla', 'Khaman', 'Thepla', 'Undhiyu', 'Khandvi'],
    description: 'Ahmedabad is the snack capital of India. Every Sunday morning begins with the iconic Fafda-Jalebi ritual that brings the entire city together in joyous street-side feasting.' },
  { id: 34, city: 'Surat', state: 'Gujarat', emoji: '💎', color: '#059669',
    foods: ['Locho', 'Surti Ponk', 'Ghari Sweet', 'Khaman', 'Ponk Vada', 'Surti Undhiyu'],
    description: 'Surat has India\'s most vibrant mid-day snack culture. Locho — a steamed chickpea flour snack drowning in butter — and seasonal Ponk (fresh sorghum) are uniquely Surti.' },

  // ── Rajasthan ──────────────────────────────────────────────────────────────
  { id: 35, city: 'Jaipur', state: 'Rajasthan', emoji: '🏰', color: '#e86339',
    foods: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Pyaaz Kachori', 'Ker Sangri', 'Mawa Kachori'],
    description: 'Jaipur\'s royal Rajput cuisine is rich and aromatic. Dal Baati Churma — wheat balls baked over fire with five-pulse dal and sweet churma — is the state\'s grandest meal.' },
  { id: 36, city: 'Jodhpur', state: 'Rajasthan', emoji: '🔵', color: '#2563eb',
    foods: ['Makhaniya Lassi', 'Mirchi Bada', 'Mawa Kachori', 'Pyaaz Kachori', 'Rabri', 'Gatte Ki Sabzi'],
    description: 'Jodhpur is famous for its fiery Mirchi Badas — large green chillies stuffed with spiced potato, battered and deep-fried — balanced perfectly by its ultra-creamy Makhaniya Lassi.' },
  { id: 37, city: 'Udaipur', state: 'Rajasthan', emoji: '🌊', color: '#7c3aed',
    foods: ['Dal Baati', 'Bhutte Ka Kees', 'Malpua', 'Daal Dhokli', 'Gatte Ki Sabzi', 'Churma Laddu'],
    description: 'Lakeside Udaipur serves classic Rajasthani meals alongside Bhutte Ka Kees — grated corn cooked in milk and spiced with mustard — a unique dish tied to the region\'s harvest.' },
  { id: 38, city: 'Jaisalmer', state: 'Rajasthan', emoji: '🏜️', color: '#b45309',
    foods: ['Ker Sangri', 'Bajra Roti', 'Panchkuta', 'Gatte Ki Sabzi', 'Raab', 'Moong Dal Halwa'],
    description: 'In the golden Thar desert, Jaisalmer\'s cuisine is born of survival — sun-dried berries, desert beans, and millet breads slow-cooked in earthen pots over camel-dung fires.' },

  // ── Uttar Pradesh ──────────────────────────────────────────────────────────
  { id: 39, city: 'Lucknow', state: 'Uttar Pradesh', emoji: '🌙', color: '#b45309',
    foods: ['Galauti Kebab', 'Lucknowi Biryani', 'Basket Chaat', 'Nihari', 'Sheer Khurma', 'Kulcha Nahari'],
    description: 'Lucknow\'s Nawabi cuisine is India\'s most refined. The Galauti Kebab — made from 160 spices, so tender it was designed for a toothless Nawab — defines the city\'s culinary soul.' },
  { id: 40, city: 'Varanasi', state: 'Uttar Pradesh', emoji: '🪔', color: '#c2410c',
    foods: ['Baati Chokha', 'Tamatar Chaat', 'Malaiyo', 'Banarasi Lassi', 'Kachori Sabzi', 'Chena Dahi Vada'],
    description: 'Varanasi\'s Malaiyo — a saffron-scented whipped milk foam — exists only in winter mornings by the ghats. Its Tamatar Chaat and thick clay-pot Lassi are irreplaceable experiences.' },
  { id: 41, city: 'Agra', state: 'Uttar Pradesh', emoji: '🏛️', color: '#dc2626',
    foods: ['Petha', 'Bedai Sabzi', 'Puri Aloo', 'Jalebi', 'Agra Ka Dalmoth', 'Rewari'],
    description: 'Agra is famous beyond the Taj — its iconic white Petha (pumpkin candy) has been made for 400+ years. Bedai with spiced aloo sabzi is the breakfast that wakes up the whole city.' },

  // ── Punjab ─────────────────────────────────────────────────────────────────
  { id: 42, city: 'Amritsar', state: 'Punjab', emoji: '⭐', color: '#ca8a04',
    foods: ['Amritsari Kulcha', 'Butter Chicken', 'Sarson Da Saag & Makki Roti', 'Lassi', 'Jalebi Rabri', 'Amritsari Fish'],
    description: 'Amritsar\'s stuffed Kulcha with white butter and chickpea curry, eaten at the Golden Temple langar or at tiny old-city shops, is one of India\'s most iconic breakfast experiences.' },

  // ── West Bengal ───────────────────────────────────────────────────────────
  { id: 43, city: 'Kolkata', state: 'West Bengal', emoji: '🎨', color: '#b91c1c',
    foods: ['Kathi Roll', 'Mishti Doi', 'Rasgulla', 'Macher Jhol', 'Puchka', 'Kosha Mangsho'],
    description: 'Kolkata is India\'s undisputed street food capital. Its Puchka (pani puri with tangy tamarind water), Kathi Rolls, and Kosha Mangsho tell the story of a city that lives to eat.' },
  { id: 44, city: 'Darjeeling', state: 'West Bengal', emoji: '☕', color: '#0f766e',
    foods: ['Darjeeling Tea', 'Steamed Momos', 'Thukpa', 'Gundruk Soup', 'Sel Roti', 'Chhurpi Snack'],
    description: 'Darjeeling\'s mountain cuisine pairs the world\'s finest muscatel tea with hearty steamed Momos. Thukpa noodle soup is the ultimate remedy against the Himalayan chill.' },

  // ── Delhi ──────────────────────────────────────────────────────────────────
  { id: 45, city: 'New Delhi', state: 'Delhi', emoji: '🏛️', color: '#7c3aed',
    foods: ['Chole Bhature', 'Butter Chicken', 'Paranthe Wali Gali Parathas', 'Dahi Bhalle', 'Aloo Tikki Chaat', 'Nihari'],
    description: 'Delhi\'s Chandni Chowk is a food pilgrimage — Paranthe Wali Gali\'s 150-year-old shops, Jama Masjid Nihari, and Karim\'s Mutton Burra make Old Delhi a UNESCO-worthy food district.' },

  // ── Bihar ──────────────────────────────────────────────────────────────────
  { id: 46, city: 'Patna', state: 'Bihar', emoji: '📚', color: '#c2410c',
    foods: ['Litti Chokha', 'Sattu Sharbat', 'Thekua', 'Khaja', 'Chura Dahi', 'Dal Puri'],
    description: 'Patna\'s Litti Chokha — wheat balls roasted over charcoal, served with smoky roasted brinjal mash and desi ghee — is one of India\'s most satisfying, wholesome street meals.' },

  // ── Madhya Pradesh ────────────────────────────────────────────────────────
  { id: 47, city: 'Indore', state: 'Madhya Pradesh', emoji: '🥘', color: '#7c3aed',
    foods: ['Poha-Jalebi', 'Garadu', 'Bhutte Ka Kees', 'Shikanji', 'Dal Bafla', 'Sabudana Khichdi'],
    description: 'Indore is officially India\'s cleanest and best street food city. Sarafa Bazaar transforms at night into a food paradise where Garadu (spiced fried yam) and Shikanji reign supreme.' },
  { id: 48, city: 'Bhopal', state: 'Madhya Pradesh', emoji: '🏞️', color: '#475569',
    foods: ['Bhopal Biryani', 'Bafla', 'Seekh Kabab', 'Mawa Bati', 'Chakki Ki Shak', 'Rogan Josh'],
    description: 'Bhopal\'s Nawabi culinary heritage produces aromatic Biryani and silky Seekh Kababs. The city\'s Muslim food culture makes it a hidden gem for North Indian meat dishes.' },

  // ── Odisha ────────────────────────────────────────────────────────────────
  { id: 49, city: 'Bhubaneswar', state: 'Odisha', emoji: '🛕', color: '#d97706',
    foods: ['Dalma', 'Pakhala Bhata', 'Chhena Poda', 'Rasabali', 'Chungdi Malai', 'Besara'],
    description: 'Bhubaneswar proudly serves Pakhala — fermented rice with curd and water — especially in summer. Chhena Poda (burnt cottage cheese cake) is Odisha\'s greatest dessert invention.' },

  // ── Goa ───────────────────────────────────────────────────────────────────
  { id: 50, city: 'Panaji', state: 'Goa', emoji: '🏖️', color: '#0891b2',
    foods: ['Goan Fish Curry Rice', 'Bebinca', 'Sorpotel', 'Xacuti Chicken', 'Vindaloo', 'Ros Omelette'],
    description: 'Goa\'s cuisine is a stunning Portuguese-Indian fusion. Vindaloo (from Portuguese vinha d\'alhos), Bebinca layered coconut cake, and cashew feni make Goa a unique culinary universe.' },

  // ── Jammu & Kashmir ───────────────────────────────────────────────────────
  { id: 51, city: 'Srinagar', state: 'Jammu & Kashmir', emoji: '🌷', color: '#9333ea',
    foods: ['Rogan Josh', 'Yakhni', 'Dum Aloo', 'Gushtaba', 'Kahwa Tea', 'Shab Degh'],
    description: 'Srinagar\'s Wazwan is India\'s grandest multi-course feast with 36 dishes. Gushtaba — minced mutton balls in yogurt gravy — is the royal finale that concludes every Wazwan banquet.' },

  // ── Assam ─────────────────────────────────────────────────────────────────
  { id: 52, city: 'Guwahati', state: 'Assam', emoji: '🌿', color: '#059669',
    foods: ['Masor Tenga', 'Duck Curry with Kumura', 'Aloo Pitika', 'Pitha', 'Bamboo Shoot Curry', 'Haah Diya Poitabhat'],
    description: 'Guwahati\'s Assamese cuisine is light, fresh, and unique. Masor Tenga — a tangy fish curry with lemon or tomato — is refreshingly different from any other regional fish preparation.' },

  // ── Himachal Pradesh ──────────────────────────────────────────────────────
  { id: 53, city: 'Shimla', state: 'Himachal Pradesh', emoji: '🏔️', color: '#7c3aed',
    foods: ['Chha Gosht', 'Sidu', 'Babru', 'Aktori', 'Bhey (Lotus Stem)', 'Madra'],
    description: 'Shimla\'s mountain cuisine revolves around Sidu — a fermented wheat bread stuffed with poppy seeds and ghee — and the marinated lamb Chha Gosht, a true Himachali delicacy.' },

  // ── Uttarakhand ───────────────────────────────────────────────────────────
  { id: 54, city: 'Dehradun', state: 'Uttarakhand', emoji: '🌲', color: '#16a34a',
    foods: ['Aloo Ke Gutke', 'Kafuli', 'Chainsoo', 'Jhangora Ki Kheer', 'Bal Mithai', 'Singori'],
    description: 'Dehradun\'s Kafuli (spinach-fenugreek gravy) and Aloo Ke Gutke (spiced pan-fried potatoes) are comforting Pahadi staples, while Bal Mithai is the region\'s most loved sweet.' },

  // ── Sikkim ────────────────────────────────────────────────────────────────
  { id: 55, city: 'Gangtok', state: 'Sikkim', emoji: '🏔️', color: '#0891b2',
    foods: ['Phagshapa', 'Thukpa', 'Steamed Momos', 'Sha Phaley', 'Gundruk Soup', 'Chhurpi Chutney'],
    description: 'Gangtok\'s Himalayan cuisine centers on warming Thukpa and pork Phagshapa — dry pork strips cooked with dried chillies and radish. The local fermented cheese Chhurpi is addictive.' },

  // ── Meghalaya ─────────────────────────────────────────────────────────────
  { id: 56, city: 'Shillong', state: 'Meghalaya', emoji: '🌧️', color: '#4f46e5',
    foods: ['Jadoh', 'Dohneiiong (Black Sesame Pork)', 'Dohkhlieh', 'Nakham Bitchi', 'Minil Songa', 'Tungrymbai'],
    description: 'Shillong\'s Jadoh — rice cooked with pork intestines and blood — and the rich black sesame pork Dohneiiong are bold, smoky Khasi tribal dishes unlike anything else in India.' },

  // ── Nagaland ──────────────────────────────────────────────────────────────
  { id: 57, city: 'Kohima', state: 'Nagaland', emoji: '🌶️', color: '#b91c1c',
    foods: ['Smoked Pork with Bamboo Shoot', 'Galho Porridge', 'Zutho Rice Beer', 'Axone (Fermented Soybean)', 'Anishi', 'Naga Chilli Chutney'],
    description: 'Kohima\'s warrior cuisine is defined by Axone (fermented soybean) and Smoked Pork cooked with fiery Naga Bhut Jolokia — the world\'s hottest chilli. This is not food for the faint-hearted.' },

  // ── Manipur ───────────────────────────────────────────────────────────────
  { id: 58, city: 'Imphal', state: 'Manipur', emoji: '🎭', color: '#a21caf',
    foods: ['Eromba', 'Singju Salad', 'Ngari Fermented Fish', 'Chak-hao Kheer (Black Rice)', 'Paknam', 'Iromba'],
    description: 'Imphal\'s cuisine is as vivid as its festivals. Chak-hao (black rice) Kheer has a gorgeous purple hue and nutty taste. The pungent Ngari fermented fish paste defines all Meitei cooking.' },

  // ── Ladakh ────────────────────────────────────────────────────────────────
  { id: 59, city: 'Leh', state: 'Ladakh', emoji: '🌌', color: '#374151',
    foods: ['Skyu (Wheat Noodle Stew)', 'Tsampa', 'Thukpa', 'Butter Tea (Gur-Gur Chai)', 'Chhurpe', 'Paba'],
    description: 'At 3500m altitude, Leh\'s cuisine is built for warmth and energy. Butter Tea (salted, with yak butter) is an acquired taste but essential for acclimatization in the thin mountain air.' },

  // ── Puducherry ────────────────────────────────────────────────────────────
  { id: 60, city: 'Puducherry', state: 'Puducherry', emoji: '🥐', color: '#b45309',
    foods: ['French Crepes', 'Bouillabaisse', 'Pondicherry Prawn Masala', 'Crispy Dosai', 'Cafe au Lait', 'Gateau Sec'],
    description: 'Puducherry is India\'s only city where French bakeries sit beside Tamil idli shops. The fusion of Crepes, Bouillabaisse, and Tamil Prawn Masala makes it a one-of-a-kind food destination.' },

  // ── Arunachal Pradesh ─────────────────────────────────────────────────────
  { id: 61, city: 'Itanagar', state: 'Arunachal Pradesh', emoji: '🌿', color: '#15803d',
    foods: ['Thukpa', 'Apong Rice Beer', 'Pika Pila (Fermented Bamboo)', 'Zan Millet Porridge', 'Lukter', 'Marua Beer'],
    description: 'Itanagar\'s tribal cuisine connects you to ancient Arunachali forest culture — fermented bamboo Pika Pila and millet-based Zan porridge are ingredients of a 2000-year-old food tradition.' },

  // ── Jharkhand ─────────────────────────────────────────────────────────────
  { id: 62, city: 'Ranchi', state: 'Jharkhand', emoji: '⛰️', color: '#0f766e',
    foods: ['Rugra Mushroom Curry', 'Handia Rice Beer', 'Pittha', 'Dhuska', 'Chakuli', 'Litti Chokha'],
    description: 'Ranchi\'s tribal food is extraordinary — Rugra (wild forest mushrooms) cooked in indigenous spices and the fermented rice drink Handia are authentic experiences found nowhere else.' },

  // ── Chhattisgarh ──────────────────────────────────────────────────────────
  { id: 63, city: 'Raipur', state: 'Chhattisgarh', emoji: '🌾', color: '#16a34a',
    foods: ['Chila (Rice Crepes)', 'Bafauri', 'Fara Steamed Dumplings', 'Muthiya', 'Aamat Curry', 'Bore Baasi'],
    description: 'Raipur\'s rice-based tribal cuisine reflects Chhattisgarh\'s deep agricultural identity. Bore Baasi (fermented rice water with curd) and Chila crepes are daily staples of millions.' },

  // ── Andaman & Nicobar ─────────────────────────────────────────────────────
  { id: 64, city: 'Port Blair', state: 'Andaman & Nicobar', emoji: '🏝️', color: '#0891b2',
    foods: ['Grilled Lobster', 'Coconut Prawn Curry', 'Red Snapper Fry', 'Jackfruit Biryani', 'Coconut Rice', 'Amle Ka Achar'],
    description: 'Port Blair\'s island cuisine is a seafood lover\'s paradise. Fresh lobster, coconut prawn curry, and spiced red snapper cooked with island spices make every meal a tropical luxury.' },

  // ── Tripura ───────────────────────────────────────────────────────────────
  { id: 65, city: 'Agartala', state: 'Tripura', emoji: '🎋', color: '#7c3aed',
    foods: ['Wahan Mosdeng', 'Chakhwi', 'Bangui Rice', 'Muya Awandru (Bamboo Shoot)', 'Gudok', 'Berma Fish Paste'],
    description: 'Agartala\'s unique cuisine fuses Bengali and tribal Tripuri influences — the smoky Gudok (dried fish and bamboo shoot stew) and pungent Berma fish paste define authentic Tripuri cooking.' },
];

const allStates = ['All States', ...new Set(cityFoodData.map(c => c.state))].sort((a, b) => a === 'All States' ? -1 : a.localeCompare(b));

// ── Notification Toast ────────────────────────────────────────────────────────
const FoodNotification = ({ notif, onClose }) => {
  useEffect(() => {
    if (!notif) return;
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [notif, onClose]);

  if (!notif) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 999,
      background: '#fff', borderRadius: 16, padding: '18px 22px', maxWidth: 340,
      boxShadow: '0 8px 40px rgba(0,0,0,0.18)', border: `2px solid ${notif.color}`,
      animation: 'slideIn 0.4s cubic-bezier(.34,1.56,.64,1)'
    }}>
      <style>{`@keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}} @keyframes shrink{from{width:100%}to{width:0%}}`}</style>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28 }}>{notif.emoji}</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: '#666', letterSpacing: 1, textTransform: 'uppercase' }}>📍 You arrived in {notif.city}</p>
          <p style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800, color: '#111' }}>Try these local specialties!</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {notif.foods.slice(0, 3).map((f, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: `${notif.color}18`, color: notif.color, border: `1px solid ${notif.color}40` }}>{f}</span>
            ))}
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#999', lineHeight: 1 }}>×</button>
      </div>
      <div style={{ marginTop: 12, height: 3, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: notif.color, borderRadius: 2, animation: 'shrink 5s linear forwards' }} />
      </div>
    </div>
  );
};

// ── City Card ─────────────────────────────────────────────────────────────────
const CityCard = ({ city, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(city)}
    className={`cursor-pointer rounded-2xl border transition-all duration-200 p-5 ${isSelected ? 'shadow-lg' : 'hover:-translate-y-1 hover:shadow-md bg-bg-primary border-black/10'}`}
    style={isSelected ? { border: `2px solid ${city.color}`, background: `${city.color}0d`, boxShadow: `0 6px 24px ${city.color}28` } : {}}
  >
    <div className="flex justify-between items-start mb-3">
      <span style={{ fontSize: 26 }}>{city.emoji}</span>
      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${city.color}18`, color: city.color, border: `1px solid ${city.color}30` }}>{city.state}</span>
    </div>
    <h3 className="font-serif font-bold text-text-primary text-base mb-1">{city.city}</h3>
    <p className="text-text-muted text-xs italic mb-3">{city.foods[0]} · {city.foods[1]}</p>
    <div className="flex flex-wrap gap-1">
      {city.foods.slice(0, 2).map((f, i) => (
        <span key={i} className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${city.color}12`, color: city.color }}>{f}</span>
      ))}
      {city.foods.length > 2 && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted">+{city.foods.length - 2}</span>}
    </div>
  </div>
);

// ── Detail Panel ──────────────────────────────────────────────────────────────
const DetailPanel = ({ city, onNotify }) => {
  if (!city) return (
    <div className="flex flex-col items-center justify-center h-full min-h-64 gap-3 text-text-muted">
      <span style={{ fontSize: 52, opacity: 0.3 }}>🗺️</span>
      <p className="font-serif font-bold text-lg text-text-primary">Select a city to explore</p>
      <p className="text-sm">Click any city card to see its best local dishes</p>
    </div>
  );
  const icons = ['🥘','🍛','🥗','🍜','🍮','🧆','🥙','🥞','🫕','🍲','🥣','🍱'];
  return (
    <div>
      <div className="rounded-2xl p-6 mb-4 border" style={{ background: `${city.color}0c`, border: `1px solid ${city.color}30` }}>
        <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 36 }}>{city.emoji}</span>
            <div>
              <h2 className="font-serif font-bold text-2xl text-text-primary">{city.city}</h2>
              <p className="text-sm font-bold" style={{ color: city.color }}>{city.state}</p>
            </div>
          </div>
          <button
            onClick={() => onNotify(city)}
            className="flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: city.color, boxShadow: `0 4px 16px ${city.color}50` }}
          >
            🔔 Simulate Arrival
          </button>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">{city.description}</p>
      </div>
      <div className="bg-bg-secondary rounded-2xl p-5 border border-black/5">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">🍽️ Must-Try Dishes</h3>
        <div className="grid grid-cols-2 gap-2">
          {city.foods.map((food, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-bg-primary rounded-xl border border-black/5">
              <span style={{ fontSize: 18 }}>{icons[i % icons.length]}</span>
              <span className="text-sm font-semibold text-text-primary">{food}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const CityFoodExplorer = () => {
  const [search, setSearch]           = useState('');
  const [selState, setSelState]       = useState('All States');
  const [selectedCity, setSelectedCity] = useState(null);
  const [notif, setNotif]             = useState(null);
  const [notifKey, setNotifKey]       = useState(0);

  const filtered = cityFoodData.filter(c => {
    const q = search.toLowerCase();
    const matchQ = c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q) || c.foods.some(f => f.toLowerCase().includes(q));
    const matchS = selState === 'All States' || c.state === selState;
    return matchQ && matchS;
  });

  const handleNotify = (city) => { setNotif(city); setNotifKey(k => k + 1); };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-16">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center py-12 mb-8">
          <span className="inline-block text-xs font-bold tracking-widest uppercase bg-bg-secondary border border-black/10 text-text-muted px-4 py-2 rounded-full mb-5">📍 City Food Guide · 65+ Cities</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Discover India's <span className="text-accent-terra">City Flavors</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Traveling to a new city? Find its iconic local dishes and simulate the food notification you'd get on arrival — from Andhra Pradesh to Ladakh.
          </p>
          <div className="flex justify-center gap-12 mt-8">
            {[['65+','Cities'],['28+','States & UTs'],['350+','Dishes']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-serif font-bold text-accent-terra">{n}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-text-muted mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 p-5 bg-bg-secondary rounded-2xl border border-black/5">
          <div className="relative flex-1">
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search city, state or dish…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-black/10 rounded-xl text-sm outline-none focus:border-accent-terra transition-colors" />
          </div>
          <select value={selState} onChange={e => setSelState(e.target.value)}
            className="px-4 py-3 bg-bg-primary border border-black/10 rounded-xl text-sm outline-none cursor-pointer focus:border-accent-terra transition-colors min-w-48">
            {allStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex items-center text-sm text-text-muted font-semibold px-2 whitespace-nowrap">{filtered.length} cities</div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* City Grid */}
          <div className="flex-[1.3] min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-bg-secondary rounded-2xl border border-dashed border-black/20">
                <p className="text-4xl mb-3">🤔</p>
                <p className="font-serif font-bold text-text-primary">No cities found</p>
                <p className="text-text-muted text-sm">Try a different search term or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(city => <CityCard key={city.id} city={city} isSelected={selectedCity?.id === city.id} onSelect={setSelectedCity} />)}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="flex-1 min-w-72 lg:sticky lg:top-24">
            <div className="bg-bg-primary rounded-2xl border border-black/10 p-6 shadow-sm min-h-64">
              <DetailPanel city={selectedCity} onNotify={handleNotify} />
            </div>
            {!selectedCity && (
              <div className="mt-4 bg-bg-secondary rounded-2xl border border-black/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">How it works</p>
                {[['🗺️','Browse 65+ cities across India'],['🍽️','Discover authentic local dishes'],['🔔','Click "Simulate Arrival" for a notification'],['🌶️','Never miss a local specialty again!']].map(([ic, tx]) => (
                  <div key={tx} className="flex items-center gap-3 mb-2.5">
                    <span className="text-lg w-7 text-center">{ic}</span>
                    <span className="text-sm text-text-secondary">{tx}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FoodNotification key={notifKey} notif={notif} onClose={() => setNotif(null)} />
    </div>
  );
};

export default CityFoodExplorer;
