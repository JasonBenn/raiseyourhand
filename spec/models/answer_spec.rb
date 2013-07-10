require 'spec_helper'

describe Answer do
  context 'testing associations' do
    it { should belong_to(:question) }
    it { should belong_to(:user) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:question_id) }
    it { should allow_mass_assignment_of(:text) }
  end


  context 'testing validations' do
    it { should validate_presence_of(:question) }
    it { should validate_presence_of(:user) }
  end
end
