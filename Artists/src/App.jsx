import React,{ useState, createContext,useContext } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ArtistBlog from './components/ArtistBlog';
import About from './components/About';
import Footer from './components/Footer';

export const ThemeContext = createContext()
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const artists = {
    billie: {
      id: "billie",
      tour: "HIT ME HARD AND SOFT TOUR",
      img: "/public/hmhas.jpeg",
      artist: "Billie Eilish",
      description: {
        paraOne: "The Hit Me Hard and Soft Tour is Billie Eilish's ongoing concert series supporting her third studio album, Hit Me Hard and Soft. The tour commenced on September 29, 2024, in Quebec City and is scheduled to conclude on July 27, 2025, in Dublin, covering North America, Europe, and Oceania. Supporting acts include Nat & Alex Wolff, Towa Bird, The Marías, Ashnikko, and Finneas.",
        paraTwo: "Billie Eilish's third studio album, Hit Me Hard and Soft, released on May 17, 2024, delves into complex emotional themes, reflecting personal experiences through media perspectives. The album addresses issues such as body image, celebrity, and relationship dynamics, maintaining a candid and introspective tone. The shifting power dynamics are mirrored in its diverse musical arrangements, with tracks like 'Lunch' and 'Chihiro' demonstrating contrasting soundscapes.",
        paraThree: "Themes of culpability and the ambiguity of villainy in breakups are recurrent, and the songs often exhibit split personalities, such as in 'L'Amour de Ma Vie.' Eilish returns to her youthful essence while exploring macabre and intimate themes, blending vulnerability, frustration, and obsession to create a compelling and multifaceted album. The album's aesthetic is characterized by its dynamic shifts between soft, introspective melodies and bold, genre-bending anthems."
      },
      insta: { handle: "@billieeilish", link: "https://www.instagram.com/billieeilish/" }
    },
    theweeknd: {
      id: "theweeknd",
      tour: "AFTER HOURS TIL DAWN TOUR",
      img: "https://i.pinimg.com/736x/2c/6d/96/2c6d96ca06cc026bdd51ac08aae87dc0.jpg",
      artist: "The Weeknd",
      description: {
        paraOne: "The Weeknd's ongoing seventh concert tour, After Hours Til Dawn, supports his albums After Hours (2020), Dawn FM (2022), and Hurry Up Tomorrow (2025). The tour began on July 14, 2022, at Lincoln Financial Field and is set to conclude on July 27, 2025, at the 3Arena in Dublin. It includes over 110 shows across North America, Europe, Latin America, and Australia, featuring supporting acts such as Kaytranada, Mike Dean, and Playboi Carti.",
        paraTwo: "The Weeknd's sixth studio album, Hurry Up Tomorrow, released on January 31, 2025, serves as a profound conclusion to his musical journey under this moniker. Spanning 22 tracks over nearly 90 minutes, the album is an expansive exploration of themes such as fame, self-destruction, and redemption. Musically, it blends alternative R&B with synth-pop elements, creating a cinematic and pulsating atmosphere.",
        paraThree: "The album features collaborations with artists such as Lana Del Rey, Playboi Carti, Justice, Future, and Giorgio Moroder, adding depth and diversity to its soundscape. While the length and intensity of the album can be exhaustive, it stands as a substantial and deep work that encapsulates The Weeknd's complex lyricism and artistic evolution."
      },
      insta: { handle: "@theweeknd", link: "https://www.instagram.com/theweeknd/" }
    },
    cigsaftersex: {
      id: "cigsaftersex",
      tour: "CIGARETTES AFTER SEX TOUR",
      img: "https://i.pinimg.com/736x/66/5e/33/665e33b2224ffbf55a3f116013ea2160.jpg",
      artist: "Cigarettes After Sex",
      description: {
        paraOne: "Cigarettes After Sex is currently on their X's World Tour, promoting their third studio album, X's (2024). The tour commenced on August 31, 2024, in Montreal, Canada, and is scheduled to conclude on March 21, 2025, in Taoyuan, Taiwan. The setlist includes songs from their latest album, such as 'Tejano Blue' and 'Dark Vacay,' alongside fan favorites like 'Apocalypse' and 'You're All I Want.'",
        paraTwo: "Cigarettes After Sex's third studio album, X's, released on July 12, 2024, delves into themes of love, loss, and longing. The album opens with the title track 'X's,' setting an intimate atmosphere with a soft guitar introduction and Greg Gonzalez's hazy vocals gliding over a steady, pulsating bass line.",
        paraThree: "Throughout the album, the band maintains their signature dream-pop and slowcore fusion, creating a hypnotic and melancholic soundscape. While some critics note a lack of variation between tracks, the album is praised for its consistency and ability to capture the essence of a broken relationship."
      },
      insta: { handle: "@cigsaftersex", link: "https://www.instagram.com/cigsaftersex/" }
    },
    diljit: {
      id: "diljit",
      tour: "DIL-LUMINATI TOUR",
      img: 'https://i.pinimg.com/736x/5b/87/f7/5b87f7051758d845d75bd5fe9d6274ad.jpg',
      artist: "Diljit Dosanjh",
      description: {paraOne: "Punjabi music star Diljit Dosanjh embarked on the Dil-Luminati Tour in 2024, marking a significant milestone as the first Punjabi artist to headline major stadiums in Canada, including BC Place in Vancouver and Rogers Centre in Toronto. The tour commenced on April 27, 2024, in Vancouver and included 13 dates across North America, featuring performances in cities such as Winnipeg, Edmonton, Calgary, Oakland, Chicago, and Duluth. Diljit's shows are renowned for their high energy and have attracted international attention, with collaborations involving artists like Diplo and Sia.",
        paraTwo:"Diljit Dosanjh's album G.O.A.T., released on July 30, 2020, is a celebration of his 18-year journey in the music industry. The album blends traditional Punjabi music with contemporary beats, showcasing Diljit's versatility and commitment to his roots. The title track, 'G.O.A.T.,' is an energetic anthem reflecting his gratitude towards fans and his rise to stardom. Other notable tracks include 'Clash,' 'Navi Navi Yaari,' and 'Peed,' each highlighting different facets of love, friendship, and life's challenges.",
        paraThree: "The album's aesthetic is vibrant and celebratory, with music videos featuring dynamic visuals and choreography that pay homage to Punjabi culture. While the album stays true to his musical roots, it also incorporates modern elements, making it appealing to a broad audience."
      },
      insta: { handle: "@diljitdosanjh", link: "https://www.instagram.com/diljitdosanjh/" }
    },
    shawn: {
      id: "shawn",
      tour: "SHAWN MENDES 2025 TOUR",
      img: "https://i.pinimg.com/736x/45/89/20/458920588ea798314fd7ee1a1951f212.jpg",
      artist: "Shawn Mendes",
      description: {paraOne: "Shawn Mendes is set to perform at several major music festivals in 2025, including Lollapalooza India in Mumbai (March 8-9), Lollapalooza Argentina in Buenos Aires (March 21-23), and Lollapalooza Chile in Santiago (March 23). Fans can anticipate live renditions of his latest tracks from his 2024 album, 'Shawn.'",
        paraTwo:"Shawn Mendes' self-titled fifth studio album, Shawn, released on November 15, 2024, marks a significant departure from his previous pop-centric works. The album embraces a more stripped-down, acoustic sound, reflecting Mendes' personal growth and introspection. Themes of self-discovery, vulnerability, and emotional turbulence are prevalent throughout the album.",
        paraThree:"Notable tracks include 'Why Why Why' and 'Isn't That Enough,' which delve into personal reflections and internal struggles. The album also features a 1970s-inspired soft-rock ballad, 'Heart of Gold,' where Mendes mourns the loss of a childhood friend, and a gentle cover of Leonard Cohen's 'Hallelujah,' showcasing his vocal maturity and emotional depth. Overall, Shawn is a brave, understated, and deeply personal triumph that highlights Mendes' evolution as an artist."
      },
      insta: { handle: "@shawnmendes", link: "https://www.instagram.com/shawnmendes/" }
    },
    finneas: {
      id: "finneas",
      tour: "FOR CRYIN' OUT LOUD! THE TOUR",
      img: "https://shop.finneasofficial.com/cdn/shop/files/FINN-0005-2024-Tour-WebBanners-Desktop-2000x600-R1.png?v=1727828201&width=2000",
      artist: "Finneas",
      description: {
        paraOne: "Finneas, Grammy-winning producer and singer-songwriter, is embarking on his 2025 solo tour, promoting his upcoming album set to release later in the year. The tour will cover North America, Europe, and Asia, featuring an intimate live experience with stripped-down performances and orchestral arrangements of his signature songs.",
        paraTwo: "His previous album, Optimist (2021), showcased Finneas' introspective songwriting, blending alternative pop and acoustic-driven melodies. The upcoming album is expected to explore more experimental production techniques while maintaining his lyrical depth and emotional storytelling.",
        paraThree: "Finneas continues to push boundaries as both a solo artist and a collaborator. His distinctive production style and ability to craft deeply personal yet universal songs have solidified his reputation as one of the most influential musicians of his generation."
      },
      insta: { handle: "@finneas", link: "https://www.instagram.com/finneas/" }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}>
      <Navbar />
      <Sidebar />
      <div className="ml-64 p-4 pt-20"> {/* Adjust for sidebar and navbar */}
        <h1 className="text-4xl font-bold mb-8">Artists on Tour</h1>
        {Object.values(artists).map((artist, index) => (
          <ArtistBlog key={index} artist={artist} />
        ))}
        <About />
      </div>
      <Footer />
    </div>
    </ThemeContext.Provider>
  );
}

export default App;