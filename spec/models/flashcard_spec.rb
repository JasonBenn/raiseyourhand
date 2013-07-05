require 'spec_helper'

describe Flashcard do
  context 'testing associations' do
    it { should belong_to(:content) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:content_id) }
    it { should allow_mass_assignment_of(:front) }
    it { should allow_mass_assignment_of(:back) }
    it { should allow_mass_assignment_of(:time_in_content) }
  end

  pending 'testing validations'
end
