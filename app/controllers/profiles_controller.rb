class ProfilesController < ApplicationController
	def index
		@lessons = current_user.lessons
	end
end