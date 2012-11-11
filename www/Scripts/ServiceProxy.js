/// <reference path="~/System/jquery.js" />

ServiceProxy = function() //constructor for the proxy
{
	this._baseURL = "Services/TutorialService.svc/";
};

ServiceProxy.prototype =
{
	getUsers: function(success, error)
	{
		this._doAjax("GetUsers", null, success, error);
	},

	getUser: function(link, success, error)
	{
		var data = {link: link};

		this._doAjax("GetUser", data, success, error)
	},

	_defaultErrorHandler: function(xhr, status, error)
	{
		alert(xhr.statusText);
	},

	_doAjax: function(method, data, fnSuccess, fnError)
	{
		if (!data) data = {};

		if (!fnError) fnError = this._defaultErrorHandler;

		$.ajax({
			type: "GET",
			url: this._baseURL + method,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: fnSuccess,
			error: fnError,
			dataFilter: function(data)
			{
				var response;
				
				if (typeof (JSON) !== "undefined" && typeof (JSON.parse) === "function")
					response = JSON.parse(data);
				else
					response = val("(" + data + ")");

				if (response.hasOwnProperty("d"))
					return response.d;
				else
					return response;
			}
		});
	}


};
