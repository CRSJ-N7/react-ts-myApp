import { CardContent, Card, Typography } from "@mui/material";

type AuthContainerProps = React.PropsWithChildren & { title: string }
const AuthContainer: React.FC<AuthContainerProps> = (props) => {
 
  return (
    <Card elevation={24} sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {props.title}
        </Typography>
        <div>
          {props.children}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthContainer;
