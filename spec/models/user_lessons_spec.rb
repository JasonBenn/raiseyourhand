require 'spec_helper'

describe UserLesson do
  context 'testing associations' do
    it { should belong_to(:user) }
    it { should belong_to(:lesson) }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:user_id) }
    it { should allow_mass_assignment_of(:lesson_id) }
  end

  pending 'testing validations'
end
