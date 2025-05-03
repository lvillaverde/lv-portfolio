import "./css/Menu.css";

const menuItems = [
    { name: "About Me", link: "#home" },
    { name: "Study Cases", link: "#about" },
    { name: "Snapshots", link: "#contact" },
    { name: "Contact", link: "#contact" }
];

function Menu() {

    return (
        <nav className="menu" >
            <ul>
                {menuItems.map((item, index) => (
                    <li className="menu-item" key={index}>{item.name}</li>
                ))}
            </ul>
        </nav>
    )
}

export default Menu;