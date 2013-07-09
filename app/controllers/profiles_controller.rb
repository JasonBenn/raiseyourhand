class ProfilesController < ApplicationController
	def show
		@lessons = User.find(params[:id]).lessons
	end
end