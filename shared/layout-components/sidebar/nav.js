export const MENUITEMS = [
	{
		menutitle: "DASHBOARD",
	},
	{
		path: "/components/dashboard/dashboard", title: "Dashboard", icon: "ti-home", type: "link", active: false, selected: false, dirchange: false
	},
	{
		title: "Crypto Currencies", icon: "ti-wallet", type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: "/components/cryptocurrencies/dashboard", type: "link", active: false, selected: false, dirchange: false, title: "Dashboard" },
			{ path: "/components/cryptocurrencies/marketcap", type: "link", active: false, selected: false, dirchange: false, title: "Marketcap" },
			{ path: "/components/cryptocurrencies/currencyexchange", type: "link", active: false, selected: false, dirchange: false, title: "Currency exchange" },
			{ path: "/components/cryptocurrencies/buysell", type: "link", active: false, selected: false, dirchange: false, title: "Buy & Sell" },
			{ path: "/components/cryptocurrencies/wallet", type: "link", active: false, selected: false, dirchange: false, title: "Wallet" },
			{ path: "/components/cryptocurrencies/transcations", type: "link", active: false, selected: false, dirchange: false, title: "Transactions" },
		],
	},
	{
		title: "ECommerce", icon: "ti-shopping-cart-full", type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: "/components/ecommerce/edashboard", type: "link", active: false, selected: false, dirchange: false, title: "Dashboard" },
			{ path: "/components/ecommerce/products", type: "link", active: false, selected: false, dirchange: false, title: "Products" },
			{ path: "/components/ecommerce/productdeatils", type: "link", active: false, selected: false, dirchange: false, title: "Product Details" },
			{ path: "/components/ecommerce/ecart", type: "link", active: false, selected: false, dirchange: false, title: "Cart" },
			{ path: "/components/ecommerce/wishlist", type: "link", active: false, selected: false, dirchange: false, title: "Wishlist" },
			{ path: "/components/ecommerce/checkout", type: "link", active: false, selected: false, dirchange: false, title: "Checkout" },
			{ path: "/components/ecommerce/orders", type: "link", active: false, selected: false, dirchange: false, title: "Orders" },
			{ path: "/components/ecommerce/addproduct", type: "link", active: false, selected: false, dirchange: false, title: "Add Product" },
			{ path: "/components/ecommerce/account", type: "link", active: false, selected: false, dirchange: false, title: "Account" },
		],
	},
	{
		menutitle: "LANDING",
	},
	{
		path: "/components/landingpage/landingpage", title: "Landing Page", icon: "ti-layout", type: "link", active: false, selected: false, dirchange: false
	},
	{
		menutitle: "APPLICATIONS",
	},
	{
		title: "Apps", icon: "ti-write", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/apps/widgets", type: "link", active: false, selected: false, dirchange: false, title: "Widgets" },
			{ path: "/components/apps/sweetalert", type: "link", active: false, selected: false, dirchange: false, title: "Sweet Alerts" },
			{
				title: "Mail", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/apps/mail/mailinbox", type: "link", active: false, selected: false, dirchange: false, title: "Mail-Inbox" },
					{ path: "/components/apps/mail/viewmail", type: "link", active: false, selected: false, dirchange: false, title: "View-Mail" },
					{ path: "/components/apps/mail/mailcomposed", type: "link", active: false, selected: false, dirchange: false, title: "Mail-Compose" }
				],
			},
			{
				title: "Maps", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/apps/maps/leafletmaps", type: "link", active: false, selected: false, dirchange: false, title: "Leaflet Maps" },
					{ path: "/components/apps/maps/simplemaps", type: "link", active: false, selected: false, dirchange: false, title: "Simple Maps" },
				],
			},
			{
				title: "Tables", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/apps/tables/tables", type: "link", active: false, selected: false, dirchange: false, title: "Tables" },
					{ path: "/components/apps/tables/gridjstable", type: "link", active: false, selected: false, dirchange: false, title: "Grid JS Tables" },
					{ path: "/components/apps/tables/datatable", type: "link", active: false, selected: false, dirchange: false, title: "Data Tables" },
				],
			},
			{
				title: "Blog", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/apps/blog/blog", type: "link", active: false, selected: false, dirchange: false, title: "Blog Page" },
					{ path: "/components/apps/blog/blogdetails", type: "link", active: false, selected: false, dirchange: false, title: "Blog-details" },
					{ path: "/components/apps/blog/blogpost", type: "link", active: false, selected: false, dirchange: false, title: "Blog-post" },
				],
			},
			{
				title: "File Manager", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/apps/file/filemanager", type: "link", active: false, selected: false, dirchange: false, title: "File Manager" },
					{ path: "/components/apps/file/filemanagerlist", type: "link", active: false, selected: false, dirchange: false, title: "File-manager-list" },
					{ path: "/components/apps/file/filedetails", type: "link", active: false, selected: false, dirchange: false, title: "File-details" },
				],
			},
			{ path: "/components/apps/icons", type: "link", active: false, selected: false, dirchange: false, title: "Icons" },
		],
	},
	{
		menutitle: "COMPONENTS",
	},
	{
		title: "Elements", icon: "ti-package", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/elements/accordions", type: "link", active: false, selected: false, dirchange: false, title: "Accordions & Collapse" },
			{ path: "/components/elements/alerts", type: "link", active: false, selected: false, dirchange: false, title: "Alerts" },
			{ path: "/components/elements/avatars", type: "link", active: false, selected: false, dirchange: false, title: "Avatars" },
			{ path: "/components/elements/breadcrumbs", type: "link", active: false, selected: false, dirchange: false, title: "Breadcrumbs" },
			{ path: "/components/elements/buttons", type: "link", active: false, selected: false, dirchange: false, title: "Buttons" },
			{ path: "/components/elements/buttongroup", type: "link", active: false, selected: false, dirchange: false, title: "Button Groups" },
			{ path: "/components/elements/badges", type: "link", active: false, selected: false, dirchange: false, title: "Badges" },
			{ path: "/components/elements/dropdowns", type: "link", active: false, selected: false, dirchange: false, title: "Dropdowns" },
			{ path: "/components/elements/imagesfigures", type: "link", active: false, selected: false, dirchange: false, title: "Images & Figures" },
			{ path: "/components/elements/listgroups", type: "link", active: false, selected: false, dirchange: false, title: "List Groups" },
			{ path: "/components/elements/navstabs", type: "link", active: false, selected: false, dirchange: false, title: "Navs & Tabs" },
			{ path: "/components/elements/objectfit", type: "link", active: false, selected: false, dirchange: false, title: "Object Fit" },
			{ path: "/components/elements/paginations", type: "link", active: false, selected: false, dirchange: false, title: "Paginations" },
			{ path: "/components/elements/popovers", type: "link", active: false, selected: false, dirchange: false, title: "Popovers" },
			{ path: "/components/elements/progress", type: "link", active: false, selected: false, dirchange: false, title: "Progress" },
			{ path: "/components/elements/spinners", type: "link", active: false, selected: false, dirchange: false, title: "Spinners" },
			{ path: "/components/elements/typographys", type: "link", active: false, selected: false, dirchange: false, title: "Typography" },
			{ path: "/components/elements/tooltips", type: "link", active: false, selected: false, dirchange: false, title: "Tooltips" },
			{ path: "/components/elements/toasts", type: "link", active: false, selected: false, dirchange: false, title: "Toasts" },
			{ path: "/components/elements/tags", type: "link", active: false, selected: false, dirchange: false, title: "Tags" },
		],
	},
	{
		title: "Advanced UI", icon: "ti-briefcase", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/advanceui/carousels", type: "link", active: false, selected: false, dirchange: false, title: "Carousel" },
			{ path: "/components/advanceui/calendar", type: "link", active: false, selected: false, dirchange: false, title: "Full Calendar" },
			{ path: "/components/advanceui/draggablecards", type: "link", active: false, selected: false, dirchange: false, title: "Draggable Card" },
			{ path: "/components/advanceui/chat", type: "link", active: false, selected: false, dirchange: false, title: "Chat" },
			{ path: "/components/advanceui/contacts", type: "link", active: false, selected: false, dirchange: false, title: "Contacts" },
			{ path: "/components/advanceui/cards", type: "link", active: false, selected: false, dirchange: false, title: "Cards" },
			{ path: "/components/advanceui/timeline", type: "link", active: false, selected: false, dirchange: false, title: "Timeline" },
			{ path: "/components/advanceui/search", type: "link", active: false, selected: false, dirchange: false, title: "Search" },
			{ path: "/components/advanceui/userlist", type: "link", active: false, selected: false, dirchange: false, title: "Userlist" },
			{ path: "/components/advanceui/notifications", type: "link", active: false, selected: false, dirchange: false, title: "Notifications" },
			{ path: "/components/advanceui/treeview", type: "link", active: false, selected: false, dirchange: false, title: "Tree-view" },
			{ path: "/components/advanceui/modals", type: "link", active: false, selected: false, dirchange: false, title: "Modals & Closes" },
			{ path: "/components/advanceui/navbar", type: "link", active: false, selected: false, dirchange: false, title: "Navbar" },
			{ path: "/components/advanceui/offcanvas", type: "link", active: false, selected: false, dirchange: false, title: "Offcanvas" },
			{ path: "/components/advanceui/placeholders", type: "link", active: false, selected: false, dirchange: false, title: "Placeholders" },
			{ path: "/components/advanceui/rating", type: "link", active: false, selected: false, dirchange: false, title: "Ratings" },
			{ path: "/components/advanceui/swiperjs", type: "link", active: false, selected: false, dirchange: false, title: "Swiper JS" },
		],
	},
	{
		menutitle: "OTHER PAGES",
	},
	{
		title: "Pages", icon: "ti-palette", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/pages/profile", type: "link", active: false, selected: false, dirchange: false, title: "Profile" },
			{ path: "/components/pages/aboutus", type: "link", active: false, selected: false, dirchange: false, title: "About Us" },
			{ path: "/components/pages/settings", type: "link", active: false, selected: false, dirchange: false, title: "Settings" },
			{ path: "/components/pages/invoice", type: "link", active: false, selected: false, dirchange: false, title: "Invoice" },
			{ path: "/components/pages/pricingtables", type: "link", active: false, selected: false, dirchange: false, title: "Pricing" },
			{ path: "/components/pages/gallery", type: "link", active: false, selected: false, dirchange: false, title: "Gallery" },
			{ path: "/components/pages/notificationlist", type: "link", active: false, selected: false, dirchange: false, title: "Notifications list" },
			{ path: "/components/pages/faq", type: "link", active: false, selected: false, dirchange: false, title: "Faqs" },
			{ path: "/components/pages/messagesuccess", type: "link", active: false, selected: false, dirchange: false, title: "Success Message" },
			{ path: "/components/pages/messagedanger", type: "link", active: false, selected: false, dirchange: false, title: "Danger Message" },
			{ path: "/components/pages/messagewarning", type: "link", active: false, selected: false, dirchange: false, title: "Warning Message" },
			{ path: "/components/pages/emptypage", type: "link", active: false, selected: false, dirchange: false, title: "Empty Page" },
		],
	},
	{
		title: "Utilities", icon: "ti-shield", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/utilities/breakpoints", type: "link", active: false, selected: false, dirchange: false, title: "Breakpoints" },
			{ path: "/components/utilities/display", type: "link", active: false, selected: false, dirchange: false, title: "Display" },
			{ path: "/components/utilities/border", type: "link", active: false, selected: false, dirchange: false, title: "Borders" },
			{ path: "/components/utilities/colors", type: "link", active: false, selected: false, dirchange: false, title: "Colors" },
			{ path: "/components/utilities/flex", type: "link", active: false, selected: false, dirchange: false, title: "Flex" },
			{ path: "/components/utilities/columns", type: "link", active: false, selected: false, dirchange: false, title: "Columns" },
			{ path: "/components/utilities/gutters", type: "link", active: false, selected: false, dirchange: false, title: "Gutters" },
			{ path: "/components/utilities/helpers", type: "link", active: false, selected: false, dirchange: false, title: "Helpers" },
			{ path: "/components/utilities/position", type: "link", active: false, selected: false, dirchange: false, title: "Position" },
			{ path: "/components/utilities/more", type: "link", active: false, selected: false, dirchange: false, title: "More" },
		],
	},
	{
		title: "Submenu", icon: "ti-menu", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "#Submenu-01", type: "link", active: false, selected: false, dirchange: false, title: "Submenu-01" },
			{
				title: "Submenu-02", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "#Level-01", type: "link", active: false, selected: false, dirchange: false, title: "Level-01" },
					{
						title: "Level-02", type: "sub", active: false, selected: false, dirchange: false, children: [
							{ path: "#Level-11", type: "link", active: false, selected: false, dirchange: false, title: "Level-11" },
							{ path: "#Level-12", type: "link", active: false, selected: false, dirchange: false, title: "Level-12" },
						],
					},
				],
			},
		],
	},
	{
		title: "Authentication", icon: "ti-lock", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/authentication/signin", type: "link", active: false, selected: false, dirchange: false, title: "Sign In" },
			{ path: "/components/authentication/signup", type: "link", active: false, selected: false, dirchange: false, title: "Sign Up" },
			{ path: "/components/authentication/forgotpassword", type: "link", active: false, selected: false, dirchange: false, title: "Forgot Password" },
			{ path: "/components/authentication/resetpassword", type: "link", active: false, selected: false, dirchange: false, title: "Reset Password" },
			{ path: "/components/authentication/lockscreen", type: "link", active: false, selected: false, dirchange: false, title: "Lockscreen" },
			{ path: "/components/authentication/underconstruction", type: "link", active: false, selected: false, dirchange: false, title: "UnderConstruction" },
			{ path: "/components/authentication/error404", type: "link", active: false, selected: false, dirchange: false, title: "404 Error " },
			{ path: "/components/authentication/error500", type: "link", active: false, selected: false, dirchange: false, title: "500 Error " },
		],
	},
	{
		menutitle: "FORMS & CHARTS",
	},
	{
		title: "Forms", icon: "ti-receipt", type: "sub", active: false, selected: false, dirchange: false, children: [
			{
				title: "Form Elements", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/forms/formelements/inputs", type: "link", active: false, selected: false, dirchange: false, title: "Inputs" },
					{ path: "/components/forms/formelements/checksradios", type: "link", active: false, selected: false, dirchange: false, title: "Checks & Radios" },
					{ path: "/components/forms/formelements/inputgroup", type: "link", active: false, selected: false, dirchange: false, title: "Input Group" },
					{ path: "/components/forms/formelements/formselect", type: "link", active: false, selected: false, dirchange: false, title: "Form Select" },
					{ path: "/components/forms/formelements/rangeslider", type: "link", active: false, selected: false, dirchange: false, title: "Range Slider" },
					{ path: "/components/forms/formelements/inputmasks", type: "link", active: false, selected: false, dirchange: false, title: "Input Masks" },
					{ path: "/components/forms/formelements/fileuploads", type: "link", active: false, selected: false, dirchange: false, title: "File Uploads" },
					{ path: "/components/forms/formelements/datetimepicker", type: "link", active: false, selected: false, dirchange: false, title: "Date,Time Picker" },
					{ path: "/components/forms/formelements/colorpicker", type: "link", active: false, selected: false, dirchange: false, title: "Color Picker" },
				],
			},
			{ path: "/components/forms/floatinglabels", type: "link", active: false, selected: false, dirchange: false, title: "Floating Labels" },
			{ path: "/components/forms/formlayouts", type: "link", active: false, selected: false, dirchange: false, title: "Form Layouts" },
			{
				title: "Form Editors", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: "/components/forms/formeditors/suneditor", type: "link", active: false, selected: false, dirchange: false, title: "Sun Editors" },
				],
			},  
			{ path: "/components/forms/formvalidation", type: "link", active: false, selected: false, dirchange: false, title: "Validation" },
			{ path: "/components/forms/select2", type: "link", active: false, selected: false, dirchange: false, title: "Select2" },
		],
	},
	{
		title: "Charts", icon: "ti-bar-chart-alt", type: "sub", active: false, selected: false, dirchange: false, children: [
			{ path: "/components/charts/chartjs", type: "link", active: false, selected: false, dirchange: false, title: "Chart Js" },
			{ path: "/components/charts/echart", type: "link", active: false, selected: false, dirchange: false, title: "EChart" },
			{
				title: "Apex Charts", type: "sub", active: false, selected: false, dirchange: false, children: [
					{ path: "/components/charts/apexchart/linechart", type: "link", active: false, selected: false, dirchange: false, title: "Line Charts" },
					{ path: "/components/charts/apexchart/areachart", type: "link", active: false, selected: false, dirchange: false, title: "Area Charts" },
					{ path: "/components/charts/apexchart/columnchart", type: "link", active: false, selected: false, dirchange: false, title: "Column Charts" },
					{ path: "/components/charts/apexchart/barchart", type: "link", active: false, selected: false, dirchange: false, title: "Bar Charts" },
					{ path: "/components/charts/apexchart/mixedchart", type: "link", active: false, selected: false, dirchange: false, title: "Mixed Charts" },
					{ path: "/components/charts/apexchart/rangeareachart", type: "link", active: false, selected: false, dirchange: false, title: "Range Area Charts" },
					{ path: "/components/charts/apexchart/timelinechart", type: "link", active: false, selected: false, dirchange: false, title: "Timeline Charts" },
					{ path: "/components/charts/apexchart/candlestickchart", type: "link", active: false, selected: false, dirchange: false, title: "CandleStick Charts" },
					{ path: "/components/charts/apexchart/boxplotchart", type: "link", active: false, selected: false, dirchange: false, title: "Boxplot Charts" },
					{ path: "/components/charts/apexchart/bubblechart", type: "link", active: false, selected: false, dirchange: false, title: "Bubble Charts" },
					{ path: "/components/charts/apexchart/scatterchart", type: "link", active: false, selected: false, dirchange: false, title: "Scatter Charts" },
					{ path: "/components/charts/apexchart/heatmapchart", type: "link", active: false, selected: false, dirchange: false, title: "Heatmap Charts" },
					{ path: "/components/charts/apexchart/treemapchart", type: "link", active: false, selected: false, dirchange: false, title: "Treemap Charts" },
					{ path: "/components/charts/apexchart/piechart", type: "link", active: false, selected: false, dirchange: false, title: "Pie Charts" },
					{ path: "/components/charts/apexchart/radialbarchart", type: "link", active: false, selected: false, dirchange: false, title: "Radialbar Charts" },
					{ path: "/components/charts/apexchart/radarchart", type: "link", active: false, selected: false, dirchange: false, title: "Radar Charts" },
					{ path: "/components/charts/apexchart/polarareachart", type: "link", active: false, selected: false, dirchange: false, title: "Polararea Charts" },
				],
			},
			
		],
	},

];
