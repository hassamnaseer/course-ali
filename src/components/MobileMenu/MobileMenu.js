import './index.css';
import axios from "axios"
import {ReactComponent as ArrowIcon} from './icons/arrow.svg';
import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import Constants from "../../configurations/Constants"


function App() {
    return (
        <DropdownMenu></DropdownMenu>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('Categories');
    const dropdownRef = useRef(null);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios
            .get(Constants.MENU_BASE_URL)
            .then((results) => {
                setMenu(results.data.body);
                console.log(results.data.body);
            });
    }, []);

    function calcHeight(el) {
        const height = el.offsetHeight;
    }

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item2" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                {props.children}

            </a>
        );
    }

    return (
        <div className="dropdown2" style={{height: 500}} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'Categories'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu2">
                    <DropdownItem>
                        <strong>All Categories</strong>
                    </DropdownItem>
                    {menu.map((menuItem) => {
                        return (
                            <DropdownItem goToMenu={menuItem.name}>
                                <p>{menuItem.name}</p>
                            </DropdownItem>
                        )
                    })}
                </div>
            </CSSTransition>


            {menu.map((menuItem) => {
                    if (menuItem.categories) {
                        return (
                            <CSSTransition
                                in={activeMenu === menuItem.name}
                                timeout={500}
                                classNames="menu-secondary"
                                unmountOnExit
                                onEnter={calcHeight}
                            >
                                <div className="menu2">
                                    <DropdownItem goToMenu="Categories">
                                        <span className="icon-button2"><ArrowIcon/></span>
                                        <h6>Back</h6>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <strong>All {menuItem.name}</strong>
                                    </DropdownItem>

                                    {menuItem.categories.map((category) => {
                                        return (
                                            <DropdownItem goToMenu={category.name}>
                                                <p>{category.name}</p>
                                            </DropdownItem>
                                        )
                                    })}
                                </div>
                            </CSSTransition>
                        )
                    }
                }
            )}

            {menu.map((menuItem) => {
                if (menuItem.categories) {
                    return (
                        menuItem.categories.map((category) => {
                            if (category.categories) {
                                return (
                                    <CSSTransition
                                        in={activeMenu === category.name}
                                        timeout={500}
                                        classNames="menu-sub-secondary"
                                        unmountOnExit
                                        onEnter={calcHeight}
                                    >
                                        <div className="menu2">
                                            <DropdownItem goToMenu={menuItem.name}>
                                                <span className="icon-button2"><ArrowIcon/></span>
                                                <h6>Back</h6>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <strong>All {category.name}</strong>
                                            </DropdownItem>
                                            {console.log(category.name)}
                                            {category.categories.map((subCategory) => {
                                                return (
                                                    <DropdownItem>
                                                        <p>{subCategory.name}</p>
                                                    </DropdownItem>
                                                )
                                            })}
                                        </div>
                                    </CSSTransition>
                                );
                            }
                        })
                    )
                }
            })}
        </div>
    );
}

export default App;
