const Oxyl = require("../../oxyl.js"),
	Command = require("../../modules/commandCreator.js"),
	framework = require("../../framework.js");

var command = new Command("feedback", async (message, bot) => {
	framework.consoleLog(`Feedback from ${framework.unmention(message.author)} (${message.author.id}):` +
		`${framework.codeBlock(message.argsPreserved[0])}`, "feedback");
	return "Sent feedback!";
}, {
	cooldown: 30000,
	type: "default",
	description: "Send feedback to the Support Server",
	args: [{
		type: "text",
		label: "message"
	}]
});
