import { useState } from "react";
import { AppBar, Typography, IconButton, Box, Toolbar, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@mkyy/mui-search-bar";
import Snackbar from "@mui/material/Snackbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from "@mui/material/Rating";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
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
import "./menu.css";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "CAD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Menu = ({ cartItems, setCartItems }) => {
	const navigate = useNavigate();
	const [showToast, setShowToast] = useState(false);
	const handleClick = () => {
		setShowToast(true);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setShowToast(false);
	};

	const numCartItems = Object.entries(cartItems).reduce((previousValue, currentValue) => {
		return previousValue + currentValue[1].quantity;
	}, 0);

	const addItems = (item) => {
		const newItems = { ...cartItems };
		if (item.dsc in newItems) {
			newItems[item.dsc].quantity++;
		} else {
			newItems[item.dsc] = { quantity: 1, price: item.price, img: item.img };
		}
		handleClick();
		setCartItems(newItems);
	};
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
	const subMenus = ["Specials", "Starters", "Appetizers", "Mains", "Chef's Picks", "Desserts", "Drinks"];

	const [textFieldValue, setTextFieldValue] = useState("");
	const handleSearch = (labelOptionValue) => {
		//...
	};
	const selectedItems = menuItems().filter((item) => {
		const lowerCaseName = textFieldValue.toLowerCase();
		return item.name.toLowerCase().includes(lowerCaseName) || item.dsc.toLowerCase().includes(textFieldValue);
	});

	const handleChangeMenu = (menu) => {
		setTextFieldValue("");
		setCurrentSubMenu(menu);
	};

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ backgroundColor: '#193161'}}>
					<Toolbar>
						<SearchBar
							className="searchbar"
							value={textFieldValue}
							onChange={(newValue) => setTextFieldValue(newValue)}
							onSearch={handleSearch}
							onCancelResearch={() => setTextFieldValue("")}
						/>
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
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => {
								navigate("/Cart");
							}}
						>
							<ShoppingCartIcon />
							{numCartItems > 0 && (
								<Typography
									component="span"
									sx={{
										flexGrow: 1,
										textAlign: "center",
										fontWeight: 150,
										top: "-10px",
										position: "inherit",
										border: "1px solid #ffffff",
										width: 26,
										height: 24,
										borderRadius: 50,
									}}
								>
									{numCartItems}
								</Typography>
							)}
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
									<ListItemButton key={menu} onClick={() => handleChangeMenu(menu)} selected={menu === currentSubMenu}>
										<ListItemText primary={menu} />
									</ListItemButton>
									<Divider sx={{ borderColor: "#1976d2" }} />
								</>
							);
						})}
					</List>
				</Grid>
				<Grid item xs={12} sm={12} md={10} lg={9}>
					<List disablePadding sx={{ width: "100%" }}>
						{selectedItems.map((item, index) => {
							if (item.img2 && item.img3 && index < 2) {
								return (
									<>
										<ListItem alignItems="flex-center" key={item.name} sx={{ display: "block" }}>
											<div style={{ width: "100%", display: "flex" }}>
												<ListItemText
													primary={item.dsc}
													secondary={item.name}
													sx={{ maxWidth: "30%", fontSize: "3rem" }}
												/>
												<ListItemText
													primary={formatter.format(item.price)}
													secondary={<Rating name="simple-controlled" value={item.rate} readOnly />}
													sx={{ "max-width": "15%" }}
												/>
											</div>
											<Grid container spacing={2}>
												<Grid item xs={index % 2 === 0 ? 6 : 4}>
													<ListItemAvatar sx={{ height: "100%" }}>
														<Avatar
															alt="N A"
															src={item.img}
															sx={{ width: "100%", height: "320px", borderRadius: "5px" }}
														/>
													</ListItemAvatar>
												</Grid>
												<Grid item xs={index % 2 === 0 ? 4 : 6}>
													<ListItemAvatar sx={{ height: "100%" }}>
														<Avatar
															alt="N A"
															src={item.img2}
															sx={{ width: "100%", height: "154px", borderRadius: "5px", marginBottom: "12px" }}
														/>
														<Avatar
															alt="N A"
															src={item.img3}
															sx={{ width: "100%", height: "154px", borderRadius: "5px" }}
														/>
													</ListItemAvatar>
												</Grid>
												<Grid item xs={2} sx={{ display: "flex" }}>
													<IconButton
														edge="end"
														aria-label="delete"
														sx={{ margin: "auto" }}
														onClick={() => addItems(item)}
													>
														<AddIcon fontSize="large" />
													</IconButton>
												</Grid>
											</Grid>
										</ListItem>
										<Divider sx={{ "border-color": "#1976d2" }} />
									</>
								);
							}
							return (
								<>
									<ListItem alignItems="flex-center" key={item.name}>
										<ListItemText primary={item.dsc} secondary={item.name} sx={{ "max-width": "45%" }} />
										<ListItemText
											primary={formatter.format(item.price)}
											secondary={<Rating name="simple-controlled" value={item.rate} readOnly />}
											sx={{ "max-width": "15%" }}
										/>
										<Carousel sx={{ width: 320, height: 150 }} autoPlay={false}>
											<ListItemAvatar>
												<Avatar
													alt="N A"
													src={item.img}
													sx={{ width: 320, height: 150, borderRadius: "5px", marginRight: "32px" }}
												/>
											</ListItemAvatar>
											<ListItemAvatar>
												<Avatar
													alt="N A"
													src={item.img2}
													sx={{ width: 320, height: 150, borderRadius: "5px", marginRight: "32px" }}
												/>
											</ListItemAvatar>
											<ListItemAvatar>
												<Avatar
													alt="N A"
													src={item.img3}
													sx={{ width: 320, height: 150, borderRadius: "5px", marginRight: "32px" }}
												/>
											</ListItemAvatar>
										</Carousel>

										<IconButton
											edge="end"
											aria-label="delete"
											sx={{ marginRight: "32px" }}
											onClick={() => addItems(item)}
										>
											<AddIcon fontSize="large" />
										</IconButton>
									</ListItem>
									<Divider sx={{ "border-color": "#1976d2" }} />
								</>
							);
						})}
					</List>
				</Grid>{" "}
			</Grid>
			<Snackbar
				open={showToast}
				autoHideDuration={1000}
				onClose={handleClose}
				message="Item Added Successfully"
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				sx={{ width: 400 }}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					Item Successfully Added
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Menu;
