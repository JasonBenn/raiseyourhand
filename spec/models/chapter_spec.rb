require 'spec_helper'

describe Chapter do
  context 'testing associations' do
    it { should belong_to(:content) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:content_id) }
    it { should allow_mass_assignment_of(:start_time) }
    it { should allow_mass_assignment_of(:end_time) }
  end

  pending 'testing validations'

end
