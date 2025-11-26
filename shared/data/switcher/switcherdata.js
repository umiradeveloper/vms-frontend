import { useState } from "react";
import store from "../../../shared/redux/store";
import { MENUITEMS } from "../../../shared/layout-components/sidebar/nav";

export function Dark(actionfunction) {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataThemeMode": "dark",
		"dataHeaderStyles": "dark",
		"dataMenuStyles": "dark",
		"bodyBg1": "",
		"bodyBg": "",
		"darkBg": "",
		"Light": "",
		"inputBorder": "",
		"formControl":"",
		"lightRgb":"",
		"sidemenuActiveBgcolor":"",
	});
	localStorage.setItem("spruhadarktheme", "dark");
	localStorage.removeItem("spruhalighttheme");
	localStorage.removeItem("sidemenuActiveBgcolor");
	// localStorage.removeItem("darkBgRGB1");
	// localStorage.removeItem("darkBgRGB2");
	// localStorage.removeItem("darkBgRGB3");
	// localStorage.removeItem("darkBgRGB4");

}
export function Light(actionfunction) {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataThemeMode": "light",
		"dataHeaderStyles": "light",
		"bodyBg1": "",
		"bodyBg": "",
		"darkBg": "",
		"Light": "",
		"inputBorder": "",
		// "dataMenuStyles": theme.dataNavLayout == "horizontal" ? "light" : "dark
		"dataMenuStyles": "dark",
		"sidemenuActiveBgcolor":"",

	});
	localStorage.setItem("spruhalighttheme", "light");
	localStorage.removeItem("spruhadarktheme");
	localStorage.removeItem("darkBgRGB1");
	localStorage.removeItem("darkBgRGB2");
	localStorage.removeItem("sidemenuActiveBgcolor");
	localStorage.removeItem("darkBgRGB3");
	localStorage.removeItem("darkBgRGB4");
}
export function Ltr(actionfunction) {
	const theme = store.getState();
	actionfunction({ ...theme, dir: "ltr" });
	localStorage.setItem("spruhaltr", "ltr");
	localStorage.removeItem("spruhartl");

}
export function Rtl(actionfunction) {
	const theme = store.getState();
	actionfunction({ ...theme, dir: "rtl" });
	localStorage.setItem("spruhartl", "rtl");
	localStorage.removeItem("spruhaltr");

}
export const HorizontalClick = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "horizontal",
		//   "dataMenuStyles": localStorage.spruhadarktheme ? 'dark' : localStorage.darkBgRGB1 ? 'dark' : localStorage.spruhaMenu ? localStorage.spruhaMenu : "light",
		"dataVerticalStyle": "",
		"dataNavStyle": localStorage.spruhanavstyles ? localStorage.spruhanavstyles : "menu-click"
	});
	//   localStorage.setItem("daslotlayout", "horizontal");
	// localStorage.removeItem("spruhaverticalstyles");
	localStorage.setItem("spruhalayout", "horizontal");
	localStorage.removeItem("spruhaverticalstyles");
};

export const Vertical = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		// "dataMenuStyles": "",
		"dataVerticalStyle": "overlay",
		"toggled": "",
		"dataNavStyle": ""
	});
	localStorage.setItem("spruhalayout", "vertical");
	//
	localStorage.removeItem("spruhanavstyles");

};

