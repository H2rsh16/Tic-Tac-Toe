import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [gameMode, setGameMode] = useState(null);
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setError("");
  };

  const handleStartGame = () => {
    if (gameMode === "player") {
      if (!playerOne.trim() || !playerTwo.trim()) {
        toast.error("Please enter both player names.");
        return;
    }

    navigate("/board", {
    state: { playerOne, playerTwo, mode: "player" },
    });
    } else if (gameMode === "computer") {
      navigate("/board", { state: { mode: "computer" } });
    } else {
        toast.error("Please choose a game mode.");
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-fit p-4 justify-center items-center bg-white rounded-md">

        <h4 className="text-lg font-semibold mb-3">Choose below - </h4>

        <div className="mb-3 flex">
          <button
            onClick={() => handleModeSelect("player")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-2"
          >
            Vs Player
          </button>
          <button
            onClick={() => handleModeSelect("computer")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
          >
            Vs Computer
          </button>
        </div>

        {gameMode && (
          <>
            <div className="mt-4">
              <h5 className="text-md font-medium">
                You choosed: {gameMode === "player" ? "Vs Player" : "Vs Computer"}
              </h5>

              {gameMode === "player" && (
                <form className="pt-3 w-full">
                  <div className="mb-3">
                    <label className="block mb-1 font-medium">Player One Name</label>
                    <input
                      type="text"
                      placeholder="Enter Player One Name"
                      value={playerOne}
                      onChange={(e) => setPlayerOne(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block mb-1 font-medium">Player Two Name</label>
                    <input
                      type="text"
                      placeholder="Enter Player Two Name"
                      value={playerTwo}
                      onChange={(e) => setPlayerTwo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </form>
              )}
            </div>

            {error && (
              <div className="text-red-600 mt-2 text-sm">
                <small>{error}</small>
              </div>
            )}

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </>
        )}
      </div>

    </>

  );
};

export default Home;
