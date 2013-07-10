require 'spec_helper'


describe LessonsController do

  before(:each) do
  	@user =  FactoryGirl.create(:user)  
    @controller.stub(:current_user).and_return(@user)
  end   

  def json_response
   	@json_response ||= JSON.parse(File.new("#{Rails.root}/spec/fixtures/youtube_response.json").read)
  end

  before(:each) do
    Content.any_instance.stub(:getVideoIdFromUrl).and_return("2zNSgSzhBfM")
    FakeWeb.register_uri(:get, "http://gdata.youtube.com/feeds/api/videos/2zNSgSzhBfM?v=2&alt=json&prettyprint=true", body: File.new("#{Rails.root}/spec/fixtures/youtube_response.json").read )
  end
  

	describe '#create' do
		it 'new lesson given valid params' do 
			expect{ post(:create, post_new_lesson_request) }.to change{Lesson.count}.by(1)
		end

		it 'should create the first piece of content' do
			expect{ post(:create, post_new_lesson_request) }.to change{Content.count}.by(1)
		end


		it 'should not create new lesson with invalid params' do
			expect{ post(:create) }.to change{Lesson.count}.by(0) 
		end
	end
end


def post_new_lesson_request
	{lesson: { title: "musik", contents_attributes: { "0" => {position: "0", start_time: "0", url: "http://www.youtube.com/watch?v=2zNSgSzhBfM" }}}}
end