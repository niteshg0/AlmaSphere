import React from "react";
import {Link} from "react-router"


const Home= () => {
  return (
    <main className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Welcome Section */}
      <section className="text-center py-12 bg-gray-800 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
          Welcome to Alumni Association
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Connect, Network, and Grow with the Alumni Community.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-400">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Event Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              Events
            </h3>
            <p className="text-gray-300">
              Stay updated with the latest reunions, webinars, and conferences.
            </p>
          </div>

          {/* Jobs Card */}
          <Link to={"/jobs"}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">Jobs</h3>
            <p className="text-gray-300">
              Discover job opportunities and grow your career with alumni
              support.
            </p>
          </div>
          </Link>

          {/* Donation Card */}
          <Link to={"/donation"}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              Donations
            </h3>
            <p className="text-gray-300">
              Contribute and support the development of your alma mater.
            </p>
          </div>
          </Link>

          {/* Galleries Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              Galleries
            </h3>
            <p className="text-gray-300">
              Relive memories through photos and videos of past events.
            </p>
          </div>

          {/* About College Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              About College
            </h3>
            <p className="text-gray-300">
              Learn about the legacy, achievements, and vision of your college.
            </p>
          </div>
          {/* Your query */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              Your Queris
            </h3>
            <p className="text-gray-300">
              Learn about the legacy, achievements, and vision of your college.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
