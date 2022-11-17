import { useState, useEffect } from "react";
import { AppBar, Typography, IconButton, Box, Toolbar, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from "@mui/material/Rating";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { ListItemButton } from "@mui/material";
import appetizers from "../data/appetizers.json";
import desserts from "../data/desserts.json";
import chefspicks from "../data/chefspicks.json";
import drinks from "../data/drinks.json";
import mains from "../data/mains.json";
import specials from "../data/specials.json";
import starters from "../data/starters.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./cart.css";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "CAD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Menu = () => {
	const [hideSidebar, setHideSideBar] = useState(true);
	const [currentSubMenu, setCurrentSubMenu] = useState("Specials");
	const menuItems = () => {
		var items = specials;
		switch (currentSubMenu) {
			case "Specials":
				items = specials;
				break;
			case "Starters":
				items = starters;
				break;
			case "Appetizers":
				items = appetizers;
				break;
			case "Mains":
				items = mains;
				break;
			case "Chef's Picks":
				items = chefspicks;
				break;
			case "Desserts":
				items = desserts;
				break;
			case "Drinks":
				items = drinks;
				break;
			default:
				items = specials;
		}
		return items;
	};
	console.log(menuItems());
	const subMenus = ["Specials", "Starters", "Appetizers", "Mains", "Chef's Picks", "Desserts", "Drinks"];
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => setHideSideBar(!hideSidebar)}
						>
							<SearchIcon />
						</IconButton>
						<Typography
							variant="h4"
							component="div"
							sx={{
								flexGrow: 1,
								textAlign: "center",
								padding: "5px",
								fontWeight: 600,
							}}
						>
							Menu
						</Typography>
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<ShoppingCartIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={2} lg={3} sx={{ borderRight: 1, borderColor: "rgba(25, 118, 210, .25)" }}>
					<List disablePadding sx={{ width: "100%" }}>
						{subMenus.map((menu) => {
							return (
								<>
									<ListItemButton
										key={menu}
										onClick={() => {
											setCurrentSubMenu(menu);
										}}
										selected={menu === currentSubMenu}
									>
										<ListItemText primary={menu} />
									</ListItemButton>
									<Divider sx={{ "border-color": "#1976d2" }} />
								</>
							);
						})}
					</List>
				</Grid>
				<Grid item xs={12} sm={12} md={10} lg={9}>
					<List disablePadding sx={{ width: "100%" }}>
						{menuItems().map((item) => {
							return (
								<>
									<ListItem
										alignItems="start"
										key={item.name}
										secondaryAction={
											<IconButton edge="end" aria-label="delete" sx={{ marginRight: "32px" }}>
												<AddIcon fontSize="large" />
											</IconButton>
										}
									>
										<ListItemText primary={item.name} secondary={item.dsc} sx={{ "max-width": "45%" }} />
										<ListItemText
											primary={formatter.format(item.price)}
											secondary={<Rating name="simple-controlled" value={item.rate} />}
											sx={{ "max-width": "15%" }}
										/>

										<ListItemAvatar>
											<Avatar
												alt="N A"
												src={item.img}
												sx={{ width: 320, height: 150, borderRadius: "25%", marginRight: "32px" }}
											/>
										</ListItemAvatar>
									</ListItem>

									<Divider sx={{ "border-color": "#1976d2" }} />
								</>
							);
						})}
					</List>
				</Grid>{" "}
			</Grid>
		</div>
	);
};

export default Menu;
