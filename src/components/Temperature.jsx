import React from "react";

function Temperature({ setCity, stats, unitSymbol, error, onInputFieldClick, recentSearches = [], handleRecentSearchSelection }) {
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center relative">
        <input
          type="text"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-400 text-md focus:border-slate-400 block w-full md:w-60 p-2 focus:outline-none mb-4 md:mb-0 md:mr-4"
          placeholder="Enter Your City Name"
          onChange={handleCityChange}
          defaultValue="New Delhi"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(e.target.value);
            }
          }}
          onClick={onInputFieldClick}
        />
        {recentSearches.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full py-2 rounded-md shadow-lg top-full z-10">
            {recentSearches.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRecentSearchSelection(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {stats && stats.temp !== undefined ? (
            <>
              <div className="flex justify-center ">
                {stats.isDay !== undefined ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-14 h-14 ${
                      stats.isDay !== 0 ? "text-yellow-300" : "text-slate-200"
                    } mt-8`}
                  >
                    {stats.isDay !== 0 ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    )}
                  </svg>
                ) : null}
              </div>

              <div className="flex justify-center items-center text-slate-200 mt-8">
                <p className="font-semibold text-[55px]">
                  {stats.temp}
                  <span className="text-[33px]">{unitSymbol}</span>
                </p>
              </div>

              <div className="flex justify-center text-slate-300 mt-8 text-[25px]">
                {stats.condition}
              </div>

              <div className="flex justify-center text-slate-400 mt-5 text-[15px]">
                Today &#183; {stats.time} | {stats.location}
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default Temperature;
