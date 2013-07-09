class SearchesController < ApplicationController
	def search
		results = Search.search(params[:search]).includes(:searchable)
		records = results.map(&:searchable)
		render partial: 'results', locals: { records: records }
	end
end