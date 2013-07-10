require 'spec_helper'

describe Question do
  context 'testing associations' do
    it { should belong_to(:content) }
    it { should have_many(:answers) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:content_id) }
    it { should allow_mass_assignment_of(:text) }
    it { should allow_mass_assignment_of(:time_in_lesson) }
  end

  pending 'testing validations'
end
