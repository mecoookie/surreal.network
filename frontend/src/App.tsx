/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import mintpass from "./videos/mintpass.mp4";
import logo from "./images/logo.png";
import opensea from "./images/opensea.svg";
import discord from "./images/discord.svg";
import twitter from "./images/twitter.svg";
import preview from "./images/preview.jpg";
import apes from "./images/apes.gif";

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";

const navigation = [
  { name: "Mint Pass", href: "#", current: true },
  { name: "Redeem", href: "#", current: false },
  { name: "FAQ", href: "#", current: false },
  { name: "Team", href: "#", current: false },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-900">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12" src={logo} />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-5 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-gray-600 shadow">
          <img src={preview} alt="Preview" />
        </header>
        <main>
          <div className="bg-gray-900 mx-auto py-6 sm:px-6 lg:px-8">
            <div className="ml-0 lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="ml-3 text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                  SURREAL APES
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <a
                    href="https://opensea.io/collection/surreal-mint-pass"
                    target="_blank"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white mt-2",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={"page"}
                  >
                    <div className="flex items-center text-sm text-gray-300">
                      <img
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                        src={opensea}
                      />
                      Mint Pass
                    </div>
                  </a>
                  <a
                    href="https://opensea.io/collection/surrealapes"
                    target="_blank"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white mt-2",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={"page"}
                  >
                    <div className="flex items-center text-sm text-gray-300">
                      <img
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                        src={opensea}
                      />
                      SURREAL APES
                    </div>
                  </a>
                  <a
                    href="https://discord.gg/ccY5kQvK"
                    target="_blank"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white mt-2",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={"page"}
                  >
                    <div className="flex items-center text-sm text-gray-300">
                      <img
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                        src={discord}
                      />
                      Discord
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/SurrealApes"
                    target="_blank"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white mt-2",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={"page"}
                  >
                    <div className="flex items-center text-sm text-gray-300">
                      <img
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                        src={twitter}
                      />
                      Twitter
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 mt-8">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Mint Pass #1
                  </h2>
                  <div className="mt-7 text-xl text-gray-400">
                    <div className="flex flex-col gap-4">
                      <p className="text-2xl text-emerald-500">
                        99/100 available
                      </p>
                      <p className="text-2xl text-emerald-500">0.04Ξ</p>
                      <p className="text-lg">Max 4 per wallet</p>
                      <p className="text-lg">MAYC/BAYC Exclusive</p>
                    </div>
                    <div className="mt-6 max-w-sm">
                      <a
                        href="https://etherscan.io/address/0x18d0e051317e04ae96314c372bd35220460eec62"
                        target="_blank"
                      >
                        <div className="hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center">
                          <p>ERC1155 Verified Smart Contract</p>
                          <p className="text-blue-400 font-bold">
                            0x18d0e051317e04ae96314c372bd35220460eec62
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-10 w-full max-w-xs">
                  <div className="mt-1.5 relative">
                    <video src={mintpass} autoPlay muted loop></video>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 mt-8">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
                <div className="max-w-xl">
                  <div className="mt-1.5 relative">
                    <img src={apes} />
                  </div>
                </div>
                <div className="mt-10 w-full max-w-xs">
                  <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    SURREAL APES
                  </h2>
                  <div className="text-xl text-gray-400">
                    <div className="mt-5 flex flex-col gap-4">
                      <div>Burn your Mint Pass</div>
                      <div>Choose your BAYC/MAYC</div>
                      <div>Redeem matching SURREAL APE</div>
                    </div>
                    <div className="mt-12 text-2xl font-bold">
                      Redeeming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2"></div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2021 SURREAL APES. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
