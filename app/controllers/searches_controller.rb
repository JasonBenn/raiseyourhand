class SearchesController < ApplicationController
	def search
		results = Search.search(params[:search]).includes(:searchable)
		records = results.map(&:searchable)

    # this line of code is very hard to read
		lessons, questions = records.partition { |record| record.is_a? Lesson }

		render partial: 'results', locals: { lessons: lessons, questions: questions }, layout: false
	end
end