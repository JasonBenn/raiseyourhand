require 'spec_helper'

describe Content do

  context 'testing associations' do
    it { should belong_to(:lesson) }
    it { should have_many(:questions) }
    it { should have_many(:flashcards) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:lesson_id) }
    it { should allow_mass_assignment_of(:url) }
    it { should allow_mass_assignment_of(:position) }
    it { should allow_mass_assignment_of(:start_time) }
    it { should allow_mass_assignment_of(:finish_time) }
    it { should allow_mass_assignment_of(:duration) }
    it { should allow_mass_assignment_of(:title) }
  end


  describe 'Validates' do
    content = Content.new
    #content.stub(:getVideoIdFromUrl).and_return("2zNSgSzhBfM")
    it { should validate_presence_of(:lesson) }
    it { should validate_presence_of(:url) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:finish_time) } 
    it { should validate_numericality_of(:position) }
    it "should validate associated lesson"
  end

  describe '#length' do
    let(:lesson) { FactoryGirl.create(:lesson_with_content) }
    it 'calculates the length of a clip' do
      content = lesson.contents.first
      expect(content.length).to eq(235.0)
    end
  end

  describe '#getVideoIdFromUrl' do
    it 'should parse our the video id from url' do
      content = Content.new
      url = "http://www.youtube.com/watch?v=2zNSgSzhBfM"
      expect(content.getVideoIdFromUrl(url)).to eq("2zNSgSzhBfM")
    end 
  end 

  describe '#getMetaDataFromYoutubeWithId' do
    it 'should parse the meta data from the URL' do
      pending
      content = Content.new
      id = "2zNSgSzhBfM"
      expect(content.getMetaDataFromYoutubeWithId(id)).to eq("")
    end
  end


end
