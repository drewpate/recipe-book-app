import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Link,
} from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import NotesIcon from "@mui/icons-material/Notes";
import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const MyDrawer = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const data = [
    {
      name: "Home",
      icon: <HomeOutlined />,
    },
    { name: "Recipes", icon: <NotesIcon /> },
    { name: "New Recipe", icon: <CreateIcon /> },
  ];

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {currentUser ? (
        data.map((item, index) => (
          <Link
            key={index}
            underline="none"
            href={"/" + item.name.replace("Home", "").split(" ").join("")}
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))
      ) : (
        <Link key={1} underline="none" href={"/"}>
          <ListItem button>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
      )}
    </div>
  );

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </div>
  );
};

export default MyDrawer;
