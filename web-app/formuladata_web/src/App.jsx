import styles from "./style";
import { Hero } from "./components/Hero";
import { FantasyBuilder } from "./components/FantasyBuilder";
import { Navbar } from "./components/Navbar";
import { Api } from "./components/Api";
import { Feedback } from "./components/Feedback";
import { BugReports } from "./components/BugReports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="bg-primary w-full min-h-screen overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
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
              <Route path="/BugReports" element={<BugReports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
