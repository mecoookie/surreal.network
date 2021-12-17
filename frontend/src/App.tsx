/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-scroll";
import mintpass from "./videos/mintpass.mp4";
import logo from "./images/logo.png";
import opensea from "./images/opensea.svg";
import discord from "./images/discord.svg";
import twitter from "./images/twitter.svg";
import preview from "./images/preview.jpg";
import github from "./images/github.png";
import apes from "./images/apes.gif";
import dave from "./images/dave.png";
import dejen from "./images/dejen.png";
import gerry from "./images/gerry.png";
import asherah from "./images/asherah.png";

const navigation = [
  { name: "Mint Pass", href: "#", current: false },
  { name: "Redeem", href: "#", current: false },
  { name: "Team", href: "#", current: false },
];

const people = [
  {
    name: "Ξ GERRY Ξ",
    role: "Artist",
    imageUrl: gerry,
    twitterUrl: "https://twitter.com/nftgerry",
  },
  {
    name: "Dave | fancyrats.eth",
    role: "Dev",
    imageUrl: dave,
    twitterUrl: "https://twitter.com/fancyrats_eth",
  },
  {
    name: "dejen.eth",
    role: "Operations",
    imageUrl: dejen,
    twitterUrl: "https://twitter.com/dejen_art",
  },
  {
    name: "asherah.eth",
    role: "Advisor",
    imageUrl: asherah,
    twitterUrl: "https://twitter.com/AsherahEth",
  },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
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
                          <Link
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                            to={item.name}
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
                          </Link>
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
                    <Link
                      spy={true}
                      smooth={true}
                      offset={50}
                      duration={500}
                      to={item.name}
                      key={item.name}
                      href={item.href}
                    >
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
                    </Link>
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
                <h2 className="ml-3 text-lg font-bold leading-7 text-white sm:truncate">
                  Phase 1
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
                  <a
                    href="https://github.com/fancyrats/surreal.network"
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
                        src={github}
                      />
                      Github
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 mt-8" id="Mint Pass">
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
                      <p className="text-4xl text-emerald-500 font-bold">
                        Minting 12/17 7:00 PM Central (1:00 AM UTC)
                      </p>
                    </div>
                    <div className="mt-6 max-w-sm">
                      <a
                        href="https://etherscan.io/address/0x18d0e051317e04ae96314c372bd35220460eec62"
                        target="_blank"
                      >
                        <div className="hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center">
                          <p>ERC1155 Verified Smart Contract</p>
                          <p className="text-blue-400 font-bold">
                            0x18d0e051...220460eec62
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
            <div className="bg-gray-800 mt-8" id="Redeem">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
                <div className="max-w-xl">
                  <div className="mt-1.5 relative">
                    <img src={apes} />
                  </div>
                </div>
                <div className="mt-1 w-full max-w-xs">
                  <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    SURREAL APES
                  </h2>
                  <div className="text-xl text-gray-400">
                    <div className="mt-8 flex flex-col gap-4">
                      <div>Burn your Mint Pass</div>
                      <div>Choose your BAYC/MAYC</div>
                      <div>Redeem matching SURREAL APE</div>
                    </div>
                    <div className="mt-8 text-2xl font-bold">
                      Redeeming Soon
                    </div>
                    <a
                      href="https://etherscan.io/address/0xbc4aee331e970f6e7a5e91f7b911bdbfdf928a98"
                      target="_blank"
                    >
                      <div className="mt-8 hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center">
                        <p>ERC721 Verified Smart Contract</p>
                        <p className="text-blue-400 font-bold">
                          0xbc4aee33...dbfdf928a98
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900" id="Team">
              <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                  <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                      The Surreal Team
                    </h2>
                  </div>
                  <ul
                    role="list"
                    className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
                  >
                    {people.map((person) => (
                      <li
                        key={person.name}
                        className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left"
                      >
                        <div className="space-y-6 xl:space-y-10">
                          <img
                            className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                            src={person.imageUrl}
                            alt=""
                          />
                          <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                            <div className="font-medium text-lg leading-6 space-y-1">
                              <h3 className="text-white">{person.name}</h3>
                              <p className="text-indigo-400">{person.role}</p>
                            </div>

                            <ul
                              role="list"
                              className="flex justify-center space-x-5"
                            >
                              <li>
                                <a
                                  href={person.twitterUrl}
                                  className="text-gray-400 hover:text-gray-300"
                                  target="_blank"
                                >
                                  <span className="sr-only">Twitter</span>
                                  <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-14">
            {/* <div className="flex justify-center space-x-6 md:order-2"></div> */}
            {/* <div className="mt-8 md:mt-0 md:order-1"> */}
            <p className="text-center text-base text-gray-400">
              &copy; 2021 SURREAL APES. All rights reserved.
            </p>
            {/* </div> */}
          </div>
        </footer>
      </div>
    </>
  );
}
