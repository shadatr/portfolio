import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneIcon from "@mui/icons-material/Phone";
import { useRouter } from "next/navigation";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(`/#${newValue}`)
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className="fixed top-0 z-20 w-screen"
      sx={{
        color: "white",
        background: "#12041F",
        "& .MuiBottomNavigationAction-root.Mui-selected": {
          color: "#AF8FCF",
        },
        "& .MuiBottomNavigationAction-label.Mui-selected": {
          color: "#AF8FCF",
        },
      }}
    >
      <BottomNavigationAction
        sx={{
          color: "white",
        }}
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "white",
        }}
        label="About"
        value="about"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "white",
        }}
        label="Work"
        value="work"
        icon={<DevicesIcon />}
      />
      <BottomNavigationAction
        sx={{
          color: "white",
        }}
        label="Contact"
        value="contact"
        icon={<PhoneIcon />}
      />
    </BottomNavigation>
  );
}
