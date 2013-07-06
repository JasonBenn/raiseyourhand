require 'spec_helper'


describe ContentsController do
  describe "#create" do
    let(:lesson) { FactoryGirl.create(:lesson) }    
    it "new content give valid params" do
      expect{ post(:create, {content: { lesson_id: lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "0",
                             finish_time: "600",
                             position: 1}})}.to change{Content.count}.by(1)
    end

    it "renders the _new_content template" do
      post(:create, {content: { lesson_id: lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "0",
                             finish_time: "600",
                             position: 1}})
     response.should render_template('contents/_new_content')
    end      

    it "returns a 201 status code when creating a new record" do
      post(:create, {content: { lesson_id: lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "0",
                             finish_time: "600",
                             position: 1}})
      response.code.should eq("201")

    end
    it "returns a error message when invalid params are submitted" do
      post :create
      response.body.should eq("Invalid Content") 
    end
  end
end