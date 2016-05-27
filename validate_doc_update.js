function(newDoc, oldDoc, userCtx, secObj) {
	if(userCtx.roles.indexOf('_admin') == -1) {
		if(!oldDoc){
			if(newDoc.content) {
				if(newDoc.author != userCtx.name) throw({forbidden : "Directed editing not allowed"});
			} else {
				throw({forbidden : "Directed editing not allowed"});
			}
		} else {
			if(oldDoc.type == "message") {
				if(oldDoc.author == userCtx.name) {
					throw({forbidden : "Read already autoconfirmed"});
				} else if(oldDoc.seen_by.indexOf(userCtx.name) != -1) {
					throw({forbidden : "Read already confirmed"});
				}
			} else {
				throw({forbidden : "Directed editing not allowed"});
			}
		}
	}
}