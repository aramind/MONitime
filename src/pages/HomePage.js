import WelcomeBackPage from "./home/WelcomeBackPage";
import TitlePage from "./home/TitlePage";
import { useValue } from "../context/ContextProvider";

const HomePage = () => {
  const {
    state: { currentUser },
  } = useValue();

  // useEffect = () => {};
  return <>{currentUser ? <WelcomeBackPage /> : <TitlePage />}</>;
};

export default HomePage;
