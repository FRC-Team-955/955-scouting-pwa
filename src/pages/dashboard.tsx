import Header from "../components/header";
import MatchList from "../components/match-list";
import Nav from "../components/nav";

function Dashboard() {
  // the main page that is displayed on load
  // header contains the top two dropdowns, match list contains the matches and data entry, and nav is the bar at the bottom
  return (
    <div>
      <Header />
      <MatchList />
      <Nav selectedPage={1} />
    </div>
  );
}

export default Dashboard;
