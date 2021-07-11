import Link from "next/link";
import { FOOTER_MENU } from "../../lib/constants";
import SimpleMenu from "./simple-menu";

export default function Footer() {
  return (
    <footer>
      <div className="w-full pt-10 mt-20 border-t border-primary-300 bg-primary-50">
        <div className="w-full py-5 text-sm bg-primary-600">
          <div className="container flex flex-wrap mx-auto text-primary-50 ">
            <div className="w-1/2">
              &copy; 2018 - {new Date().getFullYear()}
              <span className="mx-2 font-bold">{process.env.siteTitle}</span>
              All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-end w-1/2">
              <SimpleMenu menuItems={FOOTER_MENU} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
