import React from 'react'
import Link from 'next/link'
function Header() {
  return (
            <header className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center">
                        <img
                            src="https://placehold.co/40x40"
                            alt="Athleticon logo"
                            className="h-10 w-10"
                        />
                        <span className="ml-2 text-xl font-bold">Athleticon</span>
                    </div>
                    <nav className="flex space-x-6">
                        <a href="#" className="text-gray-800 font-semibold">Home</a>
                        <Link href="/user-dashboard" className="text-gray-600">DashBoard</Link>
                        <Link href="/virtual-meeetups" className="text-gray-600">Virtual Meetups</Link>
                        <Link href="/virtual-meeetups" className="text-gray-600">Games and Puzzles</Link>
                        <Link href="/virtual-meeetups" className="text-gray-600">Certifications and Badges</Link>
                    </nav>
                    <div className="flex items-center">
                        <img
                            src="https://placehold.co/40x40"
                            alt="User avatar"
                            className="h-10 w-10 rounded-full"
                        />
                    </div>
                </div>
            </header>
  )
}

export default Header