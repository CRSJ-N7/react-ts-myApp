import React from "react";
import { useUser } from "../store/main/hooks";
import { useAppDispatch } from "../store/store";
import mainThunks from "../store/main/mainThunks";
import SignInPage from "../pages/auth/SignInPage/SignInPage";

const App: React.FC = () => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const [isAuthorized, setIsAuthorized] = React.useState(false)

  React.useEffect(() => {
    const auth = async () => {
      try {
        await dispatch(mainThunks.getMe())
      } finally {
        setIsAuthorized(true)
      }
    }

    auth()
  }, [dispatch])

  if (!isAuthorized) {
    return null
  }

  return (
    <div>
      <h1>User:</h1>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <SignInPage />
    </div>
  )
}

export default App