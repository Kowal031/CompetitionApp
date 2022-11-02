import { CommonHeader } from "./components/common/CommonHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArbiterPage } from "./pages/ArbiterPage";
import { CompetitionResoultsPage } from "./pages/CompetitionResoultsPage";
import { CompetitionListPage } from "./pages/CompetitionListPage";
import { CompetitionDetailsPage } from "./pages/CompetitionDetailsPage";
function App() {
  return (
    <Router>
      <CommonHeader />
      <Routes>
        <Route exact path="/" element={<CompetitionListPage />}></Route>
        <Route
          exact
          path="/competition-details/:id"
          element={<CompetitionDetailsPage />}
        ></Route>
        <Route
          exact
          path="/competition-results/:id"
          element={<CompetitionResoultsPage />}
        ></Route>
        <Route exact path="/arbiter/:id" element={<ArbiterPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
