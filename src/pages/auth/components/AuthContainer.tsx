import React from "react";

type AuthContainerProps = React.PropsWithChildren & { title: string }
const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  return (
    <div>
      Container

      <h1>{props.title}</h1>

      <div>
        {props.children}
      </div>
    </div>
  )
}

export default AuthContainer