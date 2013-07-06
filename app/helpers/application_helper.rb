require 'cgi'

module ApplicationHelper
	def getVideoIdFromUrl(url)
		url_params = CGI.parse(URI.parse(url).query) 
		url_params['v'][0]
	end
end