export const Menuclick = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavStyle": "menu-click",
		"dataVerticalStyle": "",
		"toggled": "menu-click-closed",
	});
	localStorage.setItem("spruhanavstyles", "menu-click");
	localStorage.removeItem("spruhaverticalstyles");
	const Sidebar = document.querySelector(".main-menu");
	if (Sidebar) {
		Sidebar.style.marginInline = "0px";
	}
};
export const MenuHover = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavStyle": "menu-hover",
		"dataVerticalStyle": "",
		"toggled": "menu-hover-closed",
		"horStyle": ""
	});
	localStorage.setItem("spruhanavstyles", "menu-hover");
	localStorage.removeItem("spruhaverticalstyles");
	const Sidebar = document.querySelector(".main-menu");
	if (Sidebar) {
		Sidebar.style.marginInline = "0px";
	}
};
export const IconClick = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavStyle": "icon-click",
		"dataVerticalStyle": "",
		"toggled": "icon-click-closed",
	});
	localStorage.setItem("spruhanavstyles", "icon-click");
	localStorage.removeItem("spruhaverticalstyles");
	const Sidebar = document.querySelector(".main-menu");
	if (Sidebar) {
		Sidebar.style.marginInline = "0px";
	}
};
function closeMenuFn() {
	const closeMenuRecursively = (items) => {

		items?.forEach((item) => {
			item.active = false;
			closeMenuRecursively(item.children);
		});
	};
	closeMenuRecursively(MENUITEMS);
}
export const IconHover = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavStyle": "icon-hover",
		"dataVerticalStyle": "",
		"toggled": "icon-hover-closed"
	});
	localStorage.setItem("spruhanavstyles", "icon-hover");
	localStorage.removeItem("spruhaverticalstyles");
	const Sidebar = document.querySelector(".main-menu");
	if (Sidebar) {
		Sidebar.style.marginInline = "0px";
	}
	closeMenuFn();
};
export const Fullwidth = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataWidth": "fullwidth",
	});
	localStorage.setItem("spruhafullwidth", "Fullwidth");
	localStorage.removeItem("spruhaboxed");

};
export const Boxed = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataWidth": "boxed",
	});
	localStorage.setItem("spruhaboxed", "Boxed");
	localStorage.removeItem("spruhafullwidth");
};
export const FixedMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuPosition": "fixed",
	});
	localStorage.setItem("spruhamenufixed", "MenuFixed");
	localStorage.removeItem("spruhamenuscrollable");
};
export const scrollMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuPosition": "scrollable",
	});
	localStorage.setItem("spruhamenuscrollable", "Menuscrolled");
	localStorage.removeItem("spruhamenufixed");
};
export const Headerpostionfixed = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderPosition": "fixed",
	});
	localStorage.setItem("spruhaheaderfixed", "FixedHeader");
	localStorage.removeItem("spruhaheaderscrollable");
};
export const Headerpostionscroll = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderPosition": "scrollable",
	});
	localStorage.setItem("spruhaheaderscrollable", "ScrollableHeader");
	localStorage.removeItem("spruhaheaderfixed");
};
export const Regular = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataPageStyle": "regular"
	});
	localStorage.setItem("spruharegular", "Regular");
	localStorage.removeItem("spruhaclassic");
	localStorage.removeItem("spruhamodern");
};
export const Classic = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataPageStyle": "classic",
	});
	localStorage.setItem("spruhaclassic", "Classic");
	localStorage.removeItem("spruharegular");
	localStorage.removeItem("spruhamodern");
};
export const Modern = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataPageStyle": "modern",
	});
	localStorage.setItem("spruhamodern", "Modern");
	localStorage.removeItem("spruharegular");
	localStorage.removeItem("spruhaclassic");
};

export const Defaultmenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataVerticalStyle": "overlay",
		"dataNavLayout": "vertical",
		"toggled": ""
	});
	localStorage.setItem("spruhaverticalstyles", "default");

	const icon = document.getElementById("switcher-default-menu");
	if (icon) {
		icon.checked = true;
	}
	localStorage.removeItem("spruhanavstyles");

};
export const Closedmenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		"dataVerticalStyle": "closed",
		"toggled": "close-menu-close"
	});
	localStorage.setItem("spruhaverticalstyles", "closed");
	localStorage.removeItem("spruhanavstyles");

};

