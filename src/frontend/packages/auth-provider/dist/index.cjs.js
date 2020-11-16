"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("jwt-decode")),n=require("react"),r=e(n),o=require("react-admin"),i=require("@material-ui/styles"),a=require("@material-ui/core/styles"),c=require("@material-ui/core"),l=e(require("@material-ui/icons/Lock")),u=e(require("@material-ui/core/MenuItem")),m=e(require("@material-ui/icons/PowerSettingsNew")),s=e(require("@material-ui/icons/ArrowDropDown")),f=e(require("@material-ui/icons/Edit")),d=e(require("@material-ui/icons/AccountCircle")),g=a.makeStyles((function(e){return{main:{display:"flex",flexDirection:"column",minHeight:"100vh",alignItems:"center",justifyContent:"flex-start",backgroundColor:e.palette.primary[500]},card:{minWidth:300,marginTop:"6em"},lockIconAvatar:{margin:"1em",display:"flex",justifyContent:"center"},lockIcon:{backgroundColor:e.palette.secondary[500]},button:{width:"100%"},icon:{width:24,height:24}}})),h=n.forwardRef((function(e,t){var n=o.useLogout();return r.createElement(u,{onClick:function(){return n()},ref:t},r.createElement(m,null),"   Se déconnecter")}));function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}exports.LoginPage=function(e){var t=e.theme,r=e.history,u=e.location,m=g(),s=o.useNotify(),f=o.useLogin(),d=new URLSearchParams(u.search);return d.has("token")&&(localStorage.setItem("token",d.get("token")),s("Vous êtes maintenant connecté","info"),r.push("/")),d.has("logout")&&(localStorage.removeItem("token"),s("Vous êtes maintenant déconnecté","info"),r.push("/")),n.createElement(i.ThemeProvider,{theme:a.createMuiTheme(t)},n.createElement("div",{className:m.main},n.createElement(c.Card,{className:m.card},n.createElement("div",{className:m.lockIconAvatar},n.createElement(c.Avatar,{className:m.lockIcon},n.createElement(l,null))),n.createElement(c.CardActions,null,n.createElement(c.Button,{className:m.button,variant:"outlined",type:"submit",onClick:function(){return f()},startIcon:n.createElement(c.Avatar,{src:"/lescommuns.jpg",className:m.icon})},"Les Communs")))),n.createElement(o.Notification,null))},exports.LogoutButton=h,exports.UserMenu=function(e){var t=e.logout,i=e.children,a=o.useGetIdentity().identity,l=p(n.useState(null),2),u=l[0],m=l[1];if(!t&&!i)return null;var g=Boolean(u),h=function(){return m(null)};return r.createElement(c.Box,{spacing:2},r.createElement(c.Button,{variant:"outlined",onClick:function(e){return m(e.currentTarget)},endIcon:r.createElement(s,null)},a&&a.fullName?a.fullName:"Anonyme"),r.createElement(c.Menu,{id:"menu-appbar",anchorEl:u,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},open:g,onClose:h},a&&""!==a.id?r.createElement(r.Fragment,null,r.createElement(o.MenuItemLink,{to:"/User/".concat(encodeURIComponent(a.id),"/show"),primaryText:"Voir son profil",leftIcon:r.createElement(d,null),onClick:h}),r.createElement(o.MenuItemLink,{to:"/User/".concat(encodeURIComponent(a.id),"/edit"),primaryText:"Editer son profil",leftIcon:r.createElement(f,null),onClick:h}),t):r.createElement(o.MenuItemLink,{to:"/login",primaryText:"Se connecter",onClick:h})))},exports.authProvider=function(e){return{login:function(t){return window.location.href="".concat(e,"auth?redirectUrl=")+encodeURIComponent(window.location.href),Promise.resolve()},logout:function(){var t=new URL(window.location.href);return window.location.href="".concat(e,"auth/logout?redirectUrl=")+encodeURIComponent(t.origin+"/#/login?logout"),Promise.resolve("/")},checkAuth:function(){return localStorage.getItem("token"),Promise.resolve()},checkError:function(e){return Promise.resolve()},getPermissions:function(e){return Promise.resolve()},getIdentity:function(){var e=localStorage.getItem("token");if(e){var n=t(e),r=n.webId,o=n.name,i=n.familyName;return{id:r,fullName:"".concat(o," ").concat(i)}}}}};