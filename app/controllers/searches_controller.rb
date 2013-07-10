class SearchesController < ApplicationController
	def search
		lessons, questions = Search.search(params[:search].downcase)
		render partial: 'results', locals: { lessons: lessons, questions: questions }, layout: false
	end
end