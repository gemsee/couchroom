function(doc, req) {
	if(!doc) {
		if(typeof req.body == undefined || req.body == null || req.body == "") {
			var receivedDoc = null;
		} else {
			var receivedDoc = JSON.parse(req.body);
		}
		if (receivedDoc == null || typeof receivedDoc.content == "undefined") {
			// url content
			if(req.query.content) {
				var createdDoc = {
					_id: req.uuid,
					type: "message",
					author: req.userCtx.name,
					timestamp: new Date().toISOString(),
					seen_by: [ req.userCtx.name ],
					content: req.query.content
				}
				return [createdDoc, "{\"ok\":true,\"message\":\"Message sent\",\"_id\":\"" + req.uuid + "\"}"];
			// TODO: add sending messages via forms
			} else {
				return [null, "{\"error\":\"forbidden\",\"reason\":\"Missing message content\"}"];
			}
		} else if(receivedDoc.content) {
			// body content
			var createdDoc = {
				_id: req.uuid,
				type: "message",
				author: req.userCtx.name,
				timestamp: new Date().toISOString(),
				seen_by: [ req.userCtx.name ],
				content: receivedDoc.content
			}
			return [createdDoc, "{\"ok\":true,\"message\":\"Message sent\",\"_id\":\"" + req.uuid + "\"}"];
		} else {
			return [null, "{\"error\":\"forbidden\",\"reason\":\"Missing message content\"}"];
		}
	} else {
		return [null, "{\"error\":\"forbidden\",\"reason\":\"Editing not supported\"}"];
	}
}