import {
  Avatar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Logo from "../../../../assets/imgs/nota-premiada-logo.svg";
import Perfil from "../../../../assets/imgs/homem-quadrada.jpg";
import { AppContext } from "../../../../Context/AppContext";
import { useContext } from "react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface NotaAppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("md")]: {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
}));

export default function UserAppBar({ open, toggleDrawer }: NotaAppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <AppBar position="relative" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
          background: "#224B89",
        }}
      >
        {/* menu sanduíche */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: isMobile ? 0 : "36px",
            ...(open && { display: { md: "none" } }),
          }}
        >
          {open ?
            (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
        </IconButton>

        {/* Logo */}
        <Typography
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={Logo} height={"40em"} />
        </Typography>

        {/* ícone de notificação */}
        <IconButton sx={{ mx: 1 }}>
          <Badge badgeContent={4} color="warning">
            <NotificationsIcon sx={{ color: "#fff", fontSize: "1em" }} />
          </Badge>
        </IconButton>

        <Avatar variant="circular" src={Perfil} sx={{ mx: 1 }} />

        <Typography sx={{ fontWeight: "bold" }}>Fulano</Typography>
      </Toolbar>
    </AppBar>
  );
}
