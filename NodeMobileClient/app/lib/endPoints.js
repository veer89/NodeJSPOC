var endPoints = {
	"users" : {
		"create" :{
			"method_type" : "POST",
			"end_point" : "/users/create/false",
			"format" : "json"
		},
		"activate" :{
			"method_type" : "GET",
			"end_point" : "/users/activate",
			"format" : "json"
		},
		"show" :{
			"method_type" : "GET",
			"end_point" : "/users/show",
			"format" : "json"
		},
		"query" :{
			"method_type" : "GET",
			"end_point" : "/users/query",
			"format" : "json"
		},
		"update" :{
			"method_type" : "PUT",
			"end_point" : "/users/update",
			"format" : "json"
		},
		"delete" :{
			"method_type" : "DELETE",
			"end_point" : "/users/delete",
			"format" : "json"
		}
	},
	"projects" : {
		"create" :{
			"method_type" : "POST",
			"end_point" : "/projects/create",
			"format" : "json"
		},
		"query" :{
			"method_type" : "GET",
			"end_point" : "/projects/query",
			"format" : "json"
		},
		"addUserToProject" :{
			"method_type" : "POST",
			"end_point" : "/projects/addUserToProject",
			"format" : "json"
		},
		"update" :{
			"method_type" : "PUT",
			"end_point" : "/projects/update",
			"format" : "json"
		},
		"removeUserFromProject" :{
			"method_type" : "DELETE",
			"end_point" : "/projects/removeUserFromProject",
			"format" : "json"
		},
		"show" :{
			"method_type" : "GET",
			"end_point" : "/projects/show",
			"format" : "json"
		}
	},
	"socials" : {
		"create" :{
			"method_type" : "POST",
			"end_point" : "/socials/create",
			"format" : "json"
		},
		"query" :{
			"method_type" : "GET",
			"end_point" : "/socials/query",
			"format" : "json"
		},
		"update" :{
			"method_type" : "PUT",
			"end_point" : "/socials/update",
			"format" : "json"
		},
		"delete" :{
			"method_type" : "DELETE",
			"end_point" : "/socials/delete",
			"format" : "json"
		},
		"show" :{
			"method_type" : "GET",
			"end_point" : "/socials/show",
			"format" : "json"
		}
	},
	"picture" : {
		"create" :{
			"method_type" : "POST",
			"end_point" : "/picture/create",
			"format" : "json"
		},
		"update" :{
			"method_type" : "PUT",
			"end_point" : "/picture/update",
			"format" : "json"
		},
		"delete" :{
			"method_type" : "DELETE",
			"end_point" : "/picture/delete",
			"format" : "json"
		},
		"show" :{
			"method_type" : "GET",
			"end_point" : "/picture/show",
			"format" : "json"
		}
	},
	"login" : {
		"login" :{
			"method_type" : "POST",
			"end_point" : "/login",
			"format" : "json"
		},
		"changePassword" :{
			"method_type" : "POST",
			"end_point" : "/changePassword",
			"format" : "json"
		},
		"logout" :{
			"method_type" : "DELETE",
			"end_point" : "/logout",
			"format" : "json"
		}
	},
	"address" : {
		"create" :{
			"method_type" : "POST",
			"end_point" : "/address/create",
			"format" : "json"
		},
		"query" :{
			"method_type" : "GET",
			"end_point" : "/address/query",
			"format" : "json"
		},
		"update" :{
			"method_type" : "PUT",
			"end_point" : "/address/update",
			"format" : "json"
		},
		"delete" :{
			"method_type" : "DELETE",
			"end_point" : "/address/delete",
			"format" : "json"
		},
		"show" :{
			"method_type" : "GET",
			"end_point" : "/address/show",
			"format" : "json"
		},
		"showByEmpId" :{
			"method_type" : "GET",
			"end_point" : "/address/showByEmpId",
			"format" : "json"
		}
	}
};


module.exports = endPoints;
