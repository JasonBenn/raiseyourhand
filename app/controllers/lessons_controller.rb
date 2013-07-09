class LessonsController < ApplicationController
	before_filter :authenticated, only: [:new, :create, :edit]
	after_filter :add_lesson_to_profile, only: [:show]

	def index
		@home = true
		@lessons = Lesson.all
	end

	def show
		@lesson = Lesson.find(params[:id])
		@question = Question.new
		@flashcard = Flashcard.new
	end

	def new
		@lesson = Lesson.new
		@lesson.contents.build
	end

	def create
		@lesson = current_user.created_lessons.build(params[:lesson])
		if @lesson.save
			redirect_to edit_lesson_path(@lesson)
		else
			render :new
		end
	end

	def edit
		@lesson = current_user.created_lessons.find(params[:id])
	end

	def update
	end

	private

	def add_lesson_to_profile
		if current_user
			current_user.lessons << @lesson unless current_user.lessons.include? @lesson
		end
	end

	def getMetaDataFromYoutubeWithId(youtube_id)
		JSON.parse(open("http://gdata.youtube.com/feeds/api/videos/#{youtube_id}?v=2&alt=json&prettyprint=true").read)
	end

	def getMetaDataFromYoutubeWithUrl(url)
		id = getVideoIdFromUrl(url)
		getMetaDataFromYoutubeWithId(id)
	end

	def get_youtube_title(url)
		id = getVideoIdFromUrl(url)
		data = getMetaDataFromYoutube(id)
		data['entry']['title']['$t']
	end

	def get_youtube_duration(youtube_id)
		data = getMetaDataFromYoutubeWithUrl(youtube_id)
		data['entry']['media$group']['yt$duration']['seconds']
	end

	def getVideoIdFromUrl(url)
		url_params = CGI.parse(URI.parse(url).query) 
		url_params['v'][0]
	end
end
