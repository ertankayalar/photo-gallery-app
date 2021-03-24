import React from 'react'
import Link from 'next/link'
import TopMenu from './top-menu'
import { MAIN_MENU, USER_MENU } from '../../lib/constants'
import MenuIcon from '../ui/menu-icon'
import UserMenu from './user-menu'

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    //   this.burger = React.createRef();
    this.menu = React.createRef()
  }

  mobileMenu() {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden')
    } else {
      menu.classList.add('hidden')
    }
  }

  render() {
    return (
      <header className={this.className ? this.className : 'w-full bg-white '}>
        <section className=' mx-auto max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-lg grid grid-flow-col grid-cols-3 sm:grid-cols-1'>
          <div className='col-span-1 flex justify-center items-center md:justify-start py-5 h-24 md:pl-2 '>
            <span className='text-3xl bg-gray-900 mx-auto lg:ml-0 w-16 h-16 rounded'>
              <Link href='/'>
                <a>
                  <img src='/logo.png' alt={process.env.siteTitle} />
                </a>
              </Link>
            </span>

            <div
              className='px-4 cursor-pointer hidden text-gray-600'
              id='burger'
              onClick={this.mobileMenu}
            >
              <MenuIcon />
            </div>
          </div>

          <div className='col-span-2  h-auto md:h-24 pr-2 flex flex-wrap  items-center justify-end text-primary-700 text-sm'>
            <UserMenu menuItems={USER_MENU} />
          </div>
        </section>
        <section className='border-bottom' id='menu' ref={this.menu}>
          <TopMenu menuItems={MAIN_MENU} />
        </section>
      </header>
    )
  }
}

export default PageHeader
