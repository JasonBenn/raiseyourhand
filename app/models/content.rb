class Content < ActiveRecord::Base
  attr_accessible :lesson_id, :url, :position, :start_time, :finish_time, :duration, :title
  belongs_to :lesson, inverse_of: :contents
  has_many :questions
  has_many :flashcards
  validates_presence_of :lesson, :url, :start_time, :finish_time
	validates_associated :lesson
	validates :position, numericality: true

	before_validation :generate_parameter

  def length
    finish_time.to_f - start_time.to_f
  end

  def generate_parameter
  	if self.new_record?
			youtube_id = getVideoIdFromUrl(url)
	  	youtube_data = getMetaDataFromYoutubeWithId(youtube_id)
	  	get_duration = get_youtube_duration(youtube_data)
	  	self.start_time = 0
			self.finish_time = get_duration
			self.duration = get_duration
			self.title = get_youtube_title(youtube_data)
		end
  end

  def getMetaDataFromYoutubeWithId(youtube_id)
		JSON.parse(open("http://gdata.youtube.com/feeds/api/videos/#{youtube_id}?v=2&alt=json&prettyprint=true").read)
	end

	def get_youtube_title(data)
		data['entry']['title']['$t']
	end

	def get_youtube_duration(data)
		data['entry']['media$group']['yt$duration']['seconds']
	end

	def getVideoIdFromUrl(url)
		url_params = CGI.parse(URI.parse(url).query) 
		url_params['v'][0]
	end
end
