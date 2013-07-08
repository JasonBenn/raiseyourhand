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
    it { should validate_presence_of(:lesson) }
    it { should validate_presence_of(:url) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:finish_time) } 
    it { should validate_numericality_of(:position) }
    it "should validate associated lesson"

  end

  pending 'had lesson id'
  pending 'lesson for that Id exisits'
end
