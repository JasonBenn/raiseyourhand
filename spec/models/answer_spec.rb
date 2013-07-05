require 'spec_helper'

describe Answer do
  context 'testing associations' do
    it { should belong_to(:question) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:question_id) }
    it { should allow_mass_assignment_of(:text) }
  end

  pending 'testing validations'
end