function icontextOpenFn() {
	let html = document.documentElement;
	if (html.getAttribute("data-toggled") === "icon-text-close") {
		html.setAttribute("data-icon-text", "open");
	}
}
function icontextCloseFn() {
	let html = document.documentElement;
	if (html.getAttribute("data-toggled") === "icon-text-close") {
		html.removeAttribute("data-icon-text");
	}
}
export const iconTextfn = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		"dataVerticalStyle": "icontext",
		"toggled": "icon-text-close",
		"dataNavStyle": "",
	});
	localStorage.setItem("spruhaverticalstyles", "icontext");
    const MainContent = document.querySelector(".app-content");
    const appSidebar = document.querySelector('.app-sidebar');

    appSidebar?.addEventListener("click", () => {
        icontextOpenFn();
    });
    MainContent?.addEventListener("click", () => {
        icontextCloseFn();
    });
};
export const iconOverayFn = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		"dataVerticalStyle": "overlay",
		"toggled": "icon-overlay-close",

	});
	localStorage.setItem("spruhaverticalstyles", "overlay");
	localStorage.removeItem("spruhanavstyles");
	const icon = document.getElementById("switcher-icon-overlay");
	if (icon) {
		icon.checked = true;
	}
	const MainContent = document.querySelector(".main-content");
	const appSidebar = document.querySelector(".app-sidebar");
	appSidebar?.addEventListener("click", () => {
		DetachedOpenFn();
	});
	MainContent?.addEventListener("click", () => {
		DetachedCloseFn();
	});
};

function DetachedOpenFn() {
	if (window.innerWidth > 992) {

		let html = document.documentElement;
		if (html.getAttribute("data-toggled") === "detached-close" || html.getAttribute("data-toggled") === "icon-overlay-close") {
			html.setAttribute("icon-overlay", "open");
		}
	}
}
function DetachedCloseFn() {
	if (window.innerWidth > 992) {

		let html = document.documentElement;
		if (html.getAttribute("data-toggled") === "detached-close" || html.getAttribute("data-toggled") === "icon-overlay-close") {
			html.removeAttribute("icon-overlay");
		}
	}
}
export const DetachedFn = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		"dataVerticalStyle": "detached",
		"toggled": "detached-close",
	});
	localStorage.setItem("spruhaverticalstyles", "detached");
	localStorage.removeItem("spruhanavstyles");

	const MainContent = document.querySelector(".main-content");
	const appSidebar = document.querySelector(".app-sidebar");

	appSidebar?.addEventListener("click", () => {
		DetachedOpenFn();
	});
	MainContent?.addEventListener("click", () => {
		DetachedCloseFn();
	});
};

export const DoubletFn = (actionfunction) => {

	const theme = store.getState();
	actionfunction({
		...theme,
		"dataNavLayout": "vertical",
		"dataVerticalStyle": "doublemenu",
		"dataNavStyle": "",
		"toggled": "double-menu-open",
	});
	localStorage.setItem("spruhaverticalstyles", "doublemenu");
	localStorage.removeItem("spruhanavstyles");

	setTimeout(() => {
		if (!document.querySelectorAll(".main-menu .slide.active")[0]?.querySelector("ul")) {
			const theme = store.getState();
			actionfunction(
				{
					...theme,
					"toggled": "double-menu-close",
				}
			);
		}
	}, 100);
};

export const bgImage1 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bgImg": "bgimg1"
	});
	localStorage.setItem("bgimage1", "bgimg1");
	localStorage.removeItem("bgimage2");
	localStorage.removeItem("bgimage3");
	localStorage.removeItem("bgimage4");
	localStorage.removeItem("bgimage5");
};
export const bgImage2 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bgImg": "bgimg2"
	});
	localStorage.setItem("bgimage2", "bgimg2");
	localStorage.removeItem("bgimage1");
	localStorage.removeItem("bgimage3");
	localStorage.removeItem("bgimage4");
	localStorage.removeItem("bgimage5");
};
export const bgImage3 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bgImg": "bgimg3"
	});
	localStorage.setItem("bgimage3", "bgimg3");
	localStorage.removeItem("bgimage1");
	localStorage.removeItem("bgimage2");
	localStorage.removeItem("bgimage4");
	localStorage.removeItem("bgimage5");
};
export const bgImage4 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bgImg": "bgimg4"
	});
	localStorage.setItem("bgimage4", "bgimg4");
	localStorage.removeItem("bgimage1");
	localStorage.removeItem("bgimage2");
	localStorage.removeItem("bgimage3");
	localStorage.removeItem("bgimage5");
};
export const bgImage5 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bgImg": "bgimg5"
	});
	localStorage.setItem("bgimage5", "bgimg5");
	localStorage.removeItem("bgimage1");
	localStorage.removeItem("bgimage2");
	localStorage.removeItem("bgimage3");
	localStorage.removeItem("bgimage4");
};

