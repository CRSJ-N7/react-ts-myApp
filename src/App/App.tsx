import React from "react";
import { useAppDispatch } from "../store/store";
import mainThunks from "../store/main/mainThunks";
import AppHeader from "./components/AppHeader";
import Router from "./Router/Router";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const auth = async () => {
      try {
        await dispatch(mainThunks.getMe());
      } finally {
        setIsAuthorized(true);
      }
    };

    auth();
  }, [dispatch]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <AppHeader />
      <Router />
    </div>
  );
};

export default App;
