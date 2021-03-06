const music = require("../../modules/music.js"),
	Oxyl = require("../../oxyl.js"),
	Command = require("../../modules/commandCreator.js"),
	framework = require("../../framework.js");

var command = new Command("resume", async (message, bot) => {
	let manager = music.getManager(message.channel.guild);
	if(!manager) {
		return "There is currently no music playing";
	} else if(!manager.voiceCheck(message.member)) {
		return "You must be in the music channel to run this command";
	} else if(!manager.connection.paused) {
		return "The music is not paused";
	} else {
		manager.pause();
		return "Music resumed :play_pause:";
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Resume the music in your channel"
});
