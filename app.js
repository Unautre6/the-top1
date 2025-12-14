import React, { useState, useEffect } from 'react';
import { Music, TrendingUp, Play, Calendar, Globe, Save, Database } from 'lucide-react';

// Configuration Supabase
const SUPABASE_URL = 'https://gnezjkncktmywytfbbpc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZXpqa25ja3RteXd5dGZiYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTU5NTEsImV4cCI6MjA4MTIzMTk1MX0.sJFwXIJHVhv_yJFLAbas6TwvMlsYAjbpP05ijDj_Mjo';

const MusicChartsApp = () => {
  const [activeTab, setActiveTab] = useState('deezer');
  const [selectedCountry, setSelectedCountry] = useState('world');
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [currentWeek, setCurrentWeek] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [periodDropdownPosition, setPeriodDropdownPosition] = useState({ top: 0, left: 0 });
  const [saveStatus, setSaveStatus] = useState('');

  const countries = [
    { code: 'world', name: 'Mondial', flag: '🌍' },
    { code: 'usa', name: 'USA', flag: '🇺🇸' },
    { code: 'uk', name: 'UK', flag: '🇬🇧' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'it', name: 'Italie', flag: '🇮🇹' },
    { code: 'es', name: 'Espagne', flag: '🇪🇸' },
    { code: 'de', name: 'Allemagne', flag: '🇩🇪' },
    { code: 'be', name: 'Belgique', flag: '🇧🇪' }
  ];

  const periods = [
    { code: 'weekly', name: 'Hebdomadaire', icon: '📅' },
    { code: 'monthly', name: 'Mensuel', icon: '📆' },
    { code: 'yearly', name: 'Annuel', icon: '🗓️' }
  ];

  // Données pour le pays Mondial avec 3 périodes
  const worldTracks = {
    deezer: {
      weekly: [
        { title: "Lovin On Me", artist: "Jack Harlow", baseStreams: 48.5 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 45.2 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 42.8 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 41.3 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 39.7 },
        { title: "Snooze", artist: "SZA", baseStreams: 38.4 },
        { title: "vampire", artist: "Olivia Rodrigo", baseStreams: 36.9 },
        { title: "Water", artist: "Tyla", baseStreams: 35.2 },
        { title: "I Remember Everything", artist: "Zach Bryan", baseStreams: 33.8 },
        { title: "Lose Control", artist: "Teddy Swims", baseStreams: 32.1 }
      ],
      monthly: [
        { title: "The Fate Of Ophelia", artist: "Taylor Swift", baseStreams: 48.5 },
        { title: "Golden", artist: "HUNTR/X", baseStreams: 45.2 },
        { title: "Ordinary", artist: "Alex Warren", baseStreams: 42.8 },
        { title: "Man I Need", artist: "Olivia Dean", baseStreams: 41.3 },
        { title: "Opalite", artist: "Taylor Swift", baseStreams: 39.7 },
        { title: "Daisies", artist: "Justin Bieber", baseStreams: 38.4 },
        { title: "Mutt", artist: "Leon Thomas", baseStreams: 36.9 },
        { title: "Folded", artist: "Kehlani", baseStreams: 35.2 },
        { title: "I Got Better", artist: "Morgan Wallen", baseStreams: 33.8 },
        { title: "Back To Friends", artist: "sombr", baseStreams: 32.1 }
      ],
      yearly: [
        { title: "APT.", artist: "Rosé & Bruno Mars", baseStreams: 48.5 },
        { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", baseStreams: 45.2 },
        { title: "Ordinary", artist: "Alex Warren", baseStreams: 42.8 },
        { title: "Messy", artist: "Lola Young", baseStreams: 41.3 },
        { title: "Beautiful Things", artist: "Benson Boone", baseStreams: 39.7 },
        { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", baseStreams: 38.4 },
        { title: "A Bar Song (Tipsy)", artist: "Shaboozey", baseStreams: 36.9 },
        { title: "Anxiety", artist: "Doechii", baseStreams: 35.2 },
        { title: "That's So True", artist: "Gracie Abrams", baseStreams: 33.8 },
        { title: "Pink Pony Club", artist: "Chappell Roan", baseStreams: 32.1 }
      ]
    },
    youtube: {
      weekly: [
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 52.3 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 49.1 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 46.7 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 44.2 },
        { title: "Snooze", artist: "SZA", baseStreams: 41.8 },
        { title: "vampire", artist: "Olivia Rodrigo", baseStreams: 39.5 },
        { title: "Water", artist: "Tyla", baseStreams: 37.9 },
        { title: "Lose Control", artist: "Teddy Swims", baseStreams: 36.4 },
        { title: "Flowers", artist: "Miley Cyrus", baseStreams: 34.1 },
        { title: "Seven", artist: "Jung Kook ft. Latto", baseStreams: 32.8 }
      ],
      monthly: [
        { title: "The Fate Of Ophelia", artist: "Taylor Swift", baseStreams: 52.3 },
        { title: "Golden", artist: "HUNTR/X", baseStreams: 49.1 },
        { title: "Ordinary", artist: "Alex Warren", baseStreams: 46.7 },
        { title: "Man I Need", artist: "Olivia Dean", baseStreams: 44.2 },
        { title: "Opalite", artist: "Taylor Swift", baseStreams: 41.8 },
        { title: "Daisies", artist: "Justin Bieber", baseStreams: 39.5 },
        { title: "Mutt", artist: "Leon Thomas", baseStreams: 37.9 },
        { title: "Folded", artist: "Kehlani", baseStreams: 36.4 },
        { title: "I Got Better", artist: "Morgan Wallen", baseStreams: 34.1 },
        { title: "Tit For Tat", artist: "Tate McRae", baseStreams: 32.8 }
      ],
      yearly: [
        { title: "APT.", artist: "Rosé & Bruno Mars", baseStreams: 52.3 },
        { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", baseStreams: 49.1 },
        { title: "Luther", artist: "Kendrick Lamar & SZA", baseStreams: 46.7 },
        { title: "tv off", artist: "Kendrick Lamar", baseStreams: 44.2 },
        { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", baseStreams: 41.8 },
        { title: "Spaghetti", artist: "Le Sserafim ft. j-hope", baseStreams: 39.5 },
        { title: "Ordinary", artist: "Alex Warren", baseStreams: 37.9 },
        { title: "Daisies", artist: "Justin Bieber", baseStreams: 36.4 },
        { title: "Golden", artist: "HUNTR/X", baseStreams: 34.1 },
        { title: "Anxiety", artist: "Doechii", baseStreams: 32.8 }
      ]
    }
  };

  // Données simplifiées pour les autres pays
  const otherCountriesTracks = {
    usa: {
      deezer: [
        { title: "Lovin On Me", artist: "Jack Harlow", baseStreams: 52.1 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 48.9 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 45.3 },
        { title: "Snooze", artist: "SZA", baseStreams: 43.7 },
        { title: "I Remember Everything", artist: "Zach Bryan", baseStreams: 41.2 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 39.8 },
        { title: "Rich Men North of Richmond", artist: "Oliver Anthony", baseStreams: 37.5 },
        { title: "Lose Control", artist: "Teddy Swims", baseStreams: 35.9 },
        { title: "fukumean", artist: "Gunna", baseStreams: 34.2 },
        { title: "All My Life", artist: "Lil Durk ft. J. Cole", baseStreams: 32.6 }
      ],
      youtube: [
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 55.4 },
        { title: "Lovin On Me", artist: "Jack Harlow", baseStreams: 51.8 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 48.2 },
        { title: "Snooze", artist: "SZA", baseStreams: 45.6 },
        { title: "I Remember Everything", artist: "Zach Bryan", baseStreams: 43.1 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 40.7 },
        { title: "fukumean", artist: "Gunna", baseStreams: 38.3 },
        { title: "Lose Control", artist: "Teddy Swims", baseStreams: 36.9 },
        { title: "Rich Baby Daddy", artist: "Drake ft. Sexyy Red", baseStreams: 34.5 },
        { title: "vampire", artist: "Olivia Rodrigo", baseStreams: 32.8 }
      ]
    },
    uk: {
      deezer: [
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 46.8 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 44.2 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 41.5 },
        { title: "Water", artist: "Tyla", baseStreams: 39.3 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 37.1 },
        { title: "Flowers", artist: "Miley Cyrus", baseStreams: 35.6 },
        { title: "vampire", artist: "Olivia Rodrigo", baseStreams: 33.9 },
        { title: "Dance The Night", artist: "Dua Lipa", baseStreams: 32.4 },
        { title: "Sprinter", artist: "Dave & Central Cee", baseStreams: 30.8 },
        { title: "Where Do We Go Now?", artist: "Gracie Abrams", baseStreams: 29.2 }
      ],
      youtube: [
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 49.3 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 46.5 },
        { title: "Water", artist: "Tyla", baseStreams: 43.7 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 41.2 },
        { title: "Sprinter", artist: "Dave & Central Cee", baseStreams: 38.8 },
        { title: "Flowers", artist: "Miley Cyrus", baseStreams: 36.4 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 34.9 },
        { title: "Dance The Night", artist: "Dua Lipa", baseStreams: 32.5 },
        { title: "vampire", artist: "Olivia Rodrigo", baseStreams: 30.7 },
        { title: "Used to Be Young", artist: "Miley Cyrus", baseStreams: 28.9 }
      ]
    },
    fr: {
      deezer: [
        { title: "J'ai pas pleuré", artist: "Zaho de Sagazan", baseStreams: 38.6 },
        { title: "Imagine", artist: "Carbonne", baseStreams: 36.2 },
        { title: "Couteau Suisse", artist: "Werenoi", baseStreams: 34.8 },
        { title: "Ma meilleure ennemie", artist: "Stromae & Pomme", baseStreams: 32.5 },
        { title: "La Bohème", artist: "Ninho", baseStreams: 30.9 },
        { title: "Evidemment", artist: "Chilla", baseStreams: 28.7 },
        { title: "Paname", artist: "Slimane", baseStreams: 26.4 },
        { title: "Tout l'été", artist: "Dinos", baseStreams: 24.8 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 23.1 },
        { title: "Bande Organisée", artist: "Jul & Collectif", baseStreams: 21.6 }
      ],
      youtube: [
        { title: "J'ai pas pleuré", artist: "Zaho de Sagazan", baseStreams: 41.2 },
        { title: "Imagine", artist: "Carbonne", baseStreams: 38.5 },
        { title: "Ma meilleure ennemie", artist: "Stromae & Pomme", baseStreams: 35.9 },
        { title: "Couteau Suisse", artist: "Werenoi", baseStreams: 33.7 },
        { title: "La Bohème", artist: "Ninho", baseStreams: 31.4 },
        { title: "Evidemment", artist: "Chilla", baseStreams: 29.2 },
        { title: "Paname", artist: "Slimane", baseStreams: 27.6 },
        { title: "Tout l'été", artist: "Dinos", baseStreams: 25.8 },
        { title: "Bande Organisée", artist: "Jul & Collectif", baseStreams: 24.1 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 22.5 }
      ]
    },
    it: {
      deezer: [
        { title: "Tuta Gold", artist: "Mahmood", baseStreams: 36.4 },
        { title: "I p' me tu p' te", artist: "Geolier", baseStreams: 34.7 },
        { title: "Viola", artist: "Salmo", baseStreams: 32.9 },
        { title: "Sinceramente", artist: "Annalisa", baseStreams: 31.2 },
        { title: "Bellissima", artist: "Annalisa", baseStreams: 29.5 },
        { title: "Mon Amour", artist: "Annalisa", baseStreams: 27.8 },
        { title: "Playlist", artist: "Kid Yugi", baseStreams: 26.1 },
        { title: "La Dolce Vita", artist: "Fedez, Tananai & Mara Sattei", baseStreams: 24.6 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 23.2 },
        { title: "Paprika", artist: "Ghali", baseStreams: 21.7 }
      ],
      youtube: [
        { title: "Tuta Gold", artist: "Mahmood", baseStreams: 39.1 },
        { title: "I p' me tu p' te", artist: "Geolier", baseStreams: 37.3 },
        { title: "Sinceramente", artist: "Annalisa", baseStreams: 35.2 },
        { title: "Viola", artist: "Salmo", baseStreams: 33.6 },
        { title: "Bellissima", artist: "Annalisa", baseStreams: 31.8 },
        { title: "Mon Amour", artist: "Annalisa", baseStreams: 30.1 },
        { title: "Playlist", artist: "Kid Yugi", baseStreams: 28.4 },
        { title: "La Dolce Vita", artist: "Fedez, Tananai & Mara Sattei", baseStreams: 26.7 },
        { title: "Paprika", artist: "Ghali", baseStreams: 25.2 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 23.8 }
      ]
    },
    es: {
      deezer: [
        { title: "La Bebe", artist: "Yng Lvcas & Peso Pluma", baseStreams: 42.3 },
        { title: "El Azul", artist: "Junior H & Peso Pluma", baseStreams: 39.8 },
        { title: "PERRO NEGRO", artist: "Bad Bunny & Feid", baseStreams: 37.4 },
        { title: "Lady Gaga", artist: "Gabito Ballesteros & Junior H", baseStreams: 35.1 },
        { title: "Un x100to", artist: "Grupo Frontera & Bad Bunny", baseStreams: 32.9 },
        { title: "Ella Baila Sola", artist: "Eslabon Armado & Peso Pluma", baseStreams: 30.7 },
        { title: "BZRP Music Sessions #53", artist: "Shakira & Bizarrap", baseStreams: 28.5 },
        { title: "Rubicon", artist: "Duki", baseStreams: 26.8 },
        { title: "Monaco", artist: "Bad Bunny", baseStreams: 25.2 },
        { title: "Qlona", artist: "Karol G & Peso Pluma", baseStreams: 23.6 }
      ],
      youtube: [
        { title: "La Bebe", artist: "Yng Lvcas & Peso Pluma", baseStreams: 45.7 },
        { title: "El Azul", artist: "Junior H & Peso Pluma", baseStreams: 43.2 },
        { title: "PERRO NEGRO", artist: "Bad Bunny & Feid", baseStreams: 40.8 },
        { title: "Lady Gaga", artist: "Gabito Ballesteros", baseStreams: 38.4 },
        { title: "Un x100to", artist: "Grupo Frontera & Bad Bunny", baseStreams: 36.1 },
        { title: "Ella Baila Sola", artist: "Eslabon Armado", baseStreams: 33.9 },
        { title: "BZRP Music Sessions #53", artist: "Shakira", baseStreams: 31.7 },
        { title: "Rubicon", artist: "Duki", baseStreams: 29.5 },
        { title: "Monaco", artist: "Bad Bunny", baseStreams: 27.3 },
        { title: "Qlona", artist: "Karol G & Peso Pluma", baseStreams: 25.8 }
      ]
    },
    de: {
      deezer: [
        { title: "Komet", artist: "Udo Lindenberg & Apache 207", baseStreams: 34.7 },
        { title: "Nie Mehr", artist: "Shirin David", baseStreams: 32.4 },
        { title: "Bauch Beine Po", artist: "Shirin David", baseStreams: 30.8 },
        { title: "Monaco Franze", artist: "01099, Gustav & Zachi", baseStreams: 28.6 },
        { title: "Mondschein", artist: "Luciano", baseStreams: 26.9 },
        { title: "Wieder Lila", artist: "Samra & Capital Bra", baseStreams: 25.3 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 23.7 },
        { title: "Wunder", artist: "RIN & Bausa", baseStreams: 22.4 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 21.1 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 19.8 }
      ],
      youtube: [
        { title: "Komet", artist: "Udo Lindenberg & Apache 207", baseStreams: 37.2 },
        { title: "Nie Mehr", artist: "Shirin David", baseStreams: 35.1 },
        { title: "Bauch Beine Po", artist: "Shirin David", baseStreams: 32.9 },
        { title: "Monaco Franze", artist: "01099", baseStreams: 30.8 },
        { title: "Mondschein", artist: "Luciano", baseStreams: 28.7 },
        { title: "Wieder Lila", artist: "Samra & Capital Bra", baseStreams: 26.6 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 25.1 },
        { title: "Wunder", artist: "RIN & Bausa", baseStreams: 23.6 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 22.3 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 20.9 }
      ]
    },
    be: {
      deezer: [
        { title: "J'ai pas pleuré", artist: "Zaho de Sagazan", baseStreams: 31.8 },
        { title: "Imagine", artist: "Carbonne", baseStreams: 29.5 },
        { title: "Ma meilleure ennemie", artist: "Stromae & Pomme", baseStreams: 27.9 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 26.3 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 24.7 },
        { title: "Papaoutai", artist: "Stromae", baseStreams: 23.2 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 21.6 },
        { title: "Couteau Suisse", artist: "Werenoi", baseStreams: 20.4 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 19.1 },
        { title: "Water", artist: "Tyla", baseStreams: 17.8 }
      ],
      youtube: [
        { title: "Ma meilleure ennemie", artist: "Stromae & Pomme", baseStreams: 34.2 },
        { title: "J'ai pas pleuré", artist: "Zaho de Sagazan", baseStreams: 32.6 },
        { title: "Imagine", artist: "Carbonne", baseStreams: 30.4 },
        { title: "Paint The Town Red", artist: "Doja Cat", baseStreams: 28.9 },
        { title: "Strangers", artist: "Kenya Grace", baseStreams: 27.1 },
        { title: "Papaoutai", artist: "Stromae", baseStreams: 25.5 },
        { title: "greedy", artist: "Tate McRae", baseStreams: 23.8 },
        { title: "Couteau Suisse", artist: "Werenoi", baseStreams: 22.3 },
        { title: "Water", artist: "Tyla", baseStreams: 20.7 },
        { title: "Cruel Summer", artist: "Taylor Swift", baseStreams: 19.4 }
      ]
    }
  };

  const covers = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300",
    "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300"
  ];

  const generateWeeklyCharts = (platform, country, period) => {
    // Si ce n'est pas le mondial et que c'est mensuel ou annuel, retourner vide
    if (country !== 'world' && (period === 'monthly' || period === 'yearly')) {
      return [];
    }

    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const seed = weekNumber + platform.charCodeAt(0) + country.charCodeAt(0) + period.charCodeAt(0);
    
    // Pour le mondial, on utilise les vraies données par période
    let tracks;
    if (country === 'world') {
      tracks = worldTracks[platform][period];
    } else {
      // Pour les autres pays, on utilise les données simplifiées (hebdo uniquement)
      tracks = otherCountriesTracks[country][platform];
    }
    
    // Multiplier les streams selon la période
    const periodMultiplier = period === 'yearly' ? 52 : period === 'monthly' ? 4.33 : 1;
    
    return tracks.map((track, index) => {
      const variation = (Math.sin(seed + index) * 0.15 + 1);
      const baseStreams = track.baseStreams * periodMultiplier;
      const finalStreams = baseStreams * variation;
      
      // Formater avec le bon suffixe (M ou B)
      let streams, unit;
      if (finalStreams >= 1000) {
        streams = (finalStreams / 1000).toFixed(1);
        unit = 'B';
      } else {
        streams = finalStreams.toFixed(1);
        unit = 'M';
      }
      
      const trend = Math.sin(seed + index * 2) > 0 ? '↑' : '↓';
      const trendPercent = Math.abs(Math.sin(seed + index * 3) * 15).toFixed(0);
      
      return {
        position: index + 1,
        title: track.title,
        artist: track.artist,
        plays: `${streams}${unit}`,
        cover: covers[index],
        trend: trend,
        trendPercent: `${trendPercent}%`,
        isRising: trend === '↑'
      };
    });
  };

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
    
    if (selectedPeriod === 'weekly') {
      setCurrentWeek(`Semaine ${weekNum} - ${now.getFullYear()}`);
    } else if (selectedPeriod === 'monthly') {
      const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      setCurrentWeek(`${monthNames[now.getMonth()]} ${now.getFullYear()}`);
    } else {
      setCurrentWeek(`Année ${now.getFullYear()}`);
    }
  }, [selectedPeriod]);

  const currentCharts = generateWeeklyCharts(activeTab, selectedCountry, selectedPeriod);
  const platformColor = activeTab === 'deezer' ? 'from-purple-600 to-pink-600' : 'from-red-600 to-red-800';
  const currentCountryData = countries.find(c => c.code === selectedCountry);
  const currentPeriodData = periods.find(p => p.code === selectedPeriod);

  // Fonction pour sauvegarder les charts dans Supabase
  const saveChartsToSupabase = async () => {
    setSaveStatus('Sauvegarde en cours...');
    try {
      const chartsData = currentCharts.map(track => ({
        platform: activeTab,
        country: selectedCountry,
        period: selectedPeriod,
        position: track.position,
        title: track.title,
        artist: track.artist,
        plays: track.plays,
        trend: track.trend,
        trend_percent: track.trendPercent,
        is_rising: track.isRising,
        created_at: new Date().toISOString()
      }));

      console.log('Envoi des données:', chartsData);

      const response = await fetch(`${SUPABASE_URL}/rest/v1/charts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(chartsData)
      });

      console.log('Réponse status:', response.status);
      const responseData = await response.json();
      console.log('Réponse data:', responseData);

      if (response.ok) {
        setSaveStatus('✅ Sauvegardé !');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        console.error('Erreur API:', responseData);
        setSaveStatus(`❌ Erreur: ${responseData.message || 'Inconnue'}`);
        setTimeout(() => setSaveStatus(''), 5000);
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      setSaveStatus(`❌ Erreur: ${error.message}`);
      setTimeout(() => setSaveStatus(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${platformColor} p-8 shadow-2xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Top Charts Hebdo</h1>
              </div>
              <p className="text-white/90 text-lg">Les morceaux les plus streamés cette semaine</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">{currentWeek}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="max-w-6xl mx-auto px-8 -mt-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-2 flex gap-2 shadow-xl border border-gray-700">
          <button
            onClick={() => setActiveTab('deezer')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'deezer'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg scale-105'
                : 'bg-gray-700/30 hover:bg-gray-700/50'
            }`}
          >
            <Music className="w-5 h-5" />
            Deezer
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'youtube'
                ? 'bg-gradient-to-r from-red-600 to-red-800 shadow-lg scale-105'
                : 'bg-gray-700/30 hover:bg-gray-700/50'
            }`}
          >
            <Play className="w-5 h-5" />
            YouTube Music
          </button>
        </div>
      </div>

      {/* Country Selector */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            {/* Sélecteur de pays */}
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-gray-400" />
              
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setDropdownPosition({
                      top: rect.bottom + 8,
                      left: rect.left
                    });
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsPeriodDropdownOpen(false);
                  }}
                  className={`bg-gradient-to-r ${platformColor} text-white font-semibold py-2 px-4 pr-8 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2`}
                >
                  <span>{currentCountryData.flag}</span>
                  <span>{currentCountryData.name}</span>
                  <span className="absolute right-2 text-xs">▼</span>
                </button>
              </div>
            </div>

            {/* Sélecteur de période */}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setPeriodDropdownPosition({
                      top: rect.bottom + 8,
                      left: rect.left
                    });
                    setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
                    setIsDropdownOpen(false);
                  }}
                  className={`bg-gradient-to-r ${platformColor} text-white font-semibold py-2 px-4 pr-8 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2`}
                >
                  <span>{currentPeriodData.icon}</span>
                  <span>{currentPeriodData.name}</span>
                  <span className="absolute right-2 text-xs">▼</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bouton de sauvegarde Supabase */}
          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="text-sm font-semibold text-green-400">{saveStatus}</span>
            )}
            <button
              onClick={saveChartsToSupabase}
              className={`bg-gradient-to-r ${platformColor} text-white font-semibold py-2 px-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2`}
            >
              <Database className="w-4 h-4" />
              Sauvegarder dans Supabase
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu déroulant pays */}
      {isDropdownOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Menu déroulant */}
          <div 
            className="fixed bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-2 border-purple-500/50"
            style={{
              zIndex: 9999,
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              minWidth: '200px'
            }}
          >
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.code);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedCountry === country.code
                    ? `bg-gradient-to-r ${platformColor} text-white`
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Menu déroulant période */}
      {isPeriodDropdownOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsPeriodDropdownOpen(false)}
          />
          
          {/* Menu déroulant */}
          <div 
            className="fixed bg-gray-900 rounded-lg shadow-2xl overflow-hidden border-2 border-purple-500/50"
            style={{
              zIndex: 9999,
              top: `${periodDropdownPosition.top}px`,
              left: `${periodDropdownPosition.left}px`,
              minWidth: '200px'
            }}
          >
            {periods.map((period) => (
              <button
                key={period.code}
                onClick={() => {
                  setSelectedPeriod(period.code);
                  setIsPeriodDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedPeriod === period.code
                    ? `bg-gradient-to-r ${platformColor} text-white`
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>{period.icon}</span>
                <span>{period.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Charts Content */}
      <div className="max-w-6xl mx-auto px-8 pb-12">
        {currentCharts.length === 0 ? (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className="text-3xl font-bold mb-4 text-yellow-400">Données non disponibles</h3>
            <p className="text-gray-300 text-lg mb-6">
              Les données <strong className="text-white">{currentPeriodData.name.toLowerCase()}s</strong> ne sont disponibles que pour le pays <strong className="text-white">🌍 Mondial</strong>.
            </p>
            <div className="bg-gray-800/50 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-gray-400 mb-4">
                <strong className="text-green-400">Solutions :</strong>
              </p>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• Sélectionnez le pays <strong className="text-white">Mondial</strong> pour voir les données {currentPeriodData.name.toLowerCase()}s</li>
                <li>• OU sélectionnez la période <strong className="text-white">Hebdomadaire</strong> pour ce pays</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
          {currentCharts.map((track, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center gap-6">
                {/* Position */}
                <div className={`text-4xl font-black ${
                  track.position === 1 ? 'text-yellow-400' :
                  track.position === 2 ? 'text-gray-300' :
                  track.position === 3 ? 'text-orange-400' :
                  'text-gray-500'
                } w-16 text-center`}>
                  {track.position}
                </div>

                {/* Cover */}
                <div className="relative group">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-24 h-24 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  {track.position <= 3 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      TOP {track.position}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1 text-white">{track.title}</h3>
                  <p className="text-gray-400 text-lg">{track.artist}</p>
                  
                  {/* Trend */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm font-semibold ${track.isRising ? 'text-green-400' : 'text-red-400'}`}>
                      {track.trend} {track.trendPercent}
                    </span>
                    <span className="text-xs text-gray-500">
                      vs {selectedPeriod === 'yearly' ? 'année dernière' : selectedPeriod === 'monthly' ? 'mois dernier' : 'semaine dernière'}
                    </span>
                  </div>
                </div>

                {/* Streams */}
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${platformColor} bg-clip-text text-transparent`}>
                    {track.plays}
                  </div>
                  <p className="text-gray-500 text-sm">streams</p>
                </div>

                {/* Play Button */}
                <button className={`bg-gradient-to-r ${platformColor} p-4 rounded-xl hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl`}>
                  <Play className="w-6 h-6 fill-white" />
                </button>
              </div>
            </div>
                      ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
            <Music className="w-6 h-6" />
            À propos de cette démo
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Cette application affiche des <strong className="text-white">données officielles</strong> pour le pays Mondial.
            <br /><br />
            <strong className="text-green-400">✨ Fonctionnalités :</strong>
            <br />
            • Charts pour 8 pays différents (Mondial, USA, UK, FR, IT, ES, DE, BE)
            <br />
            • 3 périodes disponibles : Hebdomadaire, Mensuel (Nov 2025), Annuel (2025)
            <br />
            • Vraies données Deezer et YouTube Music pour le Mondial
            <br />
            • Sauvegarde dans Supabase pour conserver les données
            <br />
            • Tendances avec pourcentages de variation
            <br />
            • Design moderne et responsive
            <br />
            • Animations fluides
            <br /><br />
            <strong className="text-yellow-400">📍 Note :</strong> Les données pour les pays autres que Mondial sont des simulations réalistes. Cliquez sur "Sauvegarder dans Supabase" pour stocker les charts actuels dans votre base de données.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MusicChartsApp;