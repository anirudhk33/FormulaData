import styles from "./style";
import { Hero } from "./components/Hero";
import { FantasyBuilder } from "./components/FantasyBuilder";
import { Navbar } from "./components/Navbar";
import { Api } from "./components/Api";
import Feedback from "./components/Feedback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="bg-primary w-full min-h-screen overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter} `}>
          <div className={`${styles.boxWidth} `}>
            <Navbar />
          </div>
        </div>
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            {/* Remove the <Hero /> component from here */}
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/Home" element={<Hero />} />
              <Route path="/FantasyBuilder" element={<FantasyBuilder />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/Api" element={<Api />} />
            </Routes>
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter} `}>
          <div className={`${styles.boxWidth} `}>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
