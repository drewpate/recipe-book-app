import React from "react";
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

  const data = [
    {
      name: "",
      icon: <HomeOutlined />,
    },
    { name: "Recipes", icon: <NotesIcon /> },
    { name: "NewRecipe", icon: <CreateIcon /> },
    // { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
    // { name: "Sent mail", icon: <MailOutline /> },
    // { name: "Draft", icon: <DraftsOutlined /> },
    // { name: "Trash", icon: <ReceiptOutlined /> },
  ];

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <Link key={index} href={"/" + item.name}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      ))}
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