export const colorMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuStyles": "color",
	});
	localStorage.setItem("spruhaMenu", "color");
	localStorage.removeItem("gradient");
};

export const lightMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuStyles": "light",

	});
	localStorage.setItem("spruhaMenu", "light");
	localStorage.removeItem("light");
};

export const darkMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuStyles": "dark",
	});
	localStorage.setItem("spruhaMenu", "dark");
	localStorage.removeItem("light");
};

export const gradientMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuStyles": "gradient",
		
	});
	localStorage.setItem("spruhaMenu", "gradient");
	localStorage.removeItem("color");
};
export const transparentMenu = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataMenuStyles": "transparent",
	});
	localStorage.setItem("spruhaMenu", "transparent");
	localStorage.removeItem("gradient");
};

export const lightHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderStyles": "light",
	});
	localStorage.setItem("spruhaHeader", "light");
	localStorage.removeItem("dark");
};
export const darkHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderStyles": "dark",
	});
	localStorage.setItem("spruhaHeader", "dark");
	localStorage.removeItem("light");
};
export const colorHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderStyles": "color",
	});
	localStorage.setItem("spruhaHeader", "color");
	localStorage.removeItem("dark");
};
export const gradientHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderStyles": "gradient",

	});
	localStorage.setItem("spruhaHeader", "gradient");
	localStorage.removeItem("transparent");
};
export const transparentHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"dataHeaderStyles": "transparent",
	});
	localStorage.removeItem("gradient");
	localStorage.setItem("spruhaHeader", "transparent");
};

export const primaryColor1 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"colorPrimaryRgb": "58, 88, 146",
	});
	localStorage.setItem("primaryRGB", "58, 88, 146");

};
export const primaryColor2 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"colorPrimaryRgb": "92, 144, 163",
	});
	localStorage.setItem("primaryRGB", "92, 144, 163");
};
export const primaryColor3 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"colorPrimaryRgb": "161, 90, 223",
	});
	localStorage.setItem("primaryRGB", "161, 90, 223");
};
export const primaryColor4 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"colorPrimaryRgb": "78, 172, 76",
	});
	localStorage.setItem("primaryRGB", "78, 172, 76");
};
export const primaryColor5 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"colorPrimaryRgb": "223, 90, 90",
	});
	localStorage.setItem("primaryRGB", "223, 90, 90");
};

export const backgroundColor1 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bodyBg": "20, 30, 96",
		"Light": "43, 52,111",
		"darkBg": "43, 52,111",
		"inputBorder": "255, 255, 255, 0.1",
		"sidemenuActiveBgcolor":"43, 52,111",
		"dataThemeMode": "dark",
		"dataMenuStyles": "dark",
		"dataHeaderStyles": "dark",
	});
	localStorage.setItem("darkBgRGB1", "20, 30, 96");
	localStorage.setItem("darkBgRGB2", "43, 52,111");
	localStorage.setItem("darkBgRGB3", "25, 38, 101");
	localStorage.setItem("LightRGB", "43, 52,111");
	localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");

};
export const backgroundColor2 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bodyBg": "8, 78, 115",
		"Light": "32, 95, 128",
		"darkBg": "32, 95, 128",
		"inputBorder": "255, 255, 255, 0.1",
		"sidemenuActiveBgcolor":"32, 95, 128",
		"dataThemeMode": "dark",
		"dataMenuStyles": "dark",
		"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark"
	});
	localStorage.setItem("darkBgRGB1", "8, 78, 115");
	localStorage.setItem("darkBgRGB2", "32, 95, 128");
	localStorage.setItem("darkBgRGB3", "32, 95, 128",);
	localStorage.setItem("LightRGB", "32, 95, 128");
	localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");
};
export const backgroundColor3 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bodyBg": "90, 37, 135",
		"Light": "106, 58, 146",
		"darkBg": "106, 58, 146",
		"inputBorder": "255, 255, 255, 0.1",
		"sidemenuActiveBgcolor":"106, 58, 146",
		"dataThemeMode": "dark",
		"dataMenuStyles": "dark",
		"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark"
	});
	localStorage.setItem("darkBgRGB1", "90, 37, 135");
	localStorage.setItem("darkBgRGB2", "106, 58, 146");
	localStorage.setItem("darkBgRGB3", "106, 58, 146",);
	localStorage.setItem("LightRGB", "106, 58, 146");
	localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");
};
export const backgroundColor4 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bodyBg": "24, 101, 51",
		"Light": "46, 116, 71",
		"darkBg": "46, 116, 71",
		"inputBorder": "255, 255, 255, 0.1",
		"sidemenuActiveBgcolor":"46, 116, 71",
		"dataThemeMode": "dark",
		"dataMenuStyles": "dark",
		"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark"
	});
	localStorage.setItem("darkBgRGB1", "24, 101, 51");
	localStorage.setItem("darkBgRGB2", "46, 116, 71");
	localStorage.setItem("darkBgRGB3", "46, 116, 71");
	localStorage.setItem("LightRGB", "46, 116, 71");
	localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");
};
export const backgroundColor5 = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"bodyBg": "120, 66, 20",
		"Light": "133, 84, 43",
		"darkBg": "133, 84, 43",
		"inputBorder": "255, 255, 255, 0.1",
		"sidemenuActiveBgcolor":"133, 84, 43",
		"dataThemeMode": "dark",
		"dataMenuStyles": "dark",
		"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark"
	});
	localStorage.setItem("darkBgRGB1", "120, 66, 20");
	localStorage.setItem("darkBgRGB2", "133, 84, 43");
	localStorage.setItem("darkBgRGB3", "133, 84, 43");
	localStorage.setItem("LightRGB", "133, 84, 43");
	localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");
};

