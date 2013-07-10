require 'spec_helper'


describe "Creating a new Lesson", js: true  do
	
 	before(:each) do
 		#Content.any_instance.stub(:getVideoIdFromUrl).and_return("2zNSgSzhBfM")
    FakeWeb.register_uri(:get, "http://gdata.youtube.com/feeds/api/videos/2zNSgSzhBfM?v=2&alt=json&prettyprint=true", body: File.new("#{Rails.root}/spec/fixtures/youtube_response.json").read )
    FakeWeb.register_uri(:get, "http://gdata.youtube.com/feeds/api/videos/C-u5WLJ9Yk4?v=2&alt=json&prettyprint=true", body: File.new("#{Rails.root}/spec/fixtures/dancing_lessons.json").read )

 	end
 	it "should create a lesson"do
 		create_a_new_lesson
 	end


 	it "should change the start time" do
 		create_a_new_lesson
 		element = page.find('div.create-draggable-progress:nth-child(2)')

   
    selenium_webdriver = page.driver.browser
    selenium_webdriver.mouse.down(element.native)
    selenium_webdriver.mouse.move_by(300, 0)
    selenium_webdriver.mouse.up
    expect(element[:style]).to include('left: 300px;')
 	end

 	it "should change the end time" do
 		create_a_new_lesson
 		element = page.find('div.create-draggable-progress:nth-child(4)')


 		selenium_webdriver = page.driver.browser
    selenium_webdriver.mouse.down(element.native)
    selenium_webdriver.mouse.move_by(-300, 0)
    selenium_webdriver.mouse.up
    expect(element[:style]).to include('left: 275px;')
 	end 

 	it "should be able to add new videos to the lesson" do
 		create_a_new_lesson
 		fill_in "add-new-content", with: "http://www.youtube.com/watch?v=C-u5WLJ9Yk4"
 		click_link_or_button 'Add Clip'
 		expect(page.has_selector?('li.playlist-content:nth-child(2)', count: 1)).to be_true
 	end

 	it 'should be able to view the new lesson' do
 		create_a_new_lesson
 		fill_in "add-new-content", with: "http://www.youtube.com/watch?v=2zNSgSzhBfM"
 		click_link_or_button 'Add Clip'
 		click_link_or_button 'View Lesson'
 		expect(page).to have_button('Create Question')

 	end

end
   


	def create_a_new_lesson
		visit '/'
 		click_link 'sign in'
 		click_link_or_button 'Create new lesson'
 		fill_in "lesson_title", with: 'dancing lesson'
 		fill_in "lesson_contents_attributes_0_url", with: "http://www.youtube.com/watch?v=C-u5WLJ9Yk4"
 		click_button "Submit"
	end