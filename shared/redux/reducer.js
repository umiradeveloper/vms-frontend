const ThemeChanger = "ThemeChanger";
const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const Buynow_checkout = "Buynow_checkout";
const ADD_TO_CHECKOUT = "ADD_TO_CHECKOUT";
const ADD_TO_CART = "ADD_TO_CART"; // Define ADD_TO_CART as a constant
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
const initialState = {
    lang: "en",
    dir: "ltr",
    dataMenuStyles: "dark",
    dataThemeMode: "light",
    dataNavLayout: "vertical",
    dataNavStyle: "",
    toggled: "",
    dataIconOverlay: "",
    horStyle: "",
    dataPageStyle: "regular",
    dataWidth: "fullwidth",
    dataMenuPosition: "fixed",
    dataHeaderPosition: "fixed",
    dataHeaderStyles: "light",
    colorPrimaryRgb: "",
    dataVerticalStyle: "overlay",
    Light: "",

    bodyBg: "", bodyBg1: "", darkBg: "", bgImg: "", bgImg1: "", lightRgb: "", formControl: "", inputBorder: "", sidemenuActiveBgcolor: "",
    dataBgImage: "",
    iconText: "",
    body: {
        class: ""
    },
    selectedItem: null,
    wishlist: [],
    cart: [],
    count: 0,
    checkoutItems: [],
    selectedItem: null,
    wishlist: [],
    cart: [],
    count: 0,
    checkoutItems: [],
    products: [

        {
            id: 1,
            ProductId: "Women's Red Dress",
            Product1: "../../../assets/images/pngs/1.png",
            Product2: "../../../assets/images/pngs/2.png",
            images: [
                { 'img': "../../../assets/images/pngs/1.png" },
                { 'img': "../../../assets/images/pngs/2.png" },
                { 'img': "../../../assets/images/pngs/1.png" },
                { 'img': "../../../assets/images/pngs/2.png" }],
            Productpriceold: "$19.00",
            Productdiscountnew: "$20.00",
            Addtocart: "Add to cart ",
            Quickview: "Quick View",
            ProductRating: "icons",
            Productdiscount: "- 33%",
            Productdiscounttext: "success",
            discountoffer: "discount",
            Favorite: "heart",
            Color: "Color:",
            Colorpicker: "Red color",
            Qty: "In stock",
            Qtytext: "success",
            Price: 26,
            dValue: 2
        },

        {
            id: 2, ProductId: "Casual Wear Top", Product1: "../../../assets/images/pngs/3.png",
            images: [
                { 'img': "../../../assets/images/pngs/3.png" },
                { 'img': "../../../assets/images/pngs/4.png" },
                { 'img': "../../../assets/images/pngs/3.png" },
                { 'img': "../../../assets/images/pngs/4.png" }], Product2: "../../../assets/images/pngs/4.png", Productpriceold: "$17.00", Productdiscountnew: "$20.00", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Color: "Color:", Colorpicker: "Red color", Qty: "Out of stock", Qtytext: "danger",
            },
        {
            id: 3, ProductId: "Party Wear Black Top", Product1: "../../../assets/images/pngs/7.png", Product2: "../../../assets/images/pngs/8.png",
            images: [
                { 'img': "../../../assets/images/pngs/7.png" },
                { 'img': "../../../assets/images/pngs/8.png" },
                { 'img': "../../../assets/images/pngs/7.png" },
                { 'img': "../../../assets/images/pngs/8.png" }], Productpriceold: "$24.00", Productdiscountnew: "$20.00", discountoffer: "discount", Productdiscount: "- 50%", Productdiscounttext: "info", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "In stock", Qtytext: "success", Color: "Color:", Colorpicker: "Black color",
        },
        {
            id: 4, ProductId: "Women's Rayon Top", Product1: "../../../assets/images/pngs/9.png", Product2: "../../../assets/images/pngs/10.png",
            images: [
                { 'img': "../../../assets/images/pngs/9.png" },
                { 'img': "../../../assets/images/pngs/10.png" },
                { 'img': "../../../assets/images/pngs/9.png" },
                { 'img': "../../../assets/images/pngs/10.png" }], Productpriceold: "$15.00", Productdiscountnew: "$20.00", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "Out of stock", Qtytext: "danger", Color: "Color:", Colorpicker: "Black color", Color: "Color:", Colorpicker: "Black color",
        },
        {
            id: 5, ProductId: "Western Skirt & Top", Product1: "../../../assets/images/pngs/11.png", Product2: "../../../assets/images/pngs/12.png",
            images: [
                { 'img': "../../../assets/images/pngs/11.png" },
                { 'img': "../../../assets/images/pngs/12.png" },
                { 'img': "../../../assets/images/pngs/11.png" },
                { 'img': "../../../assets/images/pngs/12.png" }], Productpriceold: "$18.00", Productdiscountnew: "$20.00", discountoffer: "discount", Productdiscount: "- 40%", Productdiscounttext: "danger", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "In stock", Qtytext: "success", Color: "Color:", Colorpicker: "Black & White",
        },
        {
            id: 6, ProductId: "Party Wear Fancy Top", Product1: "../../../assets/images/pngs/2.png", Product2: "../../../assets/images/pngs/1.png",
            images: [
                { 'img': "../../../assets/images/pngs/2.png" },
                { 'img': "../../../assets/images/pngs/1.png" },
                { 'img': "../../../assets/images/pngs/2.png" },
                { 'img': "../../../assets/images/pngs/1.png" }], Productpriceold: "$19.00", Productdiscountnew: "$20.00", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "Out of stock", Qtytext: "danger", Color: "Color:", Colorpicker: "Red color",
        },
        {
            id: 7, ProductId: "Long Floral Tunic Tops", Product1: "../../../assets/images/pngs/5.png", Product2: "../../../assets/images/pngs/6.png",
            images: [
                { 'img': "../../../assets/images/pngs/5.png" },
                { 'img': "../../../assets/images/pngs/6.png" },
                { 'img': "../../../assets/images/pngs/5.png" },
                { 'img': "../../../assets/images/pngs/6.png" }], Productpriceold: "$33.00", Productdiscountnew: "$20.00", discountoffer: "discount", Productdiscount: "- 43%", Productdiscounttext: "warning", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "In stock", Qtytext: "success", Color: "Color:", Colorpicker: "Pink color",
        },
        {
            id: 8, ProductId: "Long Slit Full Sleeve", Product1: "../../../assets/images/pngs/13.png", Product2: "../../../assets/images/pngs/31.png",
            images: [
                { 'img': "../../../assets/images/pngs/13.png" },
                { 'img': "../../../assets/images/pngs/31.png" },
                { 'img': "../../../assets/images/pngs/13.png" },
                { 'img': "../../../assets/images/pngs/31.png" }], Productpriceold: "$46.00", Productdiscountnew: "$20.00", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "Out of stock", Qtytext: "danger", Color: "Color:", Colorpicker: "Gold color",
        },
        {
            id: 9, ProductId: "Long Floral Tunic Tops", Product1: "../../../assets/images/pngs/33.png", Product2: "../../../assets/images/pngs/32.png",
            images: [
                { 'img': "../../../assets/images/pngs/33.png" },
                { 'img': "../../../assets/images/pngs/34.png" },
                { 'img': "../../../assets/images/pngs/33.png" },
                { 'img': "../../../assets/images/pngs/34.png" }], Productpriceold: "$25.00", Productdiscountnew: "$20.00", Addtocart: "Add to cart ", Quickview: "Quick View", ProductRating: "icons", Favorite: "heart", Qty: "In stock", Qtytext: "success", Color: "Color:", Colorpicker: "Red color",
        }
    ]
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ThemeChanger:
            return {
                ...state,
                ...payload
            };

        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: payload
            };

        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, payload]
            };

        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== payload)
            };

        case Buynow_checkout:
            return {
                ...state,
                cart: [payload],
                actionType: action.actionType
            };

        case ADD_TO_CHECKOUT:
            return {
                ...state,
                checkoutItems: action.payload,
                actionType: action.actionType
            };

        case ADD_TO_CART: // Handle ADD_TO_CART action
            return {
                ...state,
                cart: [...state.cart, payload]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== payload)
            };

        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity, total: action.payload.quantity * item.Price } : item
                ),
            };

        default:
            return state;
    }
}
