// import UserDashboard from "./components/user-dashboard";
// import VirtualMeetingRoom from "./components/vr-youga-room";

// export default function HomePage() {
//   return (
//     <main>
//       {/* working */}
//       <VirtualMeetingRoom></VirtualMeetingRoom>
//       <UserDashboard></UserDashboard>
//     </main>
//   );
// }


import React from 'react';

const Hero = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
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
                        <a href="#" className="text-gray-600">Exercise</a>
                        <a href="#" className="text-gray-600">Features</a>
                        <a href="#" className="text-gray-600">Services</a>
                        <a href="#" className="text-gray-600">Premium</a>
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

            {/* Main Content */}
            <main className="container mx-auto mt-10 px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
                            Fitness &<br />Health Training
                        </h1>
                        <p className="mt-4 text-gray-600">
                            Strong is the simplest, most intuitive workout tracking experience. Trusted by over 3 million users worldwide.
                        </p>
                        <button className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold">
                            Get Started
                        </button>
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img
                            src="https://placehold.co/600x400"
                            alt="Person exercising with dumbbells"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-16 flex justify-around text-center">
                    <Statistic value="3.2k" label="Happy User" />
                    <Statistic value="350k" label="Running Track" />
                    <Statistic value="100+" label="Workout Type" />
                </div>
            </main>
        </div>
    );
};

const Statistic = ({ value, label }) => (
    <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-gray-600">{label}</p>
    </div>
);

export default Hero;