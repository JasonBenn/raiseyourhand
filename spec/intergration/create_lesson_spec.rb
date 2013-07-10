require 'spec_helper'


describe "Creating a new Lesson", js: true  do
	
 	before(:each) do
 		Content.any_instance.stub(:getVideoIdFromUrl).and_return("2zNSgSzhBfM")
 		#Content.any_instance.stub(:getVideoIdFromUrl).and_return("2zNSgSzhBfM")
    FakeWeb.register_uri(:get, "http://gdata.youtube.com/feeds/api/videos/2zNSgSzhBfM?v=2&alt=json&prettyprint=true", body: File.new("#{Rails.root}/spec/fixtures/youtube_response.json").read )
    FakeWeb.register_uri(:get, "http://gdata.youtube.com/feeds/api/videos/C-u5WLJ9Yk4?v=2&alt=json&prettyprint=true", body: File.new("#{Rails.root}/spec/fixtures/dancing_lessons.json").read )

 	end
 	it "Can 'create a lesson"do
 	 	visit '/'
 		click_link 'sign in'
 		click_link_or_button 'Create new lesson'
 		fill_in "lesson_title", with: 'dancing lesson'
 		fill_in "lesson_contents_attributes_0_url", with: "http://www.youtube.com/watch?v=C-u5WLJ9Yk4"
 		click_button "Submit"
 		expect(page).to have_content 'dancing lesson'
 	end


 	it "should change the start time" do
 		create_a_new_lesson
 		element = page.find('div.create-draggable-progress:nth-child(4)')

   
    # selenium_webdriver = page.driver.browser
    # selenium_webdriver.mouse.down(element.native)
    # selenium_webdriver.mouse.move_by(150, 0)
    # selenium_webdriver.mouse.up
  	element.drag_by(50, 0)
    sleep 40
 	end 

 	# 	el = driver.find_element(:id, "some_id")
		# driver.action.move_to(el, 100, 100).perform
end



	def create_a_new_lesson
		visit '/'
 		click_link 'sign in'
 		click_link_or_button 'Create new lesson'
 		fill_in "lesson_title", with: 'dancing lesson'
 		fill_in "lesson_contents_attributes_0_url", with: "http://www.youtube.com/watch?v=C-u5WLJ9Yk4"
 		click_button "Submit"
	end