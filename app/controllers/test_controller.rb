class TestController < ApplicationController
  # what is the file....... delete it
	def index
		@comments = [["Test 1", 3], ["Test 2", 10], ["Test 3", 20], ["Test 4", 22]]
	end

	def get_comments

	end
end
