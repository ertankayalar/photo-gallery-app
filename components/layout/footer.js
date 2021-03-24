import Link from 'next/link'
import { FOOTER_MENU } from '../../lib/constants'
import SimpleMenu from './simple-menu'

export default function Footer() {
  return (
    <footer>
      <div className='w-full mt-20 border-t border-primary-300 bg-primary-50 pt-10'>
        <div className='w-full py-5 text-sm bg-primary-600'>
          <div className='container mx-auto text-primary-50 flex flex-wrap '>
            <div className='w-1/2'>
              &copy; 2018 - {new Date().getFullYear()}
              <span className='font-bold mx-2'>{process.env.siteTitle}</span>
              All rights reserved.
            </div>
            <div className='w-1/2 flex flex-wrap items-center justify-end'>
              <SimpleMenu menuItems={FOOTER_MENU} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
