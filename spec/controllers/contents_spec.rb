require 'spec_helper'


describe ContentsController do
  describe "#create" do
    let(:lesson) { FactoryGirl.create(:lesson) }    
    it "new content given valid params" do
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


  describe '#post' do
    let(:content) { FactoryGirl.create(:content) }
    it "update content given valid params" do
      post(:update, {id: content.id, content: {lesson_id: content.lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "200",
                             finish_time: "400",
                             position: 2}})
      update_content = Content.find(content.id)
      expect(update_content.start_time).to eq("200")
      expect(update_content.finish_time).to eq("400")
      expect(update_content.position).to eq("2")
      expect(update_content.url).to eq("http://www.youtube.com/watch?v=2YYF0j-FV3c")
    end

    it "renders the _new_content template" do
      post(:update, {id: content.id, content: {lesson_id: content.lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "200",
                             finish_time: "400",
                             position: 2}})
      response.should render_template('contents/_new_content')
    end

    it "returns a 201 status code when editing a record" do
      post(:update, {id: content.id, content: {lesson_id: content.lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "200",
                             finish_time: "400",
                             position: 2}})
      response.code.should eq("200")
    end
    it "returns a error message when invalid params are submitted" do
      post :update
      response.body.should eq("Invalid Content") 
    end

  end
end