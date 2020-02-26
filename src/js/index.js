//import react into the bundle
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

const Songs = () => {
	const AudioPlayer = x => {
		return (
			<audio controls>
				<source src={source} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		);
	};

	const [music, setMusic] = useState(null);

	const [source, setSource] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);

	const [currentSongName, setCurrentSongName] = useState("Mario Castle");

	useEffect(
		() =>
			fetch("https://assets.breatheco.de/apis/sound/songs")
				.then(r => r.json())
				.then(data => setMusic(data)),
		[]
	);

	return (
		<div className="container-fluid main">
			<div className="container text-center list">
				<div class="dropdown">
					<button
						class="btn btn-secondary btn-lg dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
						{currentSongName}
					</button>
					<div
						class="dropdown-menu"
						aria-labelledby="dropdownMenuButton">
						{music === null
							? "Loading..."
							: music.map((t, index) => (
									<a
										class="dropdown-item"
										type="button"
										className="list-group-item list-group-item-action"
										key={index}
										id="mysound"
										onClick={() => {
											setSource(
												"https://assets.breatheco.de/apis/sound/" +
													t.url
											);
											setCurrentSongName(t.name);
										}}>
										{t.name}
									</a>
							  ))}
					</div>
				</div>
				<div className="container audioplay">
					<AudioPlayer />
				</div>
			</div>
		</div>
	);
};

ReactDOM.render(<Songs />, document.querySelector("#app"));
