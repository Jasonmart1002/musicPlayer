//import react into the bundle
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

const Songs = () => {
	const [music, setMusic] = useState(null);

	const [source, setSource] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);

	useEffect(
		() =>
			fetch("https://assets.breatheco.de/apis/sound/songs")
				.then(r => r.json())
				.then(data => setMusic(data)),
		[]
	);

	return (
		<div className="container text-center">
			<ul>
				{music === null
					? "Loading..."
					: music.map((t, index) => (
							<li
								key={index}
								id="mysound"
								className="songs"
								onClick={() => {
									setSource(
										"https://assets.breatheco.de/apis/sound/" +
											t.url
									);
									console.log(source);
								}}>
								{t.name}
							</li>
					  ))}
			</ul>
			<audio controls>
				<source src={source} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

ReactDOM.render(<Songs />, document.querySelector("#app"));
