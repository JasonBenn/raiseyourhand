class Content < ActiveRecord::Base
  attr_accessible :lesson_id, :url, :position, :start_time, :finish_time, :duration
  belongs_to :lesson, inverse_of: :contents
  has_many :questions
  has_many :flashcards
 	validates_presence_of :lesson
	validates_associated :lesson
 	validates :position, numericality: true
 	before_create :generate_parameter

  def length
    finish_time.to_f - start_time.to_f
  end

  def generate_parameter
		youtube_id = getVideoIdFromUrl(url)
  	youtube_data = getMetaDataFromYoutubeWithId(youtube_id)
  	duration = get_youtube_duration(youtube_id)
  	self.start_time = 0
		self.finish_time = duration
		self.duration = duration
  end

  def getMetaDataFromYoutubeWithId(youtube_id)
		JSON.parse(open("http://gdata.youtube.com/feeds/api/videos/#{youtube_id}?v=2&alt=json&prettyprint=true").read)
	end

	def get_youtube_title(url)
		id = getVideoIdFromUrl(url)
		data = getMetaDataFromYoutube(id)
		data['entry']['title']['$t']
	end

	def get_youtube_duration(youtube_id)
		data = getMetaDataFromYoutubeWithId(youtube_id)
		data['entry']['media$group']['yt$duration']['seconds']
	end

	def getVideoIdFromUrl(url)
		url_params = CGI.parse(URI.parse(url).query) 
		url_params['v'][0]
	end
end
