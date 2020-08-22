import "./Menu.css";
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Button, Icon} from "semantic-ui-react";
import Constants from "../../configurations/Constants"

function Menu() {
    return (
        <div>
            <Navbar>
                <DropdownMenu></DropdownMenu>
            </Navbar>
        </div>
    );
}

function Navbar(props) {
    return (
        <nav className="navbar1">
            <ul className="navbar-nav1">{props.children}</ul>
        </nav>
    );
}

function DropdownMenu() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios
            .get(Constants.MENU_BASE_URL)
            .then((results) => {
                setMenu(results.data.body);
            });
    }, []);

    const dropdownRef = useRef(null);
    const [hover, setHover] = useState("");
    const [subHover, setSubHover] = useState("");
    const [allowFirstNest, setFirstNest] = useState(false);
    const [allowSecondNest, setSecondNest] = useState(false);
    const [ifMouseOn, setMenuOn] = useState(true);
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item1">
            <Button onMouseEnter={() => {
                setOpen(!open);
                setMenuOn(true)
            }} size="mini" className="header-button">
                Categories
                <Icon
                    style={{paddingLeft: 10}}
                    name="caret down"
                />
            </Button>
            {open &&

            <div>
                {ifMouseOn && <div onMouseEnter={() => setMenuOn(true)} onMouseLeave={() => {
                    setMenuOn(false);
                    setOpen(!open);
                }}>
                    <div className="dropdown-1" ref={dropdownRef}>
                        <div className="menu-1">
                            {menu.map((menuItem) => (
                                <div>
                                    <a onMouseEnter={() => {
                                        setHover(menuItem.name);
                                        if (menuItem.categories) setFirstNest(true);
                                        if (!menuItem.categories) setFirstNest(false);
                                        setSecondNest(false);
                                    }}>
                                        <a className="menu-item-1">
                                            <p>{menuItem.name}</p>
                                            {menuItem.categories && <Icon className="icon-right" name="chevron right"/>}
                                        </a>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {allowFirstNest && <div className="dropdown-a">
                        {menu.map((menuItem) => {
                            if (menuItem.categories) {
                                if (hover === menuItem.name) {
                                    return (
                                        <div>
                                            <div className="menu-1">
                                                {menuItem.categories.map((category) => (
                                                    <a onMouseEnter={() => {
                                                        setSubHover(category.name);
                                                        if (category.categories) setSecondNest(true);
                                                        if (!category.categories) {
                                                            setSecondNest(false);
                                                            setSecondNest(false);
                                                        }
                                                    }}
                                                    >
                                                        <a className="menu-item-1">
                                                            <p>{category.name}</p>
                                                            {category.categories &&
                                                            <Icon className="icon-right" name="chevron right"/>}
                                                        </a>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                    }


                    {allowSecondNest && <div className="dropdown-b">
                        {menu.map((menuItem) => {
                            if (menuItem.categories) {
                                return (
                                    menuItem.categories.map((category) => {
                                        if ((subHover !== "") && (category.name === subHover) && category.categories) {
                                            return (
                                                <div>
                                                    <div className="menu-1">
                                                        {category.categories.map((subCategory) => (
                                                            <a onMouseEnter={() => setSubHover(category.name)}>
                                                                <a className="menu-item-1">
                                                                    <p>{subCategory.name}</p>
                                                                </a>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                )
                            }
                        })}
                    </div>
                    }
                </div>
                }
            </div>
            }
        </li>
    );
}

export default Menu;
