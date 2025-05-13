import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';

type AuthContainerProps = React.PropsWithChildren & { title: string };
const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  return (
    <Card elevation={24} sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="primary">
          {props.title}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default AuthContainer;
