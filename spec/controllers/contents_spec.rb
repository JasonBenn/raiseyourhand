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
    let(:lesson) { FactoryGirl.create(:lesson_with_content) }

    it "update content given valid params" do
      put(:update, {id: lesson.contents.first.id, content: {lesson_id: lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "200",
                             finish_time: "400",
                             position: 2}})
      update_content = Content.find(lesson.contents.first.id)
      expect(update_content.start_time).to eq("200")
      expect(update_content.finish_time).to eq("400")
      expect(update_content.position).to eq("2")
      expect(update_content.url).to eq("http://www.youtube.com/watch?v=2YYF0j-FV3c")
    end

    it "renders the _new_content template" do
      put(:update, {id: lesson.contents.first.id, content: {lesson_id: lesson.id,
                             url: "http://www.youtube.com/watch?v=2YYF0j-FV3c",
                             start_time: "200",
                             finish_time: "400",
                             position: 2}})
      response.should render_template('contents/_new_content')
    end

    it "returns a 201 status code when editing a record" do
      put(:update, {id: lesson.contents.first.id, content: {lesson_id: lesson.id,
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

  describe '#sortorder' do
    let(:lesson) { FactoryGirl.create(:lesson_with_muiltiple_content) }
    
    it "update position of content from a list of ID's" do 
      content_ids = lesson.contents.each { |c| c.id }.shuffle
      put(:sortorder,  { lesson_id: lesson.id, sortorder: content_ids })
      expect(Content.find(content_ids[0]).position).to eq("0")
      expect(Content.find(content_ids[1]).position).to eq("1")
      expect(Content.find(content_ids[2]).position).to eq("2")
      expect(Content.find(content_ids[3]).position).to eq("3")
      expect(Content.find(content_ids[4]).position).to eq("4") 
    end
  end

  describe '#destroy' do
    let(:lesson) { FactoryGirl.create(:lesson_with_muiltiple_content) }
    it "removes content from lesson" do
      expect{ delete(:destroy, {id: lesson.contents.first.id, lesson_id: lesson.id})}.to change { lesson.contents.count }.by(-1)
    end

    it "only remove content for the current lesson" do
      expect{ delete(:destroy, {id: (lesson.contents.first.id + 1), lesson_id: lesson.id})}.to change { lesson.contents.count }.by(0)
    end
  end


end





