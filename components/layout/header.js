import React from "react";
import Link from "next/link";
import TopMenu from "./top-menu";
import { MAIN_MENU, USER_MENU } from "../../lib/constants";
import MenuIcon from "../ui/icon/menu";
import UserMenu from "./user-menu";

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    //   this.burger = React.createRef();
    this.menu = React.createRef();
  }

  mobileMenu() {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  render() {
    return (
      <header className={this.className ? this.className : "w-full bg-white "}>
        <section className="grid max-w-screen-sm grid-flow-col grid-cols-3 mx-auto md:max-w-screen-sm lg:max-w-screen-lg sm:grid-cols-1">
          <div className="flex items-center justify-center h-24 col-span-1 py-5 md:justify-start md:pl-2 ">
            <span className="w-16 h-16 mx-auto text-3xl bg-gray-900 rounded lg:ml-0">
              <Link href="/">
                <a>
                  <img src="/logo.png" alt={process.env.siteTitle} />
                </a>
              </Link>
            </span>

            <div
              className="hidden px-4 text-gray-600 cursor-pointer"
              id="burger"
              onClick={this.mobileMenu}
            >
              <MenuIcon />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end h-auto col-span-2 pr-2 text-sm md:h-24 text-primary-700">
            <UserMenu />
          </div>
        </section>
        <section className="border-bottom" id="menu" ref={this.menu}>
          <TopMenu menuItems={MAIN_MENU} />
        </section>
      </header>
    );
  }
}

export default PageHeader;
