import Header from "../components/header";
import MatchList from "../components/match-list";
import Nav from "../components/nav";

function Dashboard() {
  return (
    <div>
      <Header />
      <MatchList />
      <Nav selectedPage={1} />
    </div>
  );
}

export default Dashboard;
