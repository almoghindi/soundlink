import ProfessionSplit from "../../features/admin/ProfessionSplit";
import AverageSwipes from "../../features/admin/AverageSwipes";
import CollabsCount from "../../features/admin/CollabsCount";
import NewUsersCount from "../../features/admin/NewUsersCount";
import "./style.css";
const AdminPage = () => {
  return (
    <div className="container-admin">
      <h1>Admin Page</h1>
      <div className="container-charts">
        <ProfessionSplit />
        <AverageSwipes />
        <CollabsCount />
        <NewUsersCount />
      </div>
    </div>
  );
};

export default AdminPage;
