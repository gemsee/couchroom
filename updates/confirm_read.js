function(doc, req) {
	if(!doc) {
		return [doc, "{\"error\":\"forbidden\",\"reason\":\"Message id not specified\"}"];
	}
	if(req.userCtx.name != doc.author) {
		if(doc.seen_by.indexOf(req.userCtx.name) == -1) {
			doc.seen_by.push(req.userCtx.name);
			return [doc, "{\"ok\":true,\"message\":\"Read confirmed\"}"];
		} else {
			return [doc, "{\"error\":\"forbidden\",\"reason\":\"Read already confirmed\"}"];
		}
	} else {
		return [doc, "{\"error\":\"forbidden\",\"reason\":\"Read already autoconfirmed\"}"];
	}
}