const ColorPicker = (props) => {
	return (
		<div className="color-picker-input">
			<input type="color" {...props} />
		</div>
	);
};

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
const Themeprimarycolor = ({ actionfunction }) => {
	const theme = store.getState();
	const [state, updateState] = useState("#FFFFFF");

	const handleInput = (e) => {
		const rgb = hexToRgb(e.target.value);

		if (rgb !== null) {
			const { r, g, b } = rgb;
			updateState(e.target.value);
			actionfunction({
				...theme,
				"colorPrimaryRgb": `${r} , ${g} , ${b}`,
			});
			localStorage.setItem("dynamiccolor", `${r}, ${g}, ${b}`);
		}
	};

	return (
		<div className="Themeprimarycolor theme-container-primary pickr-container-primary">
			<ColorPicker onChange={handleInput} value={state} />
		</div>
	);
};
export default Themeprimarycolor;

//themeBackground
export const Themebackgroundcolor = ({ actionfunction }) => {
	const theme = store.getState();
	const [state, updateState] = useState("#FFFFFF");
	const handleInput = (e) => {
		const { r, g, b } = hexToRgb(e.target.value);
		updateState(e.target.value);
		actionfunction({
			...theme,
			"bodyBg": `${r}, ${g}, ${b}`,
			"bodyBg1": `${r + 19}, ${g + 19}, ${b + 19}`,
			"Light": `${r + 19}, ${g + 19}, ${b + 19}`,
			"darkBg": `${r + 19}, ${g + 19}, ${b + 19}`,
			"sidemenuActiveBgcolor": `${r + 19} ${g + 19} ${b + 19}`,
			"inputBorder": "255, 255, 255, 0.1",
			"dataThemeMode": "dark",
			"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark",
			"dataMenuStyles": "dark"
		});
		localStorage.setItem("darkBgRGB1", `${r}, ${g}, ${b}`);
		localStorage.setItem("darkBgRGB2", `${r + 19}, ${g + 19}, ${b + 19}`);
		localStorage.setItem("LightRGB", `${r + 19}, ${g + 19}, ${b + 19}`);
		localStorage.setItem("darkBgRGB3", `${r + 19}, ${g + 19}, ${b + 19}`);
		localStorage.setItem("darkBgRGB4", "255, 255, 255, 0.1");
		localStorage.removeItem("spruhaMenu");
		localStorage.removeItem("spruhaHeader");

	};
	return (
		<div className="Themebackgroundcolor">
			<ColorPicker onChange={handleInput} value={state} />
		</div>
	);
};

