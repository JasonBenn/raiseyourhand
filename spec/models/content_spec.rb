require 'spec_helper'

describe Content do
  context 'testing associations' do
    it { should belong_to(:lesson) }
    it { should have_many(:chapters) }
    it { should have_many(:questions) }
    it { should have_many(:flashcards) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:lesson_id) }
  end

  pending 'testing validations'
end
