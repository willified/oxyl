const Oxyl = require("../../oxyl.js"),
	Command = require("../../modules/commandCreator.js"),
	framework = require("../../framework.js"),
	cheerio = require("cheerio");

var command = new Command("google", async (message, bot) => {
	message.channel.sendTyping();

	let body = await framework.getContent(`https://www.google.com/search?q=${escape(message.args[0])}`);
	let $ = cheerio.load(body); // eslint-disable-line id-length
	if($("div.mnr-c div.med.card-section").length[0]) return "No results found";

	let results = $(".r");
	let resultmsg = "";
	for(let i = 0; i < 3; i++) {
		let ele = results.eq(i);

		let link = ele.find("a").attr("href");
		if(link.indexOf('/url?q=') !== -1) {
			link = link.replace('/url?q=', '');
			link = link.slice(0, link.indexOf('&sa'));
		}
		if(i === 0) resultmsg += link;
		else if(i === 1) resultmsg += `\n\n\n**Other Results**\n<${link}>`;
		else resultmsg += `\n<${link}>`;
	}
	return resultmsg;
}, {
	type: "default",
	description: "Search google for a query",
	aliases: ["g"],
	args: [{
		type: "text",
		label: "query"
	}]
});
