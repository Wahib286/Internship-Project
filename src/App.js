import React, { useState, useEffect } from 'react';

function App() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'https://www.thesportsdb.com/api/v1/json/123/searchevents.php?e=Arsenal_vs_Chelsea';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.event && data.event.length > 0) {
          setMatch(data.event[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Match: Arsenal vs Chelsea</h1>
      {loading && <p className="text-lg text-gray-600">Loading match details...</p>}
      {match ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <img src={match.strPoster} alt="Match Poster" className="w-full rounded-lg mb-4" />
          <div className='flex flex-col justify-center items-center'>
          <h2 className="text-xl font-semibold text-gray-800">{match.strHomeTeam} vs {match.strAwayTeam}</h2>
          <p className="text-gray-600"><strong>Date:</strong> {match.dateEvent}</p>
          <p className="text-gray-600"><strong>Time:</strong> {match.strTimeLocal} (Local)</p>
          </div>
          <div className="flex justify-around my-4">
            <img src={match.strHomeTeamBadge} alt="Home Badge" className="w-16" />
            <img src={match.strAwayTeamBadge} alt="Away Badge" className="w-16" />
          </div>
          <p className="text-gray-600"><strong>Venue:</strong> {match.strVenue}, {match.strCountry}</p>
          <p className="text-gray-600"><strong>Status:</strong> {match.strStatus}</p>
          {match.strVideo && (
            <a href={match.strVideo} target="_blank" rel="noreferrer" className="block mt-4 text-blue-500 hover:underline">
              🎥 Watch Highlights
            </a>
          )}
        </div>
      ) : !loading ? (
        <p className="text-lg text-red-600">No match details found.</p>
      ) : null}
    </div>
  );
}

export default App;