export const Reset = (actionfunction) => {
	const theme = store.getState();
	Vertical(actionfunction);
	actionfunction({
		...theme,
		lang: "en",
		dir: "ltr",
		dataThemeMode: "light",
		dataMenuStyles: "dark",
		dataNavLayout: "vertical",
		dataHeaderStyles: "light",
		dataVerticalStyle: "overlay",
		StylebodyBg: "107 64 64",
		StyleDarkBg: "93 50 50",
		toggled: "",
		dataNavStyle: "",
		horStyle: "",
		dataPageStyle: "regular",
		dataWidth: "fullwidth",
		dataMenuPosition: "fixed",
		dataHeaderPosition: "fixed",
		loader: "disable",
		iconOverlay: "",
		colorPrimaryRgb: "",
		bodyBg1: "",
		bodyBg: "",
		Light: "",
		darkBg: "",	
        sidemenuActiveBgcolor:"",
		inputBorder: "",
		bgImg: "",
		iconText: "",
		body: {
			class: ""
		}

	});
	localStorage.clear();
	const icon = document.getElementById("switcher-default-menu");
	if (icon) {
		icon.checked = true;
	}
};

export const LocalStorageBackup = (actionfunction) => {

	(localStorage.spruhaltr) ? Ltr(actionfunction) : "";
	(localStorage.spruhartl) ? Rtl(actionfunction) : "";
	(localStorage.spruhadarktheme) ? Dark(actionfunction) : "";
	(localStorage.spruhalighttheme) ? Light(actionfunction) : "";
	(localStorage.spruharegular) ? Regular(actionfunction) : "";
	(localStorage.spruhaclassic) ? Classic(actionfunction) : "";
	(localStorage.spruhamodern) ? Modern(actionfunction) : "";
	(localStorage.spruhafullwidth) ? Fullwidth(actionfunction) : "";
	(localStorage.spruhaboxed) ? Boxed(actionfunction) : "";
	(localStorage.spruhamenufixed) ? FixedMenu(actionfunction) : "";
	(localStorage.spruhamenuscrollable) ? scrollMenu(actionfunction) : "";
	(localStorage.spruhaheaderfixed) ? Headerpostionfixed(actionfunction) : "";
	(localStorage.spruhaheaderscrollable) ? Headerpostionscroll(actionfunction) : "";

	(localStorage.spruhanavstyles === "menu-click") ? Menuclick(actionfunction) : "";
	(localStorage.spruhanavstyles === "menu-hover") ? MenuHover(actionfunction) : "";
	(localStorage.spruhanavstyles === "icon-click") ? IconClick(actionfunction) : "";
	(localStorage.spruhanavstyles === "icon-hover") ? IconHover(actionfunction) : "";

	(localStorage.bgimage1) ? bgImage1(actionfunction) : "";
	(localStorage.bgimage2) ? bgImage2(actionfunction) : "";
	(localStorage.bgimage3) ? bgImage3(actionfunction) : "";
	(localStorage.bgimage4) ? bgImage4(actionfunction) : "";
	(localStorage.bgimage5) ? bgImage5(actionfunction) : "";
	(localStorage.spruhalayout == "horizontal") && HorizontalClick(actionfunction);
	(localStorage.spruhalayout == "vertical") && Vertical(actionfunction);
	//primitive 
	if (
		localStorage.getItem("spruhaltr") == null ||
		localStorage.getItem("spruhaltr") == "ltr"
	)
		if (localStorage.getItem("spruhartl") == "rtl") {
			document.querySelector("body")?.classList.add("rtl");
			document.querySelector("html[lang=en]")?.setAttribute("dir", "rtl");
		}

	// Theme Primary: Colors: Start
	switch (localStorage.primaryRGB) {
	case "58, 88, 146":
		primaryColor1(actionfunction);

		break;
	case "92, 144, 163":
		primaryColor2(actionfunction);

		break;
	case "161, 90, 223":
		primaryColor3(actionfunction);

		break;
	case "78, 172, 76":
		primaryColor4(actionfunction);

		break;
	case "223, 90, 90":
		primaryColor5(actionfunction);

		break;
	default:
		break;
	}
	// Theme Primary: Colors: End

	switch (localStorage.darkBgRGB1) {
	case "20, 30, 96":
		backgroundColor1(actionfunction);

		break;
	case "8, 78, 115":
		backgroundColor2(actionfunction);

		break;
	case "90, 37, 135":
		backgroundColor3(actionfunction);

		break;
	case "24, 101, 51":
		backgroundColor4(actionfunction);

		break;
	case "120, 66, 20":
		backgroundColor5(actionfunction);

		break;
	default:
		break;
	}

	//layout
	if (localStorage.spruhaverticalstyles) {
		const verticalStyles = localStorage.getItem("spruhaverticalstyles");

		switch (verticalStyles) {
		case "default":
			Defaultmenu(actionfunction);
			break;
		case "closed":
			Closedmenu(actionfunction);
			break;
		case "icontext":
			iconTextfn(actionfunction);
			break;
		case "overlay":
			iconOverayFn(actionfunction);
			break;
		case "detached":
			DetachedFn(actionfunction);
			break;
		case "doublemenu":
			DoubletFn(actionfunction);
			break;
		}
	}

	//Theme Primary:
	if (localStorage.dynamiccolor) {
		const theme = store.getState();
		actionfunction({
			...theme,
			"colorPrimaryRgb": localStorage.dynamiccolor,
			"colorPrimary": localStorage.dynamiccolor
		});
	}
	//Theme BAckground:
	if (localStorage.darkBgRGB1) {
		const theme = store.getState();
		actionfunction({
			...theme,
			"bodyBg": localStorage.darkBgRGB1,
			"bodyBg1": localStorage.darkBgRGB2,
			"Light": localStorage.LightRGB,
			"darkBg": localStorage.darkBgRGB3,
			"inputBorder": localStorage.darkBgRGB4,			
            "sidemenuActiveBgcolor": localStorage.darkBgRGB2,
			"dataThemeMode": "dark",
			"dataHeaderStyles": localStorage.spruhaHeader ? localStorage.spruhaHeader : localStorage.spruhadarktheme ? "dark" : "dark",
			"dataMenuStyles": "dark",
		});
	}
	// ThemeColor MenuColor Start
	switch (localStorage.spruhaMenu) {
	case "light":
		lightMenu(actionfunction);
		break;
	case "dark":
		darkMenu(actionfunction);

		break;
	case "color":
		colorMenu(actionfunction);

		break;
	case "gradient":
		gradientMenu(actionfunction);

		break;
	case "transparent":
		transparentMenu(actionfunction);

		break;
	default:
		break;
	}
	// ThemeColor Header Colors: start
	switch (localStorage.spruhaHeader) {
	case "light":
		lightHeader(actionfunction);

		break;
	case "dark":
		darkHeader(actionfunction);

		break;
	case "color":
		colorHeader(actionfunction);

		break;
	case "gradient":
		gradientHeader(actionfunction);

		break;
	case "transparent":
		transparentHeader(actionfunction);

		break;
	default:
		break;
	}
};
export const defaultlightHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"defaultHeaderStyles": "light",
		"dataHeaderStyles": "",
	});
	localStorage.setItem("spruhadefaultHeader", "light");
	localStorage.removeItem("dark");
};
export const defaultdarkHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"defaultHeaderStyles": "dark",
		"dataHeaderStyles": "",
	});
	localStorage.setItem("spruhadefaultHeader", "dark");
	localStorage.removeItem("light");
};
export const defaultcolorHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"defaultHeaderStyles": "color",
		"dataHeaderStyles": "",
	});
	localStorage.setItem("spruhadefaultHeader", "color");
	localStorage.removeItem("dark");
};
export const defaultgradientHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"defaultHeaderStyles": "gradient",
		"dataHeaderStyles": "",

	});
	localStorage.setItem("spruhadefaultHeader", "gradient");
	localStorage.removeItem("transparent");
};
export const defaulttransparentHeader = (actionfunction) => {
	const theme = store.getState();
	actionfunction({
		...theme,
		"defaultHeaderStyles": "transparent",
		"dataHeaderStyles": "",
	});
	localStorage.removeItem("gradient");
	localStorage.setItem("spruhadefaultHeader", "transparent");
};